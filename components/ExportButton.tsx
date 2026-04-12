'use client'
import { useState } from 'react'
import { useDossierStore } from '@/store/dossierStore'
import styles from './ExportButton.module.scss'

type Props = {
  canExport: boolean
}

export default function ExportButton({ canExport }: Props) {
  const { sessionId, checklist, profile, reset } = useDossierStore()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState<string | null>(null)

  async function handleExport() {
    if (!canExport || !sessionId || !profile) return
    setLoading(true)
    setError(null)

    try {
      const uploadedKeys = checklist
        .filter((i) => i.status === 'uploaded')
        .flatMap((i) => {
          if ((i.maxFiles ?? 1) > 1) {
            return (i.fileNames ?? []).map((_, idx) => `${i.key}_${idx}`)
          }
          return [i.key]
        })

      const res = await fetch('/api/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          docKeys: uploadedKeys,
          profile: { name: profile.name, email: profile.email, phone: profile.phone },
        }),
      })

      if (!res.ok) {
        const { error: msg } = await res.json()
        throw new Error(msg ?? "Erreur lors de l'export")
      }

      const blob = await res.blob()
      const url  = URL.createObjectURL(blob)
      const a    = document.createElement('a')
      a.href     = url
      a.download = 'dossier-location.pdf'
      a.click()
      URL.revokeObjectURL(url)

      reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue')
    } finally {
      setLoading(false)
    }
  }

  const requiredMissing = checklist.filter(
    (i) => i.required && i.status !== 'uploaded'
  ).length

  const btnClass = loading
    ? styles.loading
    : canExport
      ? styles.active
      : styles.disabled

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <button
          className={`${styles.button} ${btnClass}`}
          onClick={handleExport}
          disabled={!canExport || loading}
        >
          {loading ? 'Export en cours...' : 'Télécharger mon dossier PDF'}
        </button>
        {!canExport && !loading && (
          <p className={styles.hint}>
            {requiredMissing} document{requiredMissing > 1 ? 's' : ''} requis manquant{requiredMissing > 1 ? 's' : ''}
          </p>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  )
}
