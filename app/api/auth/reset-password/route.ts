import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"

const resend = new Resend(process.env.RESEND_API_KEY)

const resetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export async function POST(req: Request) {
  try {
    const json = await req.json()
    const body = resetPasswordSchema.parse(json)

    const user = await prisma.user.findUnique({
      where: { email: body.email },
      select: { id: true, name: true },
    })

    if (!user) {
      return NextResponse.json(
        { message: "If an account exists, you will receive a password reset email" },
        { status: 200 }
      )
    }

    // Generate a unique token that expires in 1 hour
    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 3600000) // 1 hour from now

    // Store the reset token in the database
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expires,
      },
    })

    // Send password reset email
    await resend.emails.send({
      from: "Vintage Store <noreply@vintage-store.com>",
      to: body.email,
      subject: "Reset your password",
      html: `
        <h1>Reset your password</h1>
        <p>Hi ${user.name},</p>
        <p>Someone requested a password reset for your account. If this wasn't you, please ignore this email.</p>
        <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}">Reset password</a></p>
      `,
    })

    return NextResponse.json(
      { message: "If an account exists, you will receive a password reset email" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("[RESET_PASSWORD]", error)
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
} 