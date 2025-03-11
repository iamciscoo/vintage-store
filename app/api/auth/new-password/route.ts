// Required for using bcryptjs in Next.js
export const runtime = "nodejs";

import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const newPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  email: z.string().email("Please provide a valid email"),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = newPasswordSchema.parse(json)

    // Changed approach to find the reset token using both token and email
    // This provides more security and reliability
    const user = await prisma.user.findUnique({
      where: { email: body.email },
      include: {
        passwordReset: true,
      },
    })

    if (!user || !user.passwordReset || user.passwordReset.token !== body.token) {
      return NextResponse.json(
        { message: "Invalid or expired reset link" },
        { status: 400 }
      )
    }

    const now = new Date()
    if (now > user.passwordReset.expires) {
      // Delete expired token
      await prisma.passwordReset.delete({
        where: { userId: user.id },
      })
      return NextResponse.json(
        { message: "Reset link has expired" },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(body.password, 12)

    // Update user password and remove the reset token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      }),
      prisma.passwordReset.delete({
        where: { userId: user.id },
      }),
    ])

    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("[NEW_PASSWORD]", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
} 