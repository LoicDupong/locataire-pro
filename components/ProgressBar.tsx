import styles from './ProgressBar.module.scss'

type Props = {
  uploaded: number
  total: number
}

export default function ProgressBar({ uploaded, total }: Props) {
  const pct = total === 0 ? 0 : Math.round((uploaded / total) * 100)

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        {uploaded}/{total} documents requis téléversés
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
