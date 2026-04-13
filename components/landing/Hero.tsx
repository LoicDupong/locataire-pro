import Link from 'next/link'
import styles from './Hero.module.scss'

const MOCK_ITEMS = [
  { label: "Carte d'identité", done: true },
  { label: 'Fiches de paie (3)', done: true },
  { label: 'Justificatif domicile', done: true },
  { label: 'Contrat de travail', done: false },
]

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.inner}>

        <div className={styles.content}>
          <span className={styles.badge}>🇧🇪 Belgique &amp; 🇫🇷 France</span>
          <h1 className={styles.headline}>
            Votre dossier<br />
            de location<br />
            <em>en 5 minutes.</em>
          </h1>
          <p className={styles.sub}>
            Checklist personnalisée selon votre profil.<br />
            Tout rassemblé en un PDF propre, prêt à envoyer.
          </p>
          <div className={styles.actions}>
            <Link href="/start" className={styles.primaryCta}>
              Créer mon dossier
            </Link>
            <a href="#comment" className={styles.secondaryCta}>
              Comment ça marche ↓
            </a>
          </div>
        </div>

        <div className={styles.mockWrap}>
          <div className={styles.mockCard}>
            <div className={styles.mockHeader}>
              <div className={styles.mockAvatar}>SM</div>
              <div className={styles.mockMeta}>
                <div className={styles.mockName}>Sophie M.</div>
                <div className={styles.mockRole}>Salariée · Belgique</div>
              </div>
              <div className={styles.mockStatus}>En cours</div>
            </div>
            <div className={styles.mockDivider} />
            <div className={styles.mockItems}>
              {MOCK_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`${styles.mockItem} ${item.done ? styles.done : ''}`}
                  style={{ animationDelay: `${0.5 + i * 0.18}s` }}
                >
                  <span className={styles.mockCheck}>{item.done ? '✓' : '○'}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
            <div className={styles.mockFooter}>
              <div className={styles.mockBarTrack}>
                <div className={styles.mockBarFill} />
              </div>
              <span className={styles.mockBarLabel}>3 / 4 documents</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
