
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const clientSchema = z.object({
  firstName: z.string().min(1),
  middleName: z.string().optional(),
  lastName: z.string().min(1),
  dob: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional()
})

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = clientSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  const c = await prisma.client.create({ data: {
    ...parsed.data,
    dob: parsed.data.dob ? new Date(parsed.data.dob) : null
  }} as any)
  return NextResponse.json(c)
}
