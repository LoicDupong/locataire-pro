# App UI Harmonization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the visual UI of the app flow (`/start`, `/dossier`) to match the dark SaaS aesthetic of the landing page, with zero changes to business logic.

**Architecture:** Markup + SCSS refactor only across 13 files. No new components (YAGNI). CSS variables already defined in `globals.scss` are extended with dark app tokens and consumed by each component's SCSS module. Logic handlers, Zustand store, and API routes are untouched.

**Tech Stack:** Next.js 14 App Router, SCSS Modules, TypeScript, Zustand

---

## File Map

| File | Change |
|---|---|
| `app/globals.scss` | Add dark app CSS tokens |
| `app/start/page.tsx` | Add stepper markup, remove back link |
| `app/start/page.module.scss` | Full dark layout + stepper styles |
| `app/dossier/page.tsx` | Add stepper (step 2), situation pill, reorder ProgressBar |
| `app/dossier/page.module.scss` | Full dark layout + stepper + header styles |
| `components/ProfileForm.tsx` | Pills for country/situation (markup only, logic unchanged) |
| `components/ProfileForm.module.scss` | Full dark theme refactor |
| `components/ChecklistItem.tsx` | Add custom checkbox div |
| `components/ChecklistItem.module.scss` | Full dark mode refactor |
| `components/Checklist.module.scss` | Group title + list dark styles |
| `components/ProgressBar.module.scss` | Inline minimal dark |
| `components/ExportButton.tsx` | Add card wrapper div + loading spinner |
| `components/ExportButton.module.scss` | Full dark refactor with states |

---

## Task 1: CSS Tokens

**Files:**
- Modify: `app/globals.scss`

- [ ] **Step 1: Verify build passes before any changes**

```bash
npm run build
```

Expected: exits 0, no errors.

- [ ] **Step 2: Add dark app tokens to globals.scss**

Open `app/globals.scss`. After the existing `:root` block, the current vars end at `--dark-muted`. Add the following new vars **inside** the same `:root` block, after `--dark-muted`:

```scss
:root {
  /* existing vars ... */

  /* App flow dark tokens */
  --app-bg: #0D1117;
  --app-surface: #161B27;
  --app-border: rgba(255, 255, 255, 0.08);
  --app-muted: rgba(255, 255, 255, 0.35);
  --success: #22c55e;
  --success-dim: rgba(34, 197, 94, 0.15);
  --success-border: rgba(34, 197, 94, 0.3);
  --warning-dim: rgba(253, 224, 71, 0.15);
  --warning-text: #fcd34d;
}
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add app/globals.scss
git commit -m "style: add dark app tokens to CSS vars"
```

---

## Task 2: `/start` Page Shell

**Files:**
- Modify: `app/start/page.tsx`
- Modify: `app/start/page.module.scss`

- [ ] **Step 1: Replace `app/start/page.module.scss` entirely**

```scss
.main {
  min-height: 100vh;
  background: var(--app-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 80px;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 36px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stepCircle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--app-border);
  background: var(--app-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--app-muted);
}

.stepLabel {
  font-size: 0.7rem;
  color: var(--app-muted);
  font-weight: 500;
}

.stepActive .stepCircle {
  border-color: var(--primary);
  background: rgba(29, 78, 216, 0.15);
  color: #fff;
}

.stepActive .stepLabel {
  color: #fff;
}

.stepLine {
  width: 48px;
  height: 1px;
  background: var(--app-border);
  margin: 0 8px;
  margin-bottom: 22px;
}

.content {
  width: 100%;
  max-width: 520px;
}
```

- [ ] **Step 2: Replace `app/start/page.tsx` entirely**

```tsx
import ProfileForm from '@/components/ProfileForm'
import styles from './page.module.scss'

export default function StartPage() {
  return (
    <main className={styles.main}>
      <div className={styles.stepper}>
        <div className={`${styles.step} ${styles.stepActive}`}>
          <div className={styles.stepCircle}>1</div>
          <span className={styles.stepLabel}>Profil</span>
        </div>
        <div className={styles.stepLine} />
        <div className={styles.step}>
          <div className={styles.stepCircle}>2</div>
          <span className={styles.stepLabel}>Dossier</span>
        </div>
      </div>
      <div className={styles.content}>
        <ProfileForm />
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add app/start/page.tsx app/start/page.module.scss
git commit -m "style: dark layout + stepper for /start page"
```

