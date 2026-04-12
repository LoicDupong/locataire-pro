'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useDossierStore } from '@/store/dossierStore'
import { generateChecklist } from '@/lib/checklist'
import type { Country, Situation } from '@/types/dossier'
import styles from './ProfileForm.module.scss'

const SITUATION_LABELS: Record<Situation, string> = {
  employee:        'Salarié(e)',
  student:         'Étudiant(e)',
  'self-employed': 'Indépendant(e)',
  unemployed:      'Sans emploi',
}

export default function ProfileForm() {
  const router = useRouter()
  const { setProfile, setSessionId, setChecklist, sessionId } = useDossierStore()

  const [country, setCountry]     = useState<Country>('BE')
  const [name, setName]           = useState('')
  const [situation, setSituation] = useState<Situation>('employee')
  const [email, setEmail]         = useState('')
  const [phone, setPhone]         = useState('')

  const hasGuarantor = situation === 'student' || situation === 'unemployed'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    const profile = {
      name: name.trim(),
      country,
      situation,
      hasGuarantor,
      ...(country === 'BE' ? { email: email.trim(), phone: phone.trim() } : {}),
    }
    const id = sessionId ?? uuidv4()

    setProfile(profile)
    setSessionId(id)
    setChecklist(generateChecklist(profile))
    router.push('/dossier')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Votre profil</h1>

      <div className={styles.field}>
        <label>Pays</label>
        <div className={styles.pills}>
          {(['BE', 'FR'] as Country[]).map((c) => (
            <label
              key={c}
              className={`${styles.pill} ${country === c ? styles.pillActive : ''}`}
            >
              <input
                type="radio"
                name="country"
                value={c}
                checked={country === c}
                onChange={() => setCountry(c)}
                style={{ display: 'none' }}
              />
              {c === 'BE' ? '🇧🇪 Belgique' : '🇫🇷 France'}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="name">Nom complet</label>
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
        <label>Situation</label>
        <div className={styles.grid}>
          {(Object.keys(SITUATION_LABELS) as Situation[]).map((s) => (
            <label
              key={s}
              className={`${styles.pill} ${situation === s ? styles.pillActive : ''}`}
            >
              <input
                type="radio"
                name="situation"
                value={s}
                checked={situation === s}
                onChange={() => setSituation(s)}
                style={{ display: 'none' }}
              />
              {SITUATION_LABELS[s]}
            </label>
          ))}
        </div>
      </div>

      {hasGuarantor && (
        <p className={styles.notice}>
          Un garant est inclus automatiquement pour cette situation.
        </p>
      )}

      {country === 'BE' && (
        <div className={styles.fadeIn}>
          <div className={styles.field}>
            <label htmlFor="email">Email de contact</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jean.dupont@email.com"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Téléphone de contact</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+32 470 00 00 00"
            />
          </div>
        </div>
      )}

      {country === 'FR' && (
        <p className={styles.noticeNeutral}>
          Les documents demandés respectent le décret du 5 novembre 2015.
        </p>
      )}

      <button type="submit" className={styles.submit}>
        Générer ma checklist →
      </button>
    </form>
  )
}
