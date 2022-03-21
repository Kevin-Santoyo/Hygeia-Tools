import styles from "./Jumps.module.css";
import { useRouter } from "next/router";

export default function Jumps ({ num }) {
    const pageName = useRouter().route;
    const links = []
    if (pageName == "/dri/individual_samples") {
        links.push(<a class="button" href="#table1">Table 1 Summary Statistics : Aggregate DRI and Number of Residues</a>)
        links.push(<a class="button" href="#table2">Table 2 All Analytes: Number of Residues and DRI </a>)
        links.push(<a class="button" href="#table3">Table 3 All Analytes: Number of Residues and DRI (Ranked by DRI)</a>)
    } else {
        for(var i = 0; i < num; i++) {
            let tableID = i+1;
            const idString = `#table${tableID}`;
            links.push(<a class="button" href={idString}>Table {tableID}</a>);
        }
    }

    return (
        <div className={styles.container}>
            <span class={styles.tableLinks}>Select a table to view: {links}</span>
        </div>
    )
}