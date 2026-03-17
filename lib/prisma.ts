import { PrismaClient } from '@prisma/client'

type CompatiblePrismaClient = PrismaClient & Record<string, any>

const globalForPrisma = globalThis as unknown as {
  prisma: CompatiblePrismaClient | undefined
}

export const prisma: CompatiblePrismaClient =
  globalForPrisma.prisma ?? (new PrismaClient() as CompatiblePrismaClient)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
