import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/pirsma";
import { stopoverSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";
import {
  handleError,
  NotFoundError,
  ValidationError,
  ForbiddenError,
} from "@/utils/errorHandler";
import logger from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const flight = await prisma.flight.findUnique({
      where: { id },
      include: { stopovers: { include: { location: true } } },
    });

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json(flight.stopovers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch stopovers" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    // Vérifier si l'utilisateur est authentifié et est un ADMIN
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || token.role !== "ADMIN") {
      throw new ForbiddenError("Access denied");
    }

    const data = await request.json();
    const parsedData = stopoverSchema.parse({ ...data, flightId: id });

    const flight = await prisma.flight.findUnique({ where: { id } });
    if (!flight) {
      throw new NotFoundError("Flight not found");
    }

    // Vérifier cohérence horaire
    if (
      parsedData.arrivalDate < flight.departureDate ||
      parsedData.departureDate > flight.arrivalDate ||
      parsedData.arrivalDate >= parsedData.departureDate
    ) {
      throw new ValidationError(
        "Stopover dates are not coherent with the flight schedule"
      );
    }

    // Vérifier chevauchement avec d’autres escales
    const existingStopovers = await prisma.stopover.findMany({
      where: { flightId: id },
    });

    for (const s of existingStopovers) {
      if (
        (parsedData.arrivalDate >= s.arrivalDate &&
          parsedData.arrivalDate <= s.departureDate) ||
        (parsedData.departureDate >= s.arrivalDate &&
          parsedData.departureDate <= s.departureDate)
      ) {
        throw new ValidationError(
          "Stopover overlaps with another existing stopover"
        );
      }
    }

    const newStopover = await prisma.stopover.create({
      data: {
        arrivalDate: parsedData.arrivalDate,
        departureDate: parsedData.departureDate,
        locationId: parsedData.locationId,
        flightId: parsedData.flightId,
      },
    });

    // Log l'action de création d'une escale
    logger.info(`Stopover created for flight ${id} by user ${token.userId}`);

    return NextResponse.json(newStopover, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    if (
      error instanceof NotFoundError ||
      error instanceof ValidationError ||
      error instanceof ForbiddenError
    ) {
      return NextResponse.json(
        { error: error.message },
        {
          status:
            error instanceof ForbiddenError
              ? 403
              : error instanceof NotFoundError
              ? 404
              : 400,
        }
      );
    }
    return handleError(error, "Failed to create stopover");
  }
}
