'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useDossierStore } from '@/store/dossierStore'
import { generateChecklist } from '@/lib/checklist'
import type { Situation } from '@/types/dossier'
import styles from './ProfileForm.module.scss'

export default function ProfileForm() {
  const router = useRouter()
  const { setProfile, setSessionId, setChecklist, sessionId } = useDossierStore()

  const [name, setName] = useState('')
  const [situation, setSituation] = useState<Situation>('employee')
  const [hasGuarantor, setHasGuarantor] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    // Students always require a guarantor — force it regardless of checkbox state
    const profile = { name: name.trim(), situation, hasGuarantor: situation === 'student' ? true : hasGuarantor }
    const id = sessionId ?? uuidv4()

    setProfile(profile)
    setSessionId(id)
    setChecklist(generateChecklist(profile))

    router.push('/dossier')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Constituez votre dossier</h1>

      <div className={styles.field}>
        <label htmlFor="name">Votre nom complet</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jean Dupont"
          required
        />
      </div>

      <div className={styles.field}>
        <label>Votre situation</label>
        <div className={styles.options}>
          {(['employee', 'student', 'self-employed'] as Situation[]).map((s) => (
            <label key={s} className={styles.option}>
              <input
                type="radio"
                name="situation"
                value={s}
                checked={situation === s}
                onChange={() => setSituation(s)}
              />
              {s === 'employee' ? 'Salarié(e)' : s === 'student' ? 'Étudiant(e)' : 'Indépendant(e)'}
            </label>
          ))}
        </div>
      </div>

      {situation !== 'student' && (
        <div className={styles.field}>
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={hasGuarantor}
              onChange={(e) => setHasGuarantor(e.target.checked)}
            />
            Ajouter un garant
          </label>
        </div>
      )}

      {situation === 'student' && (
        <p className={styles.notice}>
          Un garant est inclus automatiquement pour les étudiants.
        </p>
      )}

      <button type="submit" className={styles.submit}>
        Générer mon checklist →
      </button>
    </form>
  )
}
