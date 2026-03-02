import { PrismaPg } from "@prisma/adapter-pg";
import * as PrismaClientPkg from "@prisma/client";
import { Pool } from "pg";

const PrismaClientCtor = (
  PrismaClientPkg as unknown as {
    PrismaClient: new (options?: { adapter?: PrismaPg }) => unknown;
  }
).PrismaClient;

type PrismaClient = any;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const connectionString = process.env["DATABASE_URL"];
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClientCtor({ adapter }) as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
