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

    const formData = new FormData()
    formData.append('sessionId', sessionId)
    formData.append('docKey', item.key)
    formData.append('file', file)

    const res = await fetch('/api/upload', { method: 'POST', body: formData })
    if (!res.ok) {
      alert('Erreur lors du téléversement. Réessayez.')
      return
    }

    markUploaded(item.key, file, file.name)
    // Reset input so same file can be re-uploaded
    if (inputRef.current) inputRef.current.value = ''
  }

  const statusLabel = {
    pending: 'En attente',
    uploaded: 'Téléversé',
    optional: 'Optionnel',
  }[item.status]

  return (
    <div className={`${styles.item} ${styles[item.status]}`}>
      <div className={styles.info}>
        <span className={styles.label}>{item.label}</span>
        {item.fileName && (
          <span className={styles.fileName}>{item.fileName}</span>
        )}
      </div>
      <div className={styles.actions}>
        <span className={`${styles.badge} ${styles[`badge_${item.status}`]}`}>
          {statusLabel}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button
          className={styles.uploadBtn}
          onClick={() => inputRef.current?.click()}
        >
          {item.status === 'uploaded' ? 'Remplacer' : 'Téléverser'}
        </button>
      </div>
    </div>
  )
}
