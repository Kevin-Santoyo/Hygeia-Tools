import styles from "./KeyFindings.module.css";
import _, { countBy } from "lodash";
import { useRouter } from "next/router";
import NumberFormat from "react-number-format";

export default function KeyFindings({ data, tableNum, food }) {
  const localURL = useRouter().route;
  try {
    if (localURL == "/dri/by_pesticide") {
      return KeyPesticides((data = { data }));
    } else if (localURL == "/dri/by_commodity") {
      return KeyCommodities((data = { data }));
    } else if (localURL == "/dri/conventional-vs-organic") {
      switch (tableNum) {
        case 1:
          return KeyConventional1((data = { data }));
        case 2:
          let obj = { data: data, food: food };
          return KeyConventional2((obj = { obj }));
        case 3:
          return KeyConventional3((data = { data }));
        case 4:
          return KeyConventional4((data = { data }));
        default:
          return (
            <div className={styles.container}>
              <h4 className={styles.title}>No findings available</h4>
            </div>
          );
      }
    } else {
      return (
        <div className={styles.container}>
          <h4 className={styles.title}>No Key Findings</h4>
        </div>
      );
    }
  } catch (err) {
    console.log(err);
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>No Key Findings</h4>
      </div>
    );
  }
}

function KeyCommodities({ data }) {
  var analyte, analytePercentage, topThree, meanAnalyte, meanPPM, meanPCT, reSort;
  var lessThan1 = 0;
  analyte = _.get(data[0], "pesticide", "loading");
  analytePercentage = parseFloat((_.get(data[0], "per_agg_fsdri", "loading") * 100).toFixed(2).concat("%"));
  topThree = parseFloat((_.get(data[0], "per_agg_fsdri", 0) + _.get(data[1], "per_agg_fsdri", 0) + _.get(data[2], "per_agg_fsdri", 0)) * 100)
    .toFixed(2)
    .concat("%");
  data.map((row) => {
    if (row.per_agg_fsdri < 0.01) {
      lessThan1++;
    }
  });
  reSort = _.orderBy(data, "mean_positives", "desc");
  meanAnalyte = _.get(reSort[0], "pesticide", "loading");
  meanPPM = parseFloat(_.get(reSort[0], "mean_positives", "loading")).toFixed(3);
  meanPCT = parseFloat(_.get(reSort[0], "percent_positive", 0) * 100)
    .toFixed(1)
    .concat("%");

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Key Findings</h4>
      <ul>
        <li>
          {analyte} accounts for {analytePercentage} of total FS-DRI risk across all pesticides detected.
        </li>
        <li>The top three active ingredients accounts for {topThree} of total, aggregate FS-DRI risk.</li>
        <li>Residues of {lessThan1} pesticides account for less than 1% of total, aggregate FS-DRI risk.</li>
        <li>
          The highest mean residue level reported was {meanPPM} ppm of {meanAnalyte}. Residues of {meanAnalyte} were found in {meanPCT} of samples tested.
        </li>
      </ul>
    </div>
  );
}

function KeyPesticides({ data }) {
  var agg_dri_m_times = 0;
  var num_threshhold = 0;
  var totalDetections = 0;
  var num_pos = 0;
  var agg_dri = 0;
  var total_foods = 0;
  var total_perc_pos = 0;
  var total_samples = 0;
  var dri_mean_kid = 0;
  var fs_dri_kid = 0;
  var topThree = 0;
  var i = 0;
  var topThreeFSDRI = 0;
  data.map((row) => {
    dri_mean_kid = row.dri_mean_kid + dri_mean_kid;
    fs_dri_kid = row.fs_dri_kid + fs_dri_kid;
    total_samples = row.total_samples + total_samples;
    agg_dri = row.fs_dri_kid + agg_dri;
    if (row.number_positives) {
      num_pos = row.number_positives + num_pos;
      totalDetections++;
    }
    if (row.total_foods > total_foods) {
      total_foods = row.total_foods;
    }
    if (row.dri_mean_kid > 0.1) {
      num_threshhold++;
    }
    if (i < 3) {
      topThreeFSDRI += row.fs_dri_kid;
      i++;
    }
  });
  topThree = ((topThreeFSDRI / agg_dri) * 100).toFixed(2).concat("%");
  agg_dri_m_times = (dri_mean_kid / fs_dri_kid).toFixed(0);
  total_perc_pos = ((num_pos / total_samples) * 100).toFixed(1).concat("%");
  agg_dri = ((_.get(data[0], "fs_dri_kid", 1) / agg_dri) * 100).toFixed(2).concat("%");
  var pesticide = _.get(data[0], "pesticide", "loading");
  var commodity = _.get(data[0], "commodity", "loading");
  var pdp_year = _.get(data[0], "pdp_year", 0);
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Key Findings</h4>
      <ul>
        <li>
          {commodity} accounted for {agg_dri} of aggregate {pesticide} FS-DRI risks based on residues found in all foods tested by PDP in {pdp_year}.
        </li>
        <li>
          The top three foods accounted for {topThree} of {pesticide}'s aggregate FS-DRI risk accross all foods tested in {pdp_year}
        </li>
        <li>
          {pesticide} was found in {totalDetections} out of {total_foods} crops/foods tested for {pesticide} residues in {pdp_year}.
        </li>
        <li>
          Of the crops with one or more reported residue of {pesticide}, only {total_perc_pos} of samples contained a quantifiable residue of {pesticide}.
        </li>
        <li>The aggregate DRI-Mean across samples with reported residues was {agg_dri_m_times} times higher than aggregate FS-DRI.</li>
        <li>
          {num_threshhold} crops/foods had DRI-M {pesticide} values over 0.1, a threshold triggering dietary exposure and risk concern.
        </li>
      </ul>
    </div>
  );
}

