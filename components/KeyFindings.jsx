import styles from './KeyFindings.module.css'
import _ from 'lodash';

export default function KeyFindings({ data }) {
    try {
        var localURL = window.location.pathname
        console.log(localURL)
        if (localURL == '/dri/by_pesticide') {
            return KeyPesticides(data = { data })
        } else if (localURL == '/dri/by_commodity') {
            return KeyCommodities(data = { data })
        } else {
            return (
                <div className={styles.container}>
                    <h4 className={styles.title}>No Key Findings</h4>
                </div>
            )
        }
    } catch (err) {
        console.log(err)
        return (
            <div className={styles.container}>
                <h4 className={styles.title}>No Key Findings</h4>
            </div>
        )
    }
}

function KeyCommodities({ data }) {
    var analyte, analytePercentage, topThree, meanAnalyte, meanPPM, meanPCT, reSort
    var lessThan1 = 0
    analyte = _.get(data[0], 'pesticide', 'loading')
    analytePercentage = parseFloat((_.get(data[0], 'per_agg_fsdri', 'loading') * 100).toFixed(2).concat('%'))
    topThree = parseFloat(((_.get(data[0], 'per_agg_fsdri', 0)) + (_.get(data[1], 'per_agg_fsdri', 0)) + (_.get(data[2], 'per_agg_fsdri', 0))) * 100).toFixed(2).concat('%')
    data.map((row) => {
        if (row.per_agg_fsdri < 0.01) {
            lessThan1++
        }
    })
    reSort = _.orderBy(data, 'mean_positives', 'desc');
    meanAnalyte = _.get(reSort[0], 'pesticide', 'loading');
    meanPPM = parseFloat(_.get(reSort[0], 'mean_positives', 'loading')).toFixed(3);
    meanPCT = parseFloat(_.get(reSort[0], 'percent_positive', 0) * 100).toFixed(1).concat('%');

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

function KeyPesticides({ data }) {
    console.log(data)
    var agg_dri_m_times = 0
    var num_threshhold = 0
    var totalDetections = 0
    var num_pos = 0
    var agg_dri = 0
    var total_foods = 0
    var total_perc_pos = 0
    var total_samples = 0
    var dri_mean_kid = 0
    var fs_dri_kid = 0
    var topThree = 0
    var i = 0
    var topThreeFSDRI = 0
    data.map((row) => {
        dri_mean_kid = row.dri_mean_kid + dri_mean_kid
        fs_dri_kid = row.fs_dri_kid + fs_dri_kid
        total_samples = row.total_samples + total_samples
        agg_dri = row.fs_dri_kid + agg_dri
        if (row.number_positives) {
            num_pos = row.number_positives + num_pos
            totalDetections++
        }
        if (row.total_foods > total_foods) {
            total_foods = row.total_foods
        }
        if (row.dri_mean_kid > 0.1) {
            num_threshhold++
        }
        if (i < 3) {
            topThreeFSDRI += row.fs_dri_kid
            i++
        }
    })
    topThree = ((topThreeFSDRI/agg_dri) * 100).toFixed(2).concat('%')
    agg_dri_m_times = (dri_mean_kid / fs_dri_kid).toFixed(0)
    total_perc_pos = ((num_pos/total_samples)*100).toFixed(1).concat('%')
    agg_dri = ((_.get(data[0], 'fs_dri_kid', 1) / agg_dri)*100).toFixed(2).concat('%')
    var pesticide = _.get(data[0], 'pesticide', 'loading')
    var commodity = _.get(data[0], 'commodity', 'loading')
    var pdp_year = _.get(data[0], 'pdp_year', 0)
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>Key Findings</h4>
            <ul>
                <li>{commodity} accounted for {agg_dri} of aggregate {pesticide} FS-DRI risks based on residues found in all foods tested by PDP in {pdp_year}.</li>
                <li>The top three foods accounted for {topThree} of {pesticide}'s aggregate FS-DRI risk accross all foods tested in {pdp_year}</li>
                <li>{pesticide} was found in {totalDetections} out of {total_foods} crops/foods tested for {pesticide} residues in {pdp_year}.</li>
                <li>Of the crops with one or more reported residue of {pesticide}, only {total_perc_pos} of samples contained a quantifiable residue of {pesticide}.</li>
                <li>The aggregate DRI-Mean across samples with reported residues was {agg_dri_m_times} times higher than aggregate FS-DRI.</li>
                <li>{num_threshhold} crops/foods had DRI-M {pesticide} values over 0.1, a threshold triggering dietary exposure and risk concern.</li>
            </ul>
        </div>
    )
}