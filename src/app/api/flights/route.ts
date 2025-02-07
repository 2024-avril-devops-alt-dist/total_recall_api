import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { flightSchema } from "@/lib/utils/validationSchemas";
import { ZodError } from "zod";

export async function GET() {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        departureAirport: true,
        arrivalAirport: true,
        airlineCompany: true,
        stopovers: true,
      },
    });
    return NextResponse.json(flights, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch flights" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = flightSchema.parse(data);

    // Vérification cohérence horaires (ex: departureDate < arrivalDate) si tu le souhaites
    if (parsedData.departureDate >= parsedData.arrivalDate) {
      return NextResponse.json(
        { error: "Departure date must be before arrival date" },
        { status: 400 }
      );
    }

    // Vérifier l'existence des aéroports et de la compagnie
    const departureAirport = await prisma.airport.findUnique({
      where: { id: parsedData.departureAirportId },
    });
    if (!departureAirport)
      return NextResponse.json(
        { error: "Departure airport not found" },
        { status: 404 }
      );
    const arrivalAirport = await prisma.airport.findUnique({
      where: { id: parsedData.arrivalAirportId },
    });
    if (!arrivalAirport)
      return NextResponse.json(
        { error: "Arrival airport not found" },
        { status: 404 }
      );

    const airline = await prisma.airlineCompany.findUnique({
      where: { id: parsedData.airlineCompanyId },
    });
    if (!airline)
      return NextResponse.json(
        { error: "Airline company not found" },
        { status: 404 }
      );

    const newFlight = await prisma.flight.create({
      data: parsedData,
    });

    return NextResponse.json(newFlight, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create flight" },
      { status: 500 }
    );
  }
}
