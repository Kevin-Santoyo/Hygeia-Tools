import styles from "./Navbar.module.css";
import Link from 'next/link'

let navlinks = [
    {
        "title": "By Food",
        "link": "by_commodity"
    },
    {
        "title": "By Pesticide",
        "link": "by_pesticide"
    },
    {
        "title": "Conventional VS Organic",
        "link": "conventional-vs-organic"
    },
    {
        "title": "Domestic VS Imported",
        "link": "domestic_vs_imported"
    },
    {
        "title": "Individual Samples",
        "link": "individual_samples"
    },
    {
        "title": "Aggregate Sample DRI",
        "link": "reports_aggr"
    }
]

export default function Navbar({}) {
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
            {
                navlinks.map((item) =>
                    <li key={item.title}><Link href={item.link}><a>{item.title}</a></Link></li>
                )
            }
        </ul>
        </div>
    )
}