import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { flightSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const flight = await prisma.flight.findUnique({
      where: { id: params.id },
      include: {
        departureAirport: true,
        arrivalAirport: true,
        airlineCompany: true,
        stopovers: true,
      },
    });

    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json(flight, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flight" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingFlight = await prisma.flight.findUnique({
      where: { id: params.id },
    });
    if (!existingFlight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    const data = await request.json();
    const parsedData = flightSchema.partial().parse(data);

    // Vérification cohérence horaire si modifié
    if (
      parsedData.departureDate &&
      parsedData.arrivalDate &&
      parsedData.departureDate >= parsedData.arrivalDate
    ) {
      return NextResponse.json(
        { error: "Departure date must be before arrival date" },
        { status: 400 }
      );
    }

    const updatedFlight = await prisma.flight.update({
      where: { id: params.id },
      data: parsedData,
    });

    return NextResponse.json(updatedFlight, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update flight" },
      { status: 500 }
    );
  }
}
