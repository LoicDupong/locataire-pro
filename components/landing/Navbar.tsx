import Link from 'next/link'
import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <span className={styles.logo}>
          Locataire<strong>Pro</strong>
        </span>
        <Link href="/start" className={styles.cta}>
          Commencer <span aria-hidden="true">→</span>
        </Link>
      </div>
    </nav>
  )
}
