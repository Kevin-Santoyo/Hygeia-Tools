import styles from './DynamicTitles.module.css'

export default function PageTitle ({ data }) {
    return (
        <div>
            <h2 className={styles.title}>Dietary Risk by Commodity: PDP Samples of {data[0].selected}, {data[2].selected}, {data[1].selected}, {data[3].selected}</h2>
        </div>
    )
}

export function DRITitleTable1 ({ params }) {
    return (
            <h2 className={styles.tableTitle}>Table 1: Pesticide Residue and Risk Indicators in {params[0].selected} Ranked by Percent of Aggregate FS-DRI: {params[2].selected}, {params[1].selected} Tested by PDP in {params[3].selected}</h2>
    )
}

export function DRITitleTable2 ({ params }) {
    return (
            <h2 className={styles.tableTitle}>Table 2: Calculation of the Chronic Reference Concentration (cRfC) by Pesticide Active Ingredient for {params[1].selected} {params[0].selected}, {params[3].selected}</h2>
    )
}