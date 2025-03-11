import { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NewPasswordForm } from "@/components/auth/new-password-form"

export const metadata: Metadata = {
  title: "Reset Password - Vintage Store",
  description: "Enter your new password",
}

// @ts-expect-error - Next.js 15 has issues with page props types
export default async function NewPasswordPage({ searchParams }: any) {
  const token = searchParams.token as string
  const email = searchParams.email as string

  if (!token || !email) {
    notFound()
  }

  const passwordReset = await prisma.passwordReset.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!passwordReset) {
    notFound()
  }

  const now = new Date()
  if (now > passwordReset.expires) {
    await prisma.passwordReset.delete({
      where: { token },
    })
    notFound()
  }

  if (passwordReset.user.email !== email) {
    notFound()
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewPasswordForm token={token} email={email} />
        </CardContent>
      </Card>
    </div>
  )
} 