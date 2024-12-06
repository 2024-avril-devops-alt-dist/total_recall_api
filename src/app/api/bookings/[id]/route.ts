import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { bookingUpdateSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";

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
    const data = await request.json();
    const parsedData = bookingUpdateSchema.parse(data);
    const id = (await params).id;

    const booking = await prisma.booking.findUnique({
      where: { id },
    });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { bookingStatus: parsedData.bookingStatus },
    });

    return NextResponse.json(updatedBooking, { status: 200 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}
