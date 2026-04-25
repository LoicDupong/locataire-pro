'use client'
import { useInView } from '@/hooks/useInView'
import styles from './FeaturesGrid.module.scss'

const FEATURES = [
  {
    icon: '🎯',
    title: 'Checklist dynamique',
    desc: "Adaptée à votre pays (BE/FR), situation et présence d'un garant. Rien de superflu, rien qui manque.",
  },
  {
    icon: '📎',
    title: 'Multi-documents',
    desc: "Certains items acceptent plusieurs fichiers (ex : 3 fiches de paie). Upload guidé, sans prise de tête.",
  },
  {
    icon: '🧾',
    title: 'PDF professionnel',
    desc: 'Page de garde avec vos coordonnées. Tous vos documents assemblés proprement en un seul fichier.',
  },
  {
    icon: '🔒',
    title: 'Zéro stockage',
    desc: "Aucun fichier conservé. Supprimé dès l'export. Pas de compte, pas de tracking, pas de BS.",
  },
]

export default function FeaturesGrid() {
  const { ref, inView } = useInView()
  return (
    <section className={`${styles.section}${inView ? ' ' + styles.visible : ''}`}>
      <div ref={ref} className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Fonctionnalités</p>
          <h2 className={styles.title}>Tout ce qu&apos;il vous faut.</h2>
        </div>
        <div className={styles.grid}>
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon}>{f.icon}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
