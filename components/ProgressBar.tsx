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
