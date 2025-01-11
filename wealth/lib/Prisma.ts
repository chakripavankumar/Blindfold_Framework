import { PrismaClient } from "@prisma/client";


declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Use a globally cached PrismaClient instance to prevent multiple connections in development
export const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}