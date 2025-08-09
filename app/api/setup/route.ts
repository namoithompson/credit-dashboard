
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { Role } from '@prisma/client'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) return NextResponse.json({ error: 'email/password required' }, { status: 400 })
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return NextResponse.json({ error: 'exists' }, { status: 400 })
  const user = await prisma.user.create({ data: { email, password: await hash(password, 10), role: Role.ADMIN } })
  return NextResponse.json({ ok: true, id: user.id })
}
