import { Metadata } from "next"
import { redirect } from "next/navigation"
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
  title: "Set New Password - Vintage Store",
  description: "Set a new password for your account",
}

interface NewPasswordPageProps {
  searchParams: {
    token?: string
  }
}

async function getPasswordReset(token: string) {
  const passwordReset = await prisma.passwordReset.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!passwordReset) {
    return null
  }

  const now = new Date()
  if (now > passwordReset.expires) {
    await prisma.passwordReset.delete({
      where: { token },
    })
    return null
  }

  return passwordReset
}

export default async function NewPasswordPage({
  searchParams,
}: NewPasswordPageProps) {
  const token = searchParams.token

  if (!token) {
    redirect("/auth/signin")
  }

  const passwordReset = await getPasswordReset(token)

  if (!passwordReset) {
    redirect("/auth/signin?error=Invalid or expired reset link")
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Set new password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewPasswordForm
            token={token}
            email={passwordReset.user.email}
          />
        </CardContent>
      </Card>
    </div>
  )
} 