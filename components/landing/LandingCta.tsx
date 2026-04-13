import Link from 'next/link'
import styles from './LandingCta.module.scss'

export default function LandingCta() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>En 5 minutes chrono</p>
        <h2 className={styles.title}>
          Prêt à constituer<br />
          ton dossier&nbsp;?
        </h2>
        <p className={styles.sub}>Gratuit. Sans compte. Sans blabla.</p>
        <Link href="/start" className={styles.cta}>
          Commencer maintenant →
        </Link>
      </div>
    </section>
  )
}
