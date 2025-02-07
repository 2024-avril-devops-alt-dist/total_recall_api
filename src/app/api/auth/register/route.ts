import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { userSchema } from "@/lib/utils/validationSchemas";
import { hash } from "bcryptjs";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const parsedData = userSchema.parse(data);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(parsedData.password, 10);

    await prisma.user.create({
      data: {
        email: parsedData.email,
        hashedPassword: hashedPassword,
        phoneNotification: parsedData.phoneNotification,
        phoneNumber: parsedData.phoneNumber,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    } else if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
