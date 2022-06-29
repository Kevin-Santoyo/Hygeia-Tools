import styles from './Header.module.css'
import Navbar from './Navbar'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header ({ title, system }) {
  let pageRoute = useRouter().route
  let pdp = {
    "title": "Switch to US-PDP Data",
    "link": "../dri/by_commodity"
  }
  let fsa = {
    "title": "Switch to UK-FSA Data",
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
      <a href="../" className={styles.left}><img src={'/images/logo.png'} /></a>
      <div className={styles.heading}>
        <h1>{title}</h1>
        <h2>{system}</h2>
      </div>
      <div className={styles.right}>
        <p><Link href={switchData.link}><a>{switchData.title}</a></Link></p>
        <p><Link href=""><a>Methodology</a></Link></p>
      </div>
      
    </div>
    <Navbar />
    </>
  )
}
