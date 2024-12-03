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

    return NextResponse.json(flight);
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
    const data = await request.json();
    const parsedData = flightSchema.partial().parse(data);

    const updatedFlight = await prisma.flight.update({
      where: { id: params.id },
      data: parsedData,
    });

    return NextResponse.json(updatedFlight);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.flight.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Flight deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete flight" },
      { status: 500 }
    );
  }
}
