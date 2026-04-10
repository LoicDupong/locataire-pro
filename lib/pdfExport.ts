import { PDFDocument } from 'pdf-lib'
import { readFile } from 'fs/promises'
import path from 'path'
import os from 'os'

type FileEntry = {
  docKey: string
  filePath: string
  ext: string
}

async function findFile(dir: string, docKey: string): Promise<FileEntry | null> {
  for (const ext of ['pdf', 'jpg', 'png']) {
    const filePath = path.join(dir, `${docKey}.${ext}`)
    try {
      await readFile(filePath) // throws if not found
      return { docKey, filePath, ext }
    } catch {
      // try next extension
    }
  }
  return null
}

export async function mergeToPdf(sessionId: string, docKeys: string[]): Promise<Uint8Array> {
  const dir = path.join(os.tmpdir(), sessionId)
  const merged = await PDFDocument.create()

  for (const docKey of docKeys) {
    const entry = await findFile(dir, docKey)
    if (!entry) continue

    const bytes = await readFile(entry.filePath)

    if (entry.ext === 'pdf') {
      const sourcePdf = await PDFDocument.load(bytes)
      const pageIndices = sourcePdf.getPageIndices()
      const copiedPages = await merged.copyPages(sourcePdf, pageIndices)
      copiedPages.forEach((page) => merged.addPage(page))
    } else {
      // Image — embed as a single PDF page
      const image = entry.ext === 'jpg'
        ? await merged.embedJpg(bytes)
        : await merged.embedPng(bytes)

      const { width, height } = image.scale(1)
      const page = merged.addPage([width, height])
      page.drawImage(image, { x: 0, y: 0, width, height })
    }
  }

  return merged.save()
}
