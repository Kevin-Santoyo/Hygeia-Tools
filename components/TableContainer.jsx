import styles from './TableContainer.module.css'

export default function TableContainer ({ children }) {
  return (
    <div className={styles.container}>{children}</div>
  )
}
