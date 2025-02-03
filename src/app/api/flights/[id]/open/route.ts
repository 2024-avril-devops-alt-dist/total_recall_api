import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/pirsma";
import {
  handleError,
  ForbiddenError,
  NotFoundError,
} from "@/utils/errorHandler";
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

    // Mettre à jour le statut d'ouverture des réservations
    const flight = await prisma.flight.update({
      where: { id },
      data: { bookingOpenStatus: true },
    });

    if (!flight) {
      throw new NotFoundError("Flight not found");
    }

    // Log l'action d'ouverture des réservations
    logger.info(`Flight ${id} booking opened by user ${token.userId}`);

    return NextResponse.json({ message: "Flight booking opened", flight });
  } catch (error: any) {
    if (error instanceof ForbiddenError || error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: error instanceof ForbiddenError ? 403 : 404 }
      );
    }
    return handleError(error, "Failed to open flight booking");
  }
}
