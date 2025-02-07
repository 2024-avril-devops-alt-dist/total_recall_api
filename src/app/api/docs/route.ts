import { NextResponse } from "next/server";
import { swaggerSpec } from "@/lib/utils/swagger";

export async function GET() {
  return NextResponse.json(swaggerSpec, { status: 200 });
}
