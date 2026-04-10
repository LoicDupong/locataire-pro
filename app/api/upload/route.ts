import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import os from 'os'

const ALLOWED_MIME = new Set(['application/pdf', 'image/jpeg', 'image/png'])
const MAX_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()

    const sessionId = formData.get('sessionId')
    const docKey = formData.get('docKey')
    const file = formData.get('file')

    if (
      typeof sessionId !== 'string' ||
      typeof docKey !== 'string' ||
      !(file instanceof Blob)
    ) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 })
    }

    // Validate MIME server-side
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé' }, { status: 415 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 10 Mo)' }, { status: 413 })
    }

    // Sanitise sessionId to prevent path traversal
    if (!/^[a-f0-9-]{36}$/.test(sessionId)) {
      return NextResponse.json({ error: 'Session invalide' }, { status: 400 })
    }

    const ext = file.type === 'application/pdf' ? 'pdf'
              : file.type === 'image/jpeg'      ? 'jpg'
              : 'png'

    const dir = path.join(os.tmpdir(), sessionId)
    await mkdir(dir, { recursive: true })

    const filePath = path.join(dir, `${docKey}.${ext}`)
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(filePath, buffer)

    const fileName = file instanceof File ? file.name : `${docKey}.${ext}`
    return NextResponse.json({ success: true, fileName })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
