import styles from "./Jumps.module.css";

export default function Jumps ({ num }) {

    const links = [];
    for(var i = 0; i < num; i++) {
        let tableID = i+1;
        const idString = `#table${tableID}`;
        links.push(<a href={idString}>Table {tableID}</a>);
    }

    return (
        <div className={styles.container}>
            <span className={styles.tableLinks}>Select a table to jump to it: {links}</span>
        </div>
    )
}