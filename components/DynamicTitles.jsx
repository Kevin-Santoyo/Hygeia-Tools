import styles from './DynamicTitles.module.css'
import { useRouter } from 'next/router'

export default function PageTitle({ params, analyte }) {
    const pageName = useRouter().route
    if (pageName == '/dri/by_commodity') {
        return (
            <div>
                <h2 className={styles.title}>Dietary Risk by {analyte}: PDP Samples of {params[0].selected}, {params[2].selected}, {params[1].selected}, {params[3].selected}</h2>
            </div>
        )
    } else if (pageName == '/dri/by_pesticide') {
        return (
            <div>
                <h2 className={styles.title}>Dietary Risk by {analyte}: All Foods Tested by PDP, {params[2].selected}, {params[1].selected}, {params[3].selected}</h2>
            </div>
        )
    } else return null
}

export function TableTitle({ params, type }) {
    console.log(params, 'params')
    if (type == "residue") {
        const pageName = useRouter().route
        if (pageName == '/dri/by_commodity') {
            return (
                <th className={styles.TableTitle} colSpan="9">Table 1: Pesticide Residue and Risk Indicators in {params[0].selected} Ranked by Percent of Aggregate FS-DRI: {params[2].selected}, {params[1].selected} Tested by PDP in {params[3].selected}</th>
            )
        } else if (pageName == '/dri/by_pesticide') {
            return (
                <th className={styles.TableTitle} colSpan="9">Table 1: {params[0].selected} Pesticide Residue and Risk Indicators in {params[1].selected} of {params[2].selected} Samples Tested by the PDP in {params[3].selected}: Ranked by Food Share of Aggregate FS-DRI</th>
            )
        } else {
            return (
                <th colSpan="9">No Title</th>
            )
        }
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
