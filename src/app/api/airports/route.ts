import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { airportSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";

export async function GET() {
  try {
    const airports = await prisma.airport.findMany({
      include: { location: true },
    });
    return NextResponse.json(airports, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch airports" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = airportSchema.parse(data);

    const location = await prisma.location.findUnique({
      where: { id: parsedData.locationId },
    });
    if (!location)
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );

    const newAirport = await prisma.airport.create({
      data: {
        airportName: parsedData.airportName,
        servedCities: parsedData.servedCities,
        locationId: parsedData.locationId,
      },
    });

    return NextResponse.json(newAirport, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create airport" },
      { status: 500 }
    );
  }
}
