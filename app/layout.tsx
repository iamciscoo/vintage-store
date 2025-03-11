// Required for using auth in Next.js
export const runtime = "nodejs";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vintage Store",
  description: "Your one-stop shop for vintage clothing and accessories",
  keywords: ["vintage", "clothing", "fashion", "accessories", "online store"],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Add error handling for auth
  let session;
  try {
    session = await auth();
  } catch (error) {
    console.error("Failed to get auth session:", error);
    session = null;
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
