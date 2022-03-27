import styles from "./Navbar.module.css";
import Link from 'next/link';
import { useRouter } from "next/router";

let navlinksPDP = [
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

let navlinksFSA = [
    {
        "title": "By Food",
        "link": "by_food"
    }
]

let navlinks = navlinksPDP
let switchDataPDP = {
    "title": "Switch to FSA Dataset",
    "link": "../fsa/by_food"
}
let switchDataFSA = {
    "title": "Switch to PDP Dataset",
    "link": "../dri/by_commodity"
}
let switchData = switchDataPDP
export default function Navbar({}) {
    console.log(useRouter())
    let pageRoute = useRouter().route
    if (pageRoute.includes('fsa')) {
        navlinks = navlinksFSA
        switchData = switchDataFSA
    } else {
        navlinks = navlinksPDP
        switchData = switchDataPDP
    }
    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                <li key={switchData.title}><Link href={switchData.link}><a>{switchData.title}</a></Link></li>
            {
                navlinks.map((item) =>
                    <li key={item.title}><Link href={item.link}><a>{item.title}</a></Link></li>
                )
            }
        </ul>
        </div>
    )
}