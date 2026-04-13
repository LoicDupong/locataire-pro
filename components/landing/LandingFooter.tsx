import styles from './LandingFooter.module.scss'

export default function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          Locataire<strong>Pro</strong>
        </span>
        <p className={styles.copy}>© {year} — Fait pour les locataires 🇧🇪 et 🇫🇷</p>
        <div className={styles.pills}>
          <span>Gratuit</span>
          <span>Sans compte</span>
          <span>Zéro stockage</span>
        </div>
      </div>
    </footer>
  )
}
