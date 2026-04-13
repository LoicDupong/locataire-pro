import styles from './ProblemBanner.module.scss'

const PROBLEMS = [
  {
    icon: '📋',
    title: 'Checklist à faire soi-même',
    desc: 'Sans savoir exactement quoi inclure selon votre situation ou votre pays.',
  },
  {
    icon: '😰',
    title: 'Un doc oublié = dossier refusé',
    desc: "Les propriétaires rejettent vite. Une pièce manquante et c'est reparti à zéro.",
  },
  {
    icon: '🗂️',
    title: 'PDF bricolés, mauvaise présentation',
    desc: 'Un dossier mal assemblé ça se voit. Et ça joue contre vous dès le premier regard.',
  },
]

export default function ProblemBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Le problème</p>
        <h2 className={styles.title}>Monter un dossier, c&apos;est chiant.</h2>
        <div className={styles.grid}>
          {PROBLEMS.map((p, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.icon}>{p.icon}</span>
              <h3 className={styles.itemTitle}>{p.title}</h3>
              <p className={styles.itemDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
