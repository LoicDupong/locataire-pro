'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDossierStore } from '@/store/dossierStore'
import { canExport } from '@/lib/checklist'
import ProgressBar from '@/components/ProgressBar'
import Checklist from '@/components/Checklist'
import ExportButton from '@/components/ExportButton'
import styles from './page.module.scss'

const SITUATION_LABELS: Record<string, string> = {
  employee:        'Salarié(e)',
  student:         'Étudiant(e)',
  'self-employed': 'Indépendant(e)',
  unemployed:      'Sans emploi / autre',
}

export default function DossierPage() {
  const router = useRouter()
  const { profile, sessionId, checklist } = useDossierStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (mounted && !profile) router.replace('/')
  }, [mounted, profile, router])

  if (!mounted || !profile || !sessionId) return null

  const requiredItems     = checklist.filter((i) => i.required && !i.forGuarantor)
  const uploadedRequired  = requiredItems.filter((i) => i.status === 'uploaded')
  const guarantorItems    = checklist.filter((i) => i.required && i.forGuarantor)
  const uploadedGuarantor = guarantorItems.filter((i) => i.status === 'uploaded')
  const exportReady       = canExport(checklist, profile.hasGuarantor)

  const situationLabel = SITUATION_LABELS[profile.situation] ?? profile.situation

  return (
    <main className={styles.main}>
      <div className={styles.stepper}>
        <div className={`${styles.step} ${styles.stepDone}`}>
          <div className={styles.stepCircle}>✓</div>
          <span className={styles.stepLabel}>Profil</span>
        </div>
        <div className={styles.stepLine} />
        <div className={`${styles.step} ${styles.stepActive}`}>
          <div className={styles.stepCircle}>2</div>
          <span className={styles.stepLabel}>Dossier</span>
        </div>
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1 className={styles.title}>{profile.name}</h1>
            <span className={styles.situationTag}>
              {situationLabel}
              {profile.hasGuarantor && ' · Avec garant'}
            </span>
          </div>
          <button className={styles.restart} onClick={() => router.push('/')}>
            Recommencer
          </button>
        </header>

        <Checklist items={checklist} sessionId={sessionId} />

        <ProgressBar
          uploaded={uploadedRequired.length}
          total={requiredItems.length}
        />

        {guarantorItems.length > 0 && (
          <ProgressBar
            uploaded={uploadedGuarantor.length}
            total={guarantorItems.length}
            title="Garant"
          />
        )}

        <ExportButton canExport={exportReady} />

        <div className={styles.notices}>
          <p>🔒 Vos documents ne sont jamais stockés. Ils sont supprimés dès l&apos;export.</p>
          <p>⚠️ Les fichiers sont perdus au rechargement. Ne pas utiliser sur un ordinateur partagé.</p>
        </div>
      </div>
    </main>
  )
}
