import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { stopoverSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";
import { handleError } from "@/utils/errorHandler";

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
    const data = await request.json();
    const parsedData = stopoverSchema.parse({ ...data, flightId: id });

    const flight = await prisma.flight.findUnique({ where: { id } });
    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    // Vérifier cohérence horaire
    if (
      parsedData.arrivalDate < flight.departureDate ||
      parsedData.departureDate > flight.arrivalDate ||
      parsedData.arrivalDate >= parsedData.departureDate
    ) {
      return NextResponse.json(
        { error: "Stopover dates are not coherent with the flight schedule" },
        { status: 400 }
      );
    }

    const location = await prisma.location.findUnique({
      where: { id: parsedData.locationId },
    });
    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
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
        return NextResponse.json(
          { error: "Stopover overlaps with another existing stopover" },
          { status: 400 }
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

    return NextResponse.json(newStopover, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return handleError(error, "Failed to create stopover");
  }
}
