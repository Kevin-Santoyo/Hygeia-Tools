import styles from './Header.module.css'
import Navbar from './Navbar'

export default function Header ({ title, system }) {
  return (
    <><div className={styles.header}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <h2>{system}</h2>
      </div>
      <a href="../"><img src={'/images/logo.png'} /></a>
    </div>
    <Navbar />
    </>
  )
}
