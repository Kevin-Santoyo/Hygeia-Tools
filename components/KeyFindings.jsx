import styles from './KeyFindings.module.css'
import _ from 'lodash';

export default function KeyFindings ({ data }) {
    if (data) {
        var analyte, analytePercentage, topThree, meanAnalyte, meanPPM, meanPCT, reSort
        var lessThan1 = 0
        analyte = _.get(data[0], 'rpt_pest_name', 'loading')
        analytePercentage = parseFloat((_.get(data[0], 'per_agg_fsdri', 'loading') * 100).toFixed(2).concat('%'))
        topThree = parseFloat(((_.get(data[0], 'per_agg_fsdri', 0))+(_.get(data[1], 'per_agg_fsdri', 0))+(_.get(data[2], 'per_agg_fsdri', 0))) * 100).toFixed(2).concat('%')
        data.map((row) => {
            if (row.per_agg_fsdri < 0.01) {
                lessThan1++
            }
        })
        reSort = _.orderBy( data, 'mean_positives', 'desc');
        meanAnalyte = _.get(reSort[0], 'rpt_pest_name', 'loading');
        meanPPM = parseFloat(_.get(reSort[0], 'mean_positives', 'loading')).toFixed(3);
        meanPCT = parseFloat(_.get(reSort[0], 'pct_pos', 0)*100).toFixed(1).concat('%');

        return (
            <div className={styles.container}>
                <h4 className={styles.title}>Key Findings</h4>
                <ul>
                    <li>{analyte} accounts for {analytePercentage} of total FS-DRI risk across all pesticides detected.</li>
                    <li>The top three active ingredients accounts for {topThree} of total, aggregate FS-DRI risk.</li>
                    <li>Residues of {lessThan1} pesticides account for less than 1% of total, aggregate FS-DRI risk.</li>
                    <li>The highest mean residue level reported was {meanPPM} ppm of {meanAnalyte}. Residues of {meanAnalyte} were found in {meanPCT} of samples tested.</li>
                </ul>
            </div>
        )
    }
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>No Key Findings</h4>
        </div>
    )
}