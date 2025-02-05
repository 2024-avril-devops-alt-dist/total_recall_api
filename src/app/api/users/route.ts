import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { userSchema } from "@/utils/validationSchemas";
import { ZodError } from "zod";
import { hash } from "bcryptjs";

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

    const newUser = await prisma.user.create({
      data: {
        email: parsedData.email,
        hashedPassword: hashedPassword,
        phoneNotification: parsedData.phoneNotification || false,
        phoneNumber: parsedData.phoneNumber,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", userId: newUser.id },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
