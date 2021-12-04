import styles from './DynamicTitles.module.css'

export default function PageTitle ({ params, analyte }) {
    return (
        <div>
            <h2 className={styles.title}>Dietary Risk by {analyte}: PDP Samples of {params[0].selected}, {params[2].selected}, {params[1].selected}, {params[3].selected}</h2>
        </div>
    )
}

export function TableTitle ({ params, type }) {
    if (type == "residue") {
        return (
            <th className={styles.TableTitle} colSpan="9">Table 1: Pesticide Residue and Risk Indicators in {params[0].selected} Ranked by Percent of Aggregate FS-DRI: {params[2].selected}, {params[1].selected} Tested by PDP in {params[3].selected}</th>
        )
    } else if (type == "crfc") {
        return (
            <th className={styles.TableTitle} colSpan="9">Table 2: Calculation of the Chronic Reference Concentration (cRfC) by Pesticide Active Ingredient for {params[1].selected} {params[0].selected}, {params[3].selected}</th>
        )
    } else {
        return (
            <th colSpan="9">No Title</th>
        )
    }
}