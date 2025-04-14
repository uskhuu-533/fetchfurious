import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import jwt from "jsonwebtoken";


export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = signInSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          succes: false,
          error: validatedData.error.errors,
        },
        { status: 405 }
      );
    }
    const { email, password } = validatedData.data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          succes: false,
          error: "user not found",
        },
        { status: 400 }
      );
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return NextResponse.json(
        {
          succes: false,
          error: "wrong password or email",
        },
        { status: 405 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username },
      "1234",
      { expiresIn: "10h" }
    );
    const response = NextResponse.json(
      {
        succes: true,
        message: "signed in",
        token: token,
      },
      { status: 200 }
    );
    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 10 * 60 * 60,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
