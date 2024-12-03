import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { flightSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  try {
    const flights = await prisma.flight.findMany({
      include: {
        departureAirport: true,
        arrivalAirport: true,
        airlineCompany: true,
        stopovers: true,
      },
    });
    return NextResponse.json(flights);
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

    const newFlight = await prisma.flight.create({
      data: parsedData,
    });

    return NextResponse.json(newFlight, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
