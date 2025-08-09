
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { extractFromPdfBuffer } from '@/lib/extractor'
import { saveFileToUploads } from '@/lib/storage'

export async function POST(req: Request) {
  const form = await req.formData()
  const file = form.get('file') as File | null
  const clientId = String(form.get('clientId') || '')
  const type = String(form.get('type') || 'CREDIT_FILE')
  if (!file || !clientId) return NextResponse.json({ error: 'Missing file or clientId' }, { status: 400 })
  if (!file.type.includes('pdf')) return NextResponse.json({ error: 'Only PDF allowed' }, { status: 400 })
  const buf = Buffer.from(await file.arrayBuffer())
  const path = saveFileToUploads(`${Date.now()}-${file.name}`, buf)
  const doc = await prisma.document.create({
    data: { clientId, type, filename: path, mime: file.type, size: buf.byteLength }
  } as any)
  const result = await extractFromPdfBuffer(buf)
  if (result.score && result.bureau) {
    await prisma.bureauScore.upsert({
      where: { clientId_bureau: { clientId, bureau: result.bureau } },
      create: { clientId, bureau: result.bureau, score: result.score, scoreDate: result.scoreDate || new Date(), sourceDocumentId: doc.id },
      update: { score: result.score, scoreDate: result.scoreDate || new Date(), sourceDocumentId: doc.id }
    })
  }
  await prisma.document.update({ where: { id: doc.id }, data: { extractedAt: new Date(), metadata: { extractor: 'pdf-parse', bureau: result.bureau, score: result.score } } })
  return NextResponse.json({ ok: true, documentId: doc.id, extraction: result })
}
