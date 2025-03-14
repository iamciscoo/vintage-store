// Required for using Node.js APIs in Next.js
export const runtime = "nodejs";

import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"
import { prisma } from "@/lib/prisma"

// Create a mock Resend client if the API key is not provided
const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY)
  : {
      emails: {
        send: async () => {
          console.log("Mock email sent (no RESEND_API_KEY provided)");
          return { id: "mock-email-id", message: "Mock email sent" };
        },
      },
    };

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

    // Check for existing reset token and update or create as needed
    const existingReset = await prisma.passwordReset.findUnique({
      where: { userId: user.id },
    })

    if (existingReset) {
      await prisma.passwordReset.update({
        where: { userId: user.id },
        data: {
          token,
          expires,
        },
      })
    } else {
      // Store the reset token in the database
      await prisma.passwordReset.create({
        data: {
          userId: user.id,
          token,
          expires,
        },
      })
    }

    // Construct base URL with fallback
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 
                   (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    // Send password reset email
    try {
      await resend.emails.send({
        from: "Vintage Store <noreply@vintage-store.com>",
        to: body.email,
        subject: "Reset your password",
        html: `
          <h1>Reset your password</h1>
          <p>Hi ${user.name},</p>
          <p>Someone requested a password reset for your account. If this wasn't you, please ignore this email.</p>
          <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
          <p><a href="${baseUrl}/auth/new-password?token=${token}&email=${encodeURIComponent(body.email)}">Reset password</a></p>
        `,
      })
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // Continue execution - we've already created the token, so the user can still reset 
      // their password if they have the token
    }

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