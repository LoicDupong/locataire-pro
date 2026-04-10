'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDossierStore } from '@/store/dossierStore'
import { canExport } from '@/lib/checklist'
import ProgressBar from '@/components/ProgressBar'
import Checklist from '@/components/Checklist'
import ExportButton from '@/components/ExportButton'
import styles from './page.module.scss'

export default function DossierPage() {
  const router = useRouter()
  const { profile, sessionId, checklist } = useDossierStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to home if no profile (e.g. direct URL access or after reset)
  useEffect(() => {
    if (mounted && !profile) {
      router.replace('/')
    }
  }, [mounted, profile, router])

  if (!mounted || !profile || !sessionId) return null

  const requiredItems = checklist.filter((i) => i.required && !i.forGuarantor)
  const uploadedRequired = requiredItems.filter((i) => i.status === 'uploaded')
  const exportReady = canExport(checklist, profile.hasGuarantor)

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dossier de {profile.name}</h1>
          <p className={styles.situation}>
            {profile.situation === 'employee' && 'Salarié(e)'}
            {profile.situation === 'student' && 'Étudiant(e)'}
            {profile.situation === 'self-employed' && 'Indépendant(e)'}
            {profile.hasGuarantor && ' · Avec garant'}
          </p>
        </div>
        <button className={styles.restart} onClick={() => router.push('/')}>
          Recommencer
        </button>
      </header>

      <ProgressBar
        uploaded={uploadedRequired.length}
        total={requiredItems.length}
      />

      <Checklist items={checklist} sessionId={sessionId} />

      <ExportButton canExport={exportReady} />

      <div className={styles.notices}>
        <p>🔒 Vos documents ne sont jamais stockés. Ils sont supprimés dès l&apos;export.</p>
        <p>⚠️ Les fichiers sont perdus au rechargement. Ne pas utiliser sur un ordinateur partagé.</p>
      </div>
    </main>
  )
}
