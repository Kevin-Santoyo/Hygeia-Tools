import styles from './Header.module.css'

export default function Header ({ title }) {
  return (
    <div className={styles.header}>
      <div className={styles.heading}>
        <h1>{title}</h1>
      </div>
      <img src={'/images/logo.png'} />
    </div>
  )
}
