import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { airlineCompanySchema } from "@/lib/utils/validationSchemas";
import { ZodError } from "zod";

export async function GET() {
  try {
    const airlines = await prisma.airlineCompany.findMany({
      include: { flights: true },
    });
    return NextResponse.json(airlines, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch airlines" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = airlineCompanySchema.parse(data);

    const newAirline = await prisma.airlineCompany.create({
      data: {
        companyName: parsedData.companyName,
      },
    });

    return NextResponse.json(newAirline, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create airline" },
      { status: 500 }
    );
  }
}
