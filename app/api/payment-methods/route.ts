import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@/lib/rbac'

/**
 * Payment methods API.
 *
 * Allows an authenticated client to list and create their saved payment methods.
 * No external gateway is used – data is stored plainly for UI purposes only.
 */
export async function GET() {
  const user = await currentUser()
  if (!user) return new NextResponse('Unauthorized', { status: 401 })
  // Find the client record associated with this user
  const client = await prisma.client.findFirst({ where: { userId: user.id } })
  if (!client) return NextResponse.json([])
  const methods = await prisma.paymentMethod.findMany({ where: { clientId: client.id } })
  return NextResponse.json(methods)
}

export async function POST(req: Request) {
  const user = await currentUser()
  if (!user) return new NextResponse('Unauthorized', { status: 401 })
  const body = await req.json()
  const client = await prisma.client.findFirst({ where: { userId: user.id } })
  if (!client) return new NextResponse('Client not found', { status: 400 })
  const pm = await prisma.paymentMethod.create({
    data: {
      clientId: client.id,
      brand: body.brand || null,
      last4: body.last4 || null,
      expMonth: body.expMonth ? Number(body.expMonth) : null,
      expYear: body.expYear ? Number(body.expYear) : null
    }
  })
  return NextResponse.json(pm)
}
