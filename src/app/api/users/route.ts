import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/pirsma";
import { userSchema } from "@/utils/validationSchemas";
import { hash } from "bcryptjs";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phoneNotification: true,
        phoneNumber: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

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
        password: hashedPassword,
        phoneNotification: parsedData.phoneNotification,
        phoneNumber: parsedData.phoneNumber,
      },
    });

    return NextResponse.json(
      { message: "User created successfully" },
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
