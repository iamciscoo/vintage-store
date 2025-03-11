// Required for using bcryptjs in Next.js
export const runtime = "nodejs";

import NextAuth from "next-auth"
import { compare, hash } from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { prisma } from "@/lib/prisma"
import { Role } from "@prisma/client"
import type { JWT } from "@auth/core/jwt"
import type { Session, User } from "next-auth"

declare module "next-auth" {
  interface User {
    role: Role
  }
  interface Session {
    user: User & {
      role: Role
    }
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: Role
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        })

        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
      }
      // Handle OAuth sign in
      if (account && user) {
        // Generate a secure random password for OAuth users
        const randomPassword = await hash(crypto.randomUUID(), 12)
        // For OAuth sign-ins, create or update user in database
        await prisma.user.upsert({
          where: { email: token.email! },
          update: {},
          create: {
            email: token.email!,
            name: token.name!,
            role: Role.USER,
            password: randomPassword
          },
        })
      }
      return token
    },
    async session({ session, token }): Promise<Session> {
      if (session?.user) {
        session.user.role = token.role as Role
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin"
  }
}) 