---

## Task 3: ProfileForm

**Files:**
- Modify: `components/ProfileForm.tsx`
- Modify: `components/ProfileForm.module.scss`

- [ ] **Step 1: Replace `components/ProfileForm.module.scss` entirely**

```scss
.form {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
}

.title {
  font-size: 1.4rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;

  > label:not(.pill) {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--app-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  input[type='text'],
  input[type='email'],
  input[type='tel'] {
    background: var(--app-bg);
    border: 1px solid var(--app-border);
    border-radius: 8px;
    padding: 11px 14px;
    color: #fff;
    font-size: 0.95rem;
    font-family: inherit;
    width: 100%;
    transition: border-color 0.15s, box-shadow 0.15s;

    &::placeholder {
      color: rgba(255, 255, 255, 0.2);
    }

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.2);
    }
  }
}

.pills {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.pill {
  flex: 1;
  min-width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 11px 10px;
  background: var(--app-bg);
  border: 1.5px solid var(--app-border);
  border-radius: 10px;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--app-muted);
  transition: border-color 0.15s, background 0.15s, color 0.15s;
  text-align: center;

  &:hover {
    border-color: rgba(96, 165, 250, 0.3);
    color: rgba(255, 255, 255, 0.6);
  }

  &Active {
    border-color: var(--primary) !important;
    background: rgba(29, 78, 216, 0.12);
    color: #fff;
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

.notice {
  background: rgba(29, 78, 216, 0.08);
  border: 1px solid rgba(29, 78, 216, 0.2);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: #93c5fd;
}

.noticeNeutral {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--app-border);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: var(--app-muted);
}

.fadeIn {
  animation: fadeIn 0.2s ease;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submit {
  padding: 14px;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  width: 100%;
  transition: background 0.15s, transform 0.12s;

  &:hover {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }
}
```

- [ ] **Step 2: Replace `components/ProfileForm.tsx` entirely**

All logic is unchanged — only JSX markup and class names change.

```tsx
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
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/ProfileForm.tsx components/ProfileForm.module.scss
git commit -m "style: dark theme + pill cards for ProfileForm"
```

---

## Task 4: `/dossier` Page Shell

**Files:**
- Modify: `app/dossier/page.tsx`
- Modify: `app/dossier/page.module.scss`

- [ ] **Step 1: Replace `app/dossier/page.module.scss` entirely**

```scss
.main {
  min-height: 100vh;
  background: var(--app-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px 80px;
}

/* Stepper — identical structure to /start but step 2 active */
.stepper {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 36px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.stepCircle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1.5px solid var(--app-border);
  background: var(--app-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--app-muted);
}

.stepLabel {
  font-size: 0.7rem;
  color: var(--app-muted);
  font-weight: 500;
}

.stepActive .stepCircle {
  border-color: var(--primary);
  background: rgba(29, 78, 216, 0.15);
  color: #fff;
}

.stepActive .stepLabel {
  color: #fff;
}

.stepDone .stepCircle {
  border-color: var(--success-border);
  background: var(--success-dim);
  color: var(--success);
}

.stepLine {
  width: 48px;
  height: 1px;
  background: var(--app-border);
  margin: 0 8px;
  margin-bottom: 22px;
}

/* Page content */
.content {
  width: 100%;
  max-width: 640px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.headerLeft {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}

.situationTag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 100px;
  padding: 3px 10px;
  font-size: 0.75rem;
  color: var(--app-muted);
  font-weight: 500;
  width: fit-content;
}

.restart {
  padding: 7px 14px;
  background: transparent;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  font-size: 0.8rem;
  color: var(--app-muted);
  flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.6);
  }
}

.notices {
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    font-size: 0.75rem;
    color: var(--app-muted);
    line-height: 1.5;
  }
}
```

- [ ] **Step 2: Replace `app/dossier/page.tsx` entirely**

Note: ProgressBar is moved **after** Checklist (between checklist and export).

```tsx
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
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add app/dossier/page.tsx app/dossier/page.module.scss
git commit -m "style: dark layout + stepper + situation pill for /dossier page"
```

---

## Task 5: ChecklistItem

**Files:**
- Modify: `components/ChecklistItem.tsx`
- Modify: `components/ChecklistItem.module.scss`

- [ ] **Step 1: Replace `components/ChecklistItem.module.scss` entirely**

```scss
.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 10px;
  transition: border-color 0.15s, background 0.15s;

  &.uploaded {
    border-color: var(--success-border);
    background: var(--success-dim);
  }

  &.optional {
    opacity: 0.55;
    border-style: dashed;
  }
}

.checkbox {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  transition: background 0.15s, border-color 0.15s;

  &.checked {
    background: var(--success-dim);
    border-color: var(--success-border);
    color: var(--success);
  }
}

.info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.fileList {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.fileName {
  font-size: 0.72rem;
  color: var(--app-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.badge {
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 100px;
  font-weight: 600;
  white-space: nowrap;

  &_pending  { background: var(--warning-dim);  color: var(--warning-text); }
  &_uploaded { background: var(--success-dim);  color: var(--success); }
  &_optional { background: rgba(255, 255, 255, 0.05); color: var(--app-muted); }
}

.uploadBtn {
  padding: 5px 11px;
  background: rgba(29, 78, 216, 0.2);
  border: 1px solid rgba(96, 165, 250, 0.25);
  border-radius: 7px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #93c5fd;
  white-space: nowrap;
  transition: background 0.15s;

  &:hover {
    background: rgba(29, 78, 216, 0.35);
  }
}
```

- [ ] **Step 2: Replace `components/ChecklistItem.tsx` entirely**

Only change: add `<div className>` custom checkbox. All logic (handleFileChange, getBadgeLabel, getButtonLabel, atMax) is untouched.

```tsx
'use client'
import { useRef } from 'react'
import { useDossierStore } from '@/store/dossierStore'
import type { ChecklistItem as TChecklistItem } from '@/types/dossier'
import styles from './ChecklistItem.module.scss'

const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png']
const MAX_SIZE_MB = 10

type Props = {
  item: TChecklistItem
  sessionId: string
}

export default function ChecklistItem({ item, sessionId }: Props) {
  const { markUploaded } = useDossierStore()
  const inputRef = useRef<HTMLInputElement>(null)

  const maxFiles   = item.maxFiles ?? 1
  const uploadCount = item.fileNames?.length ?? 0
  const isMulti    = maxFiles > 1
  const atMax      = uploadCount >= maxFiles

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert('Format non accepté. Utilisez PDF, JPG ou PNG.')
      return
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert(`Fichier trop volumineux (max ${MAX_SIZE_MB} Mo).`)
      return
    }

    const docKey = isMulti ? `${item.key}_${uploadCount}` : item.key

    const formData = new FormData()
    formData.append('sessionId', sessionId)
    formData.append('docKey', docKey)
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!res.ok) {
      alert('Erreur lors du téléversement. Réessayez.')
      return
    }

    markUploaded(item.key, file, file.name)
    if (inputRef.current) inputRef.current.value = ''
  }

  function getBadgeLabel() {
    if (isMulti) {
      if (uploadCount === 0) return item.required ? 'En attente' : 'Optionnel'
      return `${uploadCount}/${maxFiles} fichier${uploadCount > 1 ? 's' : ''}`
    }
    return { pending: 'En attente', uploaded: 'Ajouté', optional: 'Optionnel' }[item.status]
  }

  function getButtonLabel() {
    if (isMulti) return uploadCount === 0 ? 'Ajouter' : 'Ajouter'
    return item.status === 'uploaded' ? 'Remplacer' : 'Ajouter'
  }

  const statusClass = isMulti && uploadCount > 0 ? 'uploaded' : item.status
  const isChecked   = statusClass === 'uploaded'

  return (
    <div className={`${styles.item} ${styles[statusClass]}`}>
      <div className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}>
        {isChecked && '✓'}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>{item.label}</span>
        {isMulti && item.fileNames && item.fileNames.length > 0 && (
          <div className={styles.fileList}>
            {item.fileNames.map((name, i) => (
              <span key={i} className={styles.fileName}>{name}</span>
            ))}
          </div>
        )}
        {!isMulti && item.fileNames?.[0] && (
          <span className={styles.fileName}>{item.fileNames[0]}</span>
        )}
      </div>
      <div className={styles.actions}>
        <span className={`${styles.badge} ${styles[`badge_${statusClass}`]}`}>
          {getBadgeLabel()}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        {!atMax && (
          <button
            className={styles.uploadBtn}
            onClick={() => inputRef.current?.click()}
          >
            {getButtonLabel()}
          </button>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/ChecklistItem.tsx components/ChecklistItem.module.scss
git commit -m "style: dark mode refactor for ChecklistItem"
```

