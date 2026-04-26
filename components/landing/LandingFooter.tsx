import Image from 'next/image'
import styles from './LandingFooter.module.scss'

export default function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Image
          src="./logo-dark.svg"
          alt="Locataire Pro"
          width={180}
          height={22}
          className={styles.logo}
        />
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
