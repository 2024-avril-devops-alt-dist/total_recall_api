import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { handleError } from "@/utils/errorHandler";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const flight = await prisma.flight.update({
      where: { id },
      data: { flightStatus: "CANCELLED", bookingOpenStatus: false },
    });

    // Annuler éventuellement les réservations associées
    await prisma.booking.updateMany({
      where: { flightId: flight.id },
      data: { bookingStatus: "CANCELLED" },
    });

    return NextResponse.json({ message: "Flight cancelled", flight });
  } catch (error: any) {
    return handleError(error, "Failed to cancel flight");
  }
}
