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
      data: { bookingOpenStatus: true },
    });
    return NextResponse.json({ message: "Flight booking opened", flight });
  } catch (error: any) {
    return handleError(error, "Failed to open flight booking");
  }
}
