import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { readFile } from 'fs/promises'
import path from 'path'
import os from 'os'

type FileEntry = {
  docKey: string
  filePath: string
  ext: string
}

type CoverProfile = {
  name?: string
  email?: string
  phone?: string
}

async function findFile(dir: string, docKey: string): Promise<FileEntry | null> {
  for (const ext of ['pdf', 'jpg', 'png']) {
    const filePath = path.join(dir, `${docKey}.${ext}`)
    try {
      await readFile(filePath)
      return { docKey, filePath, ext }
    } catch {
      // try next extension
    }
  }
  return null
}

async function addCoverPage(doc: PDFDocument, profile: CoverProfile): Promise<void> {
  const page = doc.insertPage(0, [595, 842]) // A4
  const regular = await doc.embedFont(StandardFonts.Helvetica)
  const bold    = await doc.embedFont(StandardFonts.HelveticaBold)
  const black   = rgb(0.1, 0.1, 0.1)
  const grey    = rgb(0.4, 0.4, 0.4)

  // Title
  page.drawText('Dossier locataire', {
    x: 50, y: 750,
    size: 30,
    font: bold,
    color: black,
  })

  // Separator line
  page.drawLine({
    start: { x: 50, y: 730 },
    end:   { x: 545, y: 730 },
    thickness: 1,
    color: grey,
  })

  let y = 700

  if (profile.name) {
    page.drawText(profile.name, { x: 50, y, size: 16, font: bold, color: black })
    y -= 28
  }

  if (profile.email) {
    page.drawText(profile.email, { x: 50, y, size: 13, font: regular, color: grey })
    y -= 22
  }

  if (profile.phone) {
    page.drawText(profile.phone, { x: 50, y, size: 13, font: regular, color: grey })
  }
}

export async function mergeToPdf(
  sessionId: string,
  docKeys: string[],
  profile: CoverProfile = {},
): Promise<Uint8Array> {
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

  await addCoverPage(merged, profile)

  return merged.save()
}
