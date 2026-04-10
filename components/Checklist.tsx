import type { ChecklistItem as TChecklistItem } from '@/types/dossier'
import ChecklistItem from './ChecklistItem'
import styles from './Checklist.module.scss'

type Props = {
  items: TChecklistItem[]
  sessionId: string
}

export default function Checklist({ items, sessionId }: Props) {
  const applicantItems = items.filter((i) => !i.forGuarantor)
  const guarantorItems = items.filter((i) => i.forGuarantor)

  return (
    <div className={styles.wrapper}>
      <section>
        <h2 className={styles.groupTitle}>Vos documents</h2>
        <ul className={styles.list}>
          {applicantItems.map((item) => (
            <li key={item.key}>
              <ChecklistItem item={item} sessionId={sessionId} />
            </li>
          ))}
        </ul>
      </section>

      {guarantorItems.length > 0 && (
        <section>
          <h2 className={styles.groupTitle}>Documents du garant</h2>
          <ul className={styles.list}>
            {guarantorItems.map((item) => (
              <li key={item.key}>
                <ChecklistItem item={item} sessionId={sessionId} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