function KeyConventional1({ data }) {
  if (data.length > 1) {
    let food = data[0].commodity;
    let organic_percentage = <NumberFormat value={data[1].per_zero_residues * 100} displayType="text" decimalScale={1} suffix="%" />
    let conventional_percentage = <NumberFormat value={data[0].per_zero_residues * 100} displayType="text" decimalScale={1} suffix="%" />
    let avg_sample_residue = <NumberFormat value={data[0].avg_number_residues / data[1].avg_number_residues} displayType="text" decimalScale={1} />
    let conventional_risk = <NumberFormat value={data[0].sum_dri_mean / data[1].sum_dri_mean} displayType="text" decimalScale={1} />
    let organic_risk = <NumberFormat value={data[0].sum_dri_fs / data[1].sum_dri_fs} displayType="text" decimalScale={1} />
    let avg_organic_residue = <NumberFormat value={data[1].avg_number_residues} displayType="text" decimalScale={2} fixedDecimalScale="true" />
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>Key Findings</h4>
        <ul>
          <li>
            No pesticide residues were detected in {organic_percentage} of organic samples and {conventional_percentage} of conventional samples.
          </li>
          <li>
            The average conventional sample of {food} contained {avg_sample_residue} times as many more residues than the average organic {food} sample.
          </li>
          <li>
            Among samples of {food} with residues, conventionally grown {food} posed dietary risks {conventional_risk} times higher than the residues in organic {food}.
          </li>
          <li>
            Residues found in conventional samples of {food} pose FS-DRI risks {organic_risk} times as high as residues found in organic samples of {food}.
          </li>
          <li>
            The average organic sample contained {avg_organic_residue} residues.
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>No findings available</h4>
      </div>
    );
  }
}

function KeyConventional2({ obj }) {
  if (obj.data.length > 0) {
    let pesticideCount = obj.data.length;
    return (
      <>
        <div className={styles.container}>
          <h4 className={styles.title}>Key Findings</h4>
          <ul>
            <li>{pesticideCount} pesticide active ingredients, metabolites, and isomers were found in organic samples.</li>
          </ul>
        </div>
        <div className={styles.container}>
          <p>(See Table 4 below for the pesticides found in conventionally grown {obj.food})</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.container}>
          <h4 className={styles.title}>No findings available</h4>
        </div>
        <div className={styles.container}>
          <p>(See Table 4 below for the pesticides found in conventionally grown {obj.food})</p>
        </div>
      </>
    );
  }
}

function KeyConventional3({ data }) {
  if (data.length > 0) {
    let totalPositives = 0;
    let phTotalPositives = 0;
    let resOverAction = 0;
    let totalInadvertent = 0;
    let totalOverDRI = 0;
    let totalLegal = 0;
    let totalPesticides = data.length;
    data.map((dat) => {
      if (dat.ph_fungicide) {
        phTotalPositives += dat.number_positives;
      }
      if (dat.dri_mean_kid > 0.1) {
        totalOverDRI += 1;
      }
      totalLegal += dat.organic_legal;
      resOverAction += dat.number_residues_exceed_at;
      totalPositives += dat.number_positives;
      totalInadvertent += dat.number_inadvertent_residues;
    });
    let totalPercentage = <NumberFormat value={(phTotalPositives / totalPositives) * 100} displayType="text" decimalScale={1} suffix="%" />
    let threshPercentage = <NumberFormat value={(resOverAction / totalPositives) * 100} displayType="text" decimalScale={1} suffix="%" />;
    let driPercentage = <NumberFormat value={(totalOverDRI / totalPositives) * 100} displayType="text" decimalScale={1} suffix="%" />;
    let legalPercentage = <NumberFormat value={(totalLegal / totalPesticides) * 100} displayType="text" decimalScale={1} suffix="%" />;
    let food = data[0].commodity;
    if (totalOverDRI == 1) {
      totalOverDRI = String(totalOverDRI).concat(" residue");
    } else {
      totalOverDRI = String(totalOverDRI).concat(" residues");
    }
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>Key Findings</h4>
        <ul>
          <li>
            Post-harvest fungicides account for {phTotalPositives} out of {totalPositives} residues found in organic samples ({totalPercentage}).
          </li>
          <li>
            {resOverAction} residues ({threshPercentage}) in organic {food} exceeded the Action Threshold of 5% of the applicable tolerance.
          </li>
          <li>
            {totalInadvertent} out of {totalPositives} residues found in organic {food} were inadvertent, and likely reflect unavoidable residual environmental contaminatant (UREC) rather than illegal application.
          </li>
          <li>
            {totalOverDRI} ({driPercentage}) pose a risks risk concerns concern (DRI-M&gt;0.1).
          </li>
          <li>
            {totalLegal} out of the {totalPesticides} pesticides detected in organic {food} ({legalPercentage}) were synthetic chemicals not approved for use on organic {food}.
          </li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>No findings available</h4>
      </div>
    );
  }
}

function KeyConventional4({ data }) {
  if (data.length > 0) {
    console.log(data, "keydata");
    let length = data.length;
    let totalPesticides = length;
    let totalSamples = 0;
    let totalPositives = 0;
    data.map((obj) => {
      totalSamples += obj.total_samples;
      totalPositives += obj.number_positives;
    });
    let averageResidue = <NumberFormat value={totalPositives / (totalSamples / length)} displayType="text" decimalScale={2} />;
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>Key Findings</h4>
        <ul>
          <li>{totalPesticides} pesticide active ingredients, metabolites, and isomers were found in conventional samples.</li>
          <li>The average conventional sample contained {averageResidue} residues.</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <h4 className={styles.title}>No findings available</h4>
      </div>
    );
  }
}
