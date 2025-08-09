
// Basic non-runtime smoke test to validate extractor behavior with mocked PDF bytes
import { describe, it, expect } from 'vitest'
import { extractFromPdfBuffer } from '../lib/extractor'

describe('extractor', () => {
  it('finds a score and bureau from text buffer', async () => {
    const buf = Buffer.from('Equifax\nCredit Score: 400')
    const res = await extractFromPdfBuffer(buf as any)
    expect(res.bureau).toBe('EQUIFAX')
    expect(res.score).toBe(400)
  })
})
