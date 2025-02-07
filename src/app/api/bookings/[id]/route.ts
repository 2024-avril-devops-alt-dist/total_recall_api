import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { bookingUpdateSchema } from "@/lib/utils/validationSchemas";
import { ZodError } from "zod";
import { handleError } from "@/lib/utils/errorHandler";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: true,
        flight: true,
        passengers: { include: { passenger: true } },
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const data = await request.json();
    const parsedData = bookingUpdateSchema.parse(data);

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: { flight: true },
    });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (parsedData.bookingStatus === "CONFIRMED") {
      // Vérifier que le vol est SCHEDULED et ouvert
      if (
        booking.flight.flightStatus !== "SCHEDULED" ||
        !booking.flight.bookingOpenStatus
      ) {
        return NextResponse.json(
          { error: "Flight not available for confirmation" },
          { status: 400 }
        );
      }
    }

    // L’annulation est toujours possible
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { bookingStatus: parsedData.bookingStatus },
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return handleError(error, "Failed to update booking");
  }
}
