import styles from './Header.module.css'

export default function Header ({ title }) {
  return (
    <div className={styles.header}>
      {/* <div className={'title'}>{title}</div> */}
      <img src={'/images/logo.png'} />
    </div>
  )
}
