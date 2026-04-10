'use client'
import { useState } from 'react'
import { useDossierStore } from '@/store/dossierStore'
import styles from './ExportButton.module.scss'

type Props = {
  canExport: boolean
}

export default function ExportButton({ canExport }: Props) {
  const { sessionId, checklist, reset } = useDossierStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleExport() {
    if (!canExport || !sessionId) return
    setLoading(true)
    setError(null)

    try {
      const uploadedKeys = checklist
        .filter((i) => i.status === 'uploaded')
        .map((i) => i.key)

      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, docKeys: uploadedKeys }),
      })

      if (!res.ok) {
        const { error: msg } = await res.json()
        throw new Error(msg ?? "Erreur lors de l'export")
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'dossier-location.pdf'
      a.click()
      URL.revokeObjectURL(url)

      // Auto-clear store after successful export
      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.button}
        onClick={handleExport}
        disabled={!canExport || loading}
      >
        {loading ? 'Export en cours...' : 'Télécharger mon dossier PDF'}
      </button>
      {!canExport && (
        <p className={styles.hint}>
          Téléversez tous les documents requis pour activer l&apos;export.
        </p>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
