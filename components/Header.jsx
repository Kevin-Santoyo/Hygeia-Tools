import styles from './Header.module.css'
import Navbar from './Navbar'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header ({ title, system }) {
  let pageRoute = useRouter().route
  let pdp = {
    "title": "Switch to PDP Data",
    "link": "../dri/by_commodity"
  }
  let fsa = {
    "title": "Switch to FSA Data",
    "link": "../fsa/by_food"
  }
  let switchData
  if (pageRoute.includes('fsa')) {
      switchData = pdp
  } else {
      switchData = fsa
  }

  return (
    <><div className={styles.header}>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <h2>{system}</h2>
        <p><Link href={switchData.link}><a>{switchData.title}</a></Link></p>
      </div>
      <a href="../"><img src={'/images/logo.png'} /></a>
    </div>
    <Navbar />
    </>
  )
}
