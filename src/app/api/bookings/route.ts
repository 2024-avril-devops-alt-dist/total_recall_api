import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { bookingSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = bookingSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { id: parsedData.userId },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const flight = await prisma.flight.findUnique({
      where: { id: parsedData.flightId },
    });
    if (!flight)
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });

    // Vérifier l'existence des passagers
    for (const passengerId of parsedData.passengersIds) {
      const passenger = await prisma.passenger.findUnique({
        where: { id: passengerId },
      });
      if (!passenger) {
        return NextResponse.json(
          { error: `Passenger ${passengerId} not found` },
          { status: 404 }
        );
      }
    }

    const newBooking = await prisma.booking.create({
      data: {
        bookingStatus: parsedData.bookingStatus,
        userId: parsedData.userId,
        flightId: parsedData.flightId,
        passengers: {
          create: parsedData.passengersIds.map((pid) => ({ passengerId: pid })),
        },
      },
      include: { passengers: true },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
