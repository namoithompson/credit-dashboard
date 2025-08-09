
import type { Bureau } from '@prisma/client'

type ExtractResult = {
  score?: number
  bureau?: Bureau
  scoreDate?: Date
  rawText?: string
  meta?: Record<string, any>
}

const SCORE_REGEX = /(?:score|credit\s*score)\D{0,15}(\d{2,4})/i

function detectBureau(text: string): Bureau | undefined {
  const t = text.toLowerCase()
  if (t.includes('equifax')) return 'EQUIFAX'
  if (t.includes('illion')) return 'ILLION'
  if (t.includes('experian')) return 'EXPERIAN'
  return undefined
}

function sanitizeScore(n: number, b?: Bureau) {
  const range = { EQUIFAX: [0,1200], ILLION: [0,1000], EXPERIAN: [0,1000] } as const
  if (!b) return null
  const [min, max] = range[b]
  return n >= min && n <= max ? n : null
}

export async function extractFromPdfBuffer(buf: Buffer): Promise<ExtractResult> {
  // Lazy import to avoid edge issues if pdf-parse not installed yet
  let pdfParse: any
  try {
    pdfParse = (await import('pdf-parse')).default
  } catch {
    // Fallback: treat as plain text for tests
    const text = buf.toString('utf8')
    const bureau = detectBureau(text)
    const m = text.match(SCORE_REGEX)
    const n = m ? parseInt(m[1], 10) : undefined
    const score = n && bureau ? sanitizeScore(n, bureau) ?? undefined : undefined
    return { score, bureau, scoreDate: new Date(), rawText: text }
  }
  const data = await pdfParse(buf)
  const text: string = data.text || ''
  const bureau = detectBureau(text)
  // Try local anchor search near bureau keyword
  let score: number | undefined = undefined
  if (bureau) {
    const lines = text.split(/\r?\n/)
    const idx = lines.findIndex(l => l.toLowerCase().includes(bureau.toLowerCase()))
    const window = lines.slice(Math.max(0, idx-10), idx+11).join('\n')
    const m = window.match(SCORE_REGEX) || text.match(SCORE_REGEX)
    if (m) {
      const n = parseInt(m[1], 10)
      const s = sanitizeScore(n, bureau)
      if (s != null) score = s
    }
  }
  if (!score) {
    const m = text.match(SCORE_REGEX)
    if (m) score = parseInt(m[1], 10)
  }
  return { score, bureau, scoreDate: new Date(), rawText: text }
}
