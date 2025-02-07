import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/pirsma";
import {
  handleError,
  ForbiddenError,
  NotFoundError,
} from "@/lib/utils/errorHandler";
import logger from "@/lib/logger";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    // Vérifier si l'utilisateur est authentifié et est un ADMIN
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || token.role !== "ADMIN") {
      throw new ForbiddenError("Access denied");
    }

    // Mettre à jour le statut du vol à CANCELLED
    const flight = await prisma.flight.update({
      where: { id },
      data: { flightStatus: "CANCELLED", bookingOpenStatus: false },
    });

    if (!flight) {
      throw new NotFoundError("Flight not found");
    }

    // Annuler les réservations associées
    await prisma.booking.updateMany({
      where: { flightId: flight.id },
      data: { bookingStatus: "CANCELLED" },
    });

    // Log l'action d'annulation du vol
    logger.info(`Flight ${id} cancelled by user ${token.userId}`);

    return NextResponse.json({ message: "Flight cancelled", flight });
  } catch (error: any) {
    if (error instanceof ForbiddenError || error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: error instanceof ForbiddenError ? 403 : 404 }
      );
    }
    return handleError(error, "Failed to cancel flight");
  }
}
