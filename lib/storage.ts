
import fs from 'fs'
import path from 'path'

export function storageRoot() {
  return process.env.FILE_STORAGE_ROOT || './uploads'
}

export function ensureDir(p: string) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true })
}

export function saveFileToUploads(filename: string, data: Buffer) {
  const root = storageRoot()
  ensureDir(root)
  const dest = path.join(root, filename)
  fs.writeFileSync(dest, data)
  return dest
}
