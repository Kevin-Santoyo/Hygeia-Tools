import styles from "./Navbar.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";

let navlinksPDP = [
    {
        "title": "By Food",
        "link": "by_commodity",
        "url": "/dri/by_commodity"
    },
    {
        "title": "By Pesticide",
        "link": "by_pesticide",
        "url": "/dri/by_pesticide"
    },
    {
        "title": "Conventional vs. Organic",
        "link": "conventional-vs-organic",
        "url": "/dri/conventional-vs-organic"
    },
    {
        "title": "Domestic vs. Imported",
        "link": "domestic_vs_imported",
        "url": "/dri/domestic_vs_imported"
    },
    {
        "title": "Individual Samples",
        "link": "individual_samples",
        "url": "/dri/individual_samples"
    },
    {
        "title": "Aggregate Sample DRI",
        "link": "reports_aggr",
        "url": "/dri/reports_aggr"
    }
]

let navlinksFSA = [
    {
        "title": "By Food",
        "link": "by_food",
        "url": "/fsa/by_food"
    },
    {
        "title": "By Pesticide",
        "link": "by_pesticide",
        "url": "/fsa/by_pesticide"
    },
    {
        "title": "Conventional vs. Organic",
        "link": "conventional_vs_organic",
        "url": "/fsa/conventional_vs_organic"
    },
    {
        "title": "Domestic vs. Imported",
        "link": "domestic_vs_imported",
        "url": "/fsa/domestic_vs_imported"
    },
    {
        "title": "Individual Samples",
        "link": "individual_samples",
        "url": "/fsa/individual_samples"
    }
]

let navlinks = navlinksPDP
export default function Navbar({}) {
    let pageRoute = useRouter().route
    if (pageRoute.includes('fsa')) {
        navlinks = navlinksFSA
    } else {
        navlinks = navlinksPDP
    }

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
            {
                navlinks.map((item) =>
                    <li key={item.title}>
                        <Link href={item.link}>
                            <a className={pageRoute == item.url ? styles.active : styles.notActive}>{item.title}</a>
                        </Link>
                    </li>
                )
            }
        </ul>
        </div>
    )
}