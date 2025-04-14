import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const usernameSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = usernameSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: validatedData.error.issues[0].message,
        },
        { status: 400 }
      );
    }
    const { username } = validatedData.data;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      return NextResponse.json("username already taken", { status: 401 });
    }
    return NextResponse.json("Username available", { status: 200 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
