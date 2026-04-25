import Link from 'next/link'
import Image from 'next/image'
import styles from './Navbar.module.scss'

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Image
          src="/logo-light.svg"
          alt="Locataire Pro"
          width={220}
          height={28}
          className={styles.logo}
          priority
        />
        <Link href="/start" className={styles.cta}>
          Commencer <span aria-hidden="true">→</span>
        </Link>
      </div>
    </nav>
  )
}
