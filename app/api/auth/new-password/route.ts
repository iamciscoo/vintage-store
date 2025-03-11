// Required for using bcryptjs in Next.js
export const runtime = "nodejs";

import { hash } from "bcryptjs"
import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const newPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = newPasswordSchema.parse(json)

    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token: body.token },
      include: { user: true },
    })

    if (!passwordReset) {
      return NextResponse.json(
        { message: "Invalid or expired reset link" },
        { status: 400 }
      )
    }

    const now = new Date()
    if (now > passwordReset.expires) {
      await prisma.passwordReset.delete({
        where: { token: body.token },
      })
      return NextResponse.json(
        { message: "Reset link has expired" },
        { status: 400 }
      )
    }

    const hashedPassword = await hash(body.password, 12)

    await prisma.$transaction([
      prisma.user.update({
        where: { id: passwordReset.userId },
        data: { password: hashedPassword },
      }),
      prisma.passwordReset.delete({
        where: { token: body.token },
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