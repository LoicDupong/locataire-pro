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

  const maxFiles = item.maxFiles ?? 1
  const uploadCount = item.fileNames?.length ?? 0
  const isMulti = maxFiles > 1
  const atMax = uploadCount >= maxFiles

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
    if (isMulti) return 'Ajouter'
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