---

## Task 6: Checklist Group Styles

**Files:**
- Modify: `components/Checklist.module.scss`

- [ ] **Step 1: Replace `components/Checklist.module.scss` entirely**

```scss
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.groupTitle {
  font-size: 0.7rem;
  font-weight: 600;
  color: var(--app-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
```

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add components/Checklist.module.scss
git commit -m "style: dark group titles for Checklist"
```

---

## Task 7: ProgressBar

**Files:**
- Modify: `components/ProgressBar.module.scss`

- [ ] **Step 1: Replace `components/ProgressBar.module.scss` entirely**

```scss
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: var(--app-muted);

  strong {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
  }
}

.count {
  color: #60a5fa;
  font-weight: 600;
  font-size: 0.75rem;
}

.track {
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
}

.fill {
  height: 100%;
  background: var(--primary);
  border-radius: 2px;
  transition: width 0.4s ease;
}
```

- [ ] **Step 2: Update `components/ProgressBar.tsx` to use new `.count` span and `.label` layout**

```tsx
import styles from './ProgressBar.module.scss'

type Props = {
  uploaded: number
  total: number
  title?: string
}

export default function ProgressBar({ uploaded, total, title }: Props) {
  const pct = total === 0 ? 0 : Math.round((uploaded / total) * 100)

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        <span>{title && <strong>{title} — </strong>}{uploaded}/{total} documents requis</span>
        <span className={styles.count}>{pct}%</span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/ProgressBar.tsx components/ProgressBar.module.scss
git commit -m "style: inline minimal dark ProgressBar"
```

---

## Task 8: ExportButton

**Files:**
- Modify: `components/ExportButton.tsx`
- Modify: `components/ExportButton.module.scss`

- [ ] **Step 1: Replace `components/ExportButton.module.scss` entirely**

```scss
.wrapper {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.card {
  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 14px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, transform 0.12s, box-shadow 0.15s;
  position: relative;

  &.active {
    background: var(--primary);
    color: #fff;

    &:hover {
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(29, 78, 216, 0.4);
    }
  }

  &.disabled {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.2);
    border: 1px solid var(--app-border);
    cursor: not-allowed;
  }

  &.loading {
    background: rgba(29, 78, 216, 0.4);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;

    &::after {
      content: '';
      display: inline-block;
      width: 14px;
      height: 14px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-top-color: rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
      margin-left: 8px;
      vertical-align: middle;
    }
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hint {
  font-size: 0.8rem;
  color: var(--app-muted);
  text-align: center;
}

.error {
  font-size: 0.82rem;
  color: #f87171;
  text-align: center;
}
```

- [ ] **Step 2: Replace `components/ExportButton.tsx` entirely**

```tsx
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
```

- [ ] **Step 3: Verify build passes**

```bash
npm run build
```

Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add components/ExportButton.tsx components/ExportButton.module.scss
git commit -m "style: dark card + loading spinner + states for ExportButton"
```

---

## Task 9: Final Verification

- [ ] **Step 1: Run existing tests**

```bash
npm test
```

Expected: all tests pass. The checklist business logic is unchanged — these tests should be unaffected.

- [ ] **Step 2: Full build**

```bash
npm run build
```

Expected: exits 0, no TypeScript errors, no SCSS errors.

- [ ] **Step 3: Visual smoke test**

Start dev server:
```bash
npm run dev
```

Check in browser:
- `http://localhost:3000` — landing page unchanged
- `http://localhost:3000/start` — dark background, stepper (step 1 active), ProfileForm with pill cards
- Fill form and submit → `http://localhost:3000/dossier` — stepper (step 2 active, step 1 with ✓), dark checklist items
- Upload a file → item turns green with checkmark
- Export section shows missing count when incomplete, active button when complete

- [ ] **Step 4: Final commit (if any remaining changes)**

```bash
git status
# If clean, no commit needed. If any files modified:
git add -p
git commit -m "style: final cleanup"
```
