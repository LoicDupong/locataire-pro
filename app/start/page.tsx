import ProfileForm from '@/components/ProfileForm'
import styles from './page.module.scss'

export default function StartPage() {
  return (
    <main className={styles.main}>
      <div className={styles.stepper}>
        <div className={`${styles.step} ${styles.stepActive}`}>
          <div className={styles.stepCircle}>1</div>
          <span className={styles.stepLabel}>Profil</span>
        </div>
        <div className={styles.stepLine} />
        <div className={styles.step}>
          <div className={styles.stepCircle}>2</div>
          <span className={styles.stepLabel}>Dossier</span>
        </div>
      </div>
      <div className={styles.content}>
        <ProfileForm />
      </div>
    </main>
  )
}
