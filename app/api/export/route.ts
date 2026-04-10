import { NextRequest, NextResponse } from 'next/server'
import { rm } from 'fs/promises'
import path from 'path'
import os from 'os'
import { mergeToPdf } from '@/lib/pdfExport'

export async function POST(req: NextRequest) {
  let sessionId: string | undefined

  try {
    const body = await req.json()
    sessionId = body.sessionId
    const docKeys: string[] = body.docKeys ?? []

    if (typeof sessionId !== 'string' || !/^[a-f0-9-]{36}$/.test(sessionId)) {
      return NextResponse.json({ error: 'Session invalide' }, { status: 400 })
    }

    if (!Array.isArray(docKeys) || docKeys.length === 0) {
      return NextResponse.json({ error: 'Aucun document à exporter' }, { status: 400 })
    }

    const pdfBytes = await mergeToPdf(sessionId, docKeys)

    // Delete temp folder after building the PDF bytes
    const dir = path.join(os.tmpdir(), sessionId)
    await rm(dir, { recursive: true, force: true })

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="dossier-location.pdf"',
      },
    })
  } catch {
    // Best-effort cleanup on error
    if (sessionId) {
      const dir = path.join(os.tmpdir(), sessionId)
      await rm(dir, { recursive: true, force: true }).catch(() => {})
    }
    return NextResponse.json({ error: 'Erreur lors de la génération du PDF' }, { status: 500 })
  }
}
