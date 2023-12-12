import { Prisma, PrismaClient } from '@prisma/client'

const globalPrisma = globalThis as unknown as { prismaClient: PrismaClient }
const prismaClient = globalPrisma.prismaClient || new PrismaClient()

export default prismaClient

if (process.env.NODE_ENV !== 'production') {
  globalPrisma.prismaClient = prismaClient
}
