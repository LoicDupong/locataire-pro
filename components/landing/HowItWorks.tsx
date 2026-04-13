import styles from './HowItWorks.module.scss'

const STEPS = [
  {
    number: '01',
    title: 'Ton profil',
    desc: "Pays, situation (salarié, étudiant, indépendant), présence d'un garant. 30 secondes.",
  },
  {
    number: '02',
    title: 'Tes documents',
    desc: 'Checklist générée automatiquement. Upload guidé, un doc à la fois. Multi-fichiers inclus.',
  },
  {
    number: '03',
    title: 'Ton PDF',
    desc: 'Documents assemblés en un seul fichier propre avec page de garde. Prêt à partager.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="comment">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Comment ça marche</p>
          <h2 className={styles.title}>Trois étapes, c&apos;est tout.</h2>
        </div>
        <div className={styles.steps}>
          {STEPS.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.stepTop}>
                <div className={styles.stepNumber}>{step.number}</div>
                {i < STEPS.length - 1 && <div className={styles.connector} />}
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
