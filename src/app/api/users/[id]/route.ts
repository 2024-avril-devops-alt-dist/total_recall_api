import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import prisma from "@/lib/pirsma";
import {
  handleError,
  NotFoundError,
  ForbiddenError,
} from "@/utils/errorHandler";
import logger from "@/lib/logger";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    // Vérifier si l'utilisateur est authentifié et peut accéder aux données (soit lui-même, soit ADMIN)
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token || (token.userId !== id && token.role !== "ADMIN")) {
      throw new ForbiddenError("Access denied");
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        phoneNotification: true,
        phoneNumber: true,
        bookings: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Log l'accès aux informations de l'utilisateur
    logger.info(`User ${id} data accessed by user ${token.userId}`);

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    if (error instanceof ForbiddenError || error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: error instanceof ForbiddenError ? 403 : 404 }
      );
    }
    return handleError(error, "Failed to fetch user");
  }
}
