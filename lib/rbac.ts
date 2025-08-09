
import { getServerSession } from 'next-auth'
import { authOptions } from './serverAuth'
import { prisma } from './prisma'
import { Role } from '@prisma/client'

export async function requireRole(roles: Role[]) {
  const session = await getServerSession(authOptions as any)
  if (!session || !session.user) throw new Error('Unauthorized')
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user || !roles.includes(user.role)) throw new Error('Forbidden')
  return user
}

export async function currentUser() {
  const session = await getServerSession(authOptions as any)
  return session?.user ?? null
}
