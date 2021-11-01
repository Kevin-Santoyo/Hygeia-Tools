import styles from './DynamicTitles.module.css'

export default function PageTitle ({ commodity, origin, claim, year}) {
    return (
        <div>
            <h2 className={styles.title}>Dietary Risk by Commodity: PDP Samples of {commodity}, {claim}, {origin}, {year}</h2>
        </div>
    )
}

export function DRITitleTable1 ({ commodity, origin, claim, year }) {
    return (
        <div>
            <h5 className={styles.tableTitle}>Table 1: Pesticide Residue and Risk Indicators in {commodity} Ranked by Percent of Aggregate FS-DRI: {claim}, {origin} Tested by PDP in {year}</h5>
        </div>
    )
}

export function DRITitleTable2 ({ commodity, origin, year }) {
    return (
        <div>
            <h5 className={styles.tableTitle}>Table 2: Calculation of the Chronic Reference Concentration (cRfC) by Pesticide Active Ingredient for {origin} {commodity}, {year}</h5>
        </div>
    )
}