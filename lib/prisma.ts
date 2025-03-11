// Required for using Prisma in Next.js
export const runtime = "nodejs";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

// Add connection error handling
prisma.$connect()
  .then(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("Successfully connected to the database");
    }
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 