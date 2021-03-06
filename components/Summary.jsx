import NumberFormat from "react-number-format";
import _ from "lodash";
import styles from "./Table.module.css";
import { useRouter } from "next/router";

export default function Summary({ data, tableNum }) {
  var localURL = useRouter().route;
  if (localURL == "/dri/by_pesticide" || localURL == "/fsa/by_pesticide") {
    switch (tableNum) {
      case 1:
        return summaryPesticide((data = { data }));
      default:
        return null;
    }
  } else if (localURL == "/dri/by_commodity" || localURL == "/fsa/by_food") {
    switch (tableNum) {
      case 1:
        return summaryCommodity((data = { data }));
      default:
        return null;
    }
  } else if (localURL == "/dri/conventional-vs-organic") {
    switch (tableNum) {
      case 1:
        return summaryConventional1((data = { data }));
      case 2:
        return summaryConventional2((data = { data }));
      case 3:
        return summaryConventional3((data = { data }));
      case 4:
        return summaryConventional4((data = { data }));
      default:
        return null;
    }
  } else if (localURL == "/dri/domestic_vs_imported") {
    switch (tableNum) {
      case 1:
        return summaryDomestic1((data = { data }));
      case 2:
        return summaryDomestic2((data = { data }));
      case 3:
        return summaryDomestic2((data = { data }));
      default:
        return null;
    }
  } else if (localURL == "/dri/reports_aggr") {
    switch (tableNum) {
      case 1:
        return summaryReport5(( data = { data }));
      case 2:
        return summaryReport6(( data = { data }));
      default:
        return null;
    }
  } else {
    return null;
  }
}

function summaryPesticide({ data }) {
  var localURL = useRouter().route
  var averageSamples = 0;
  var total_samples = 0;
  var total_num_pos = 0;
  var total_drim = 0;
  var total_fsdri = 0;
  var total_percent = 0;
  var averageResidues = 0;
  var agg_dri = 0;
  var dri_kid = 0;
  var totalDetections = 0;
  data.forEach(function (row) {
    total_samples = row.Total_Samples + total_samples;
    total_num_pos = total_num_pos + row.Number_Positives;
    total_drim = total_drim + row.DRI_Mean_Kid;
    total_fsdri = total_fsdri + row.FS_DRI_Kid;
    total_percent = total_percent + row.per_agg_fsdri * 100;
    totalDetections++;
    agg_dri = row.FS_DRI_Kid + agg_dri;
    dri_kid = row.FS_DRI_Kid + dri_kid;
  });
  averageSamples = total_samples / totalDetections;
  averageResidues = (total_num_pos / total_samples).toFixed(2);
  total_percent = (dri_kid / agg_dri) * 100;
  averageSamples = averageSamples.toFixed(0);
  total_drim = total_drim.toFixed(5);
  return (
    <>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Total Number of Samples</div>
        {localURL == "/fsa/by_pesticide" && <div className={styles.summaryCell}></div>}
        <div className={styles.summaryCell}>{<NumberFormat value={total_samples} displayType="text" thousandSeparator="," />}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
      </div>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Total Positives and Aggregate DRI</div>
        {localURL == "/fsa/by_pesticide" && <div className={styles.summaryCell}></div>}
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}>{total_num_pos}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}>{total_drim}</div>
        <div className={styles.summaryCell}>{total_fsdri.toFixed(5)}</div>
        <div className={styles.summaryCell}>{total_percent.toFixed(2).concat("%")}</div>
      </div>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Average Residues Detected per Sample</div>
        {localURL == "/fsa/by_pesticide" && <div className={styles.summaryCell}></div>}
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}>{averageResidues}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
      </div>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Number of Foods with Residues</div>
        {localURL == "/fsa/by_pesticide" && <div className={styles.summaryCell}></div>}
        <div className={styles.summaryCell}>{totalDetections}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
      </div>
    </>
  );
}

function summaryCommodity({ data }) {
  var averageSamples = 0;
  var total_num_pos = 0;
  var total_drim = 0;
  var total_fsdri = 0;
  var total_percent = 0;
  var averageResidues = 0;
  var agg_dri = 0;
  var dri_kid = 0;
  var totalDetections = 0;
  data.forEach(function (row) {
    averageSamples = row.Total_Samples + averageSamples;
    total_num_pos += row.Number_Positives;
    total_drim += row.DRI_Mean_Kid;
    total_fsdri += row.FS_DRI_Kid;
    total_percent += row.FS_DRI_Kid;
    totalDetections++;
    agg_dri = row.FS_DRI_Kid + agg_dri;
    dri_kid = row.FS_DRI_Kid + dri_kid;
  });
  averageSamples = averageSamples / totalDetections;
  averageResidues = (total_num_pos / averageSamples).toFixed(2);
  total_percent = (total_percent / total_percent) * 100;
  averageSamples = averageSamples.toFixed(0);
  total_drim = total_drim.toFixed(5);
  return (
    <>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Average Number of Samples</div>
        <div className={styles.summaryCell}>{averageSamples}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
      </div>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Total Positives and Aggregate DRI</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}>{total_num_pos}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}>{total_drim}</div>
        <div className={styles.summaryCell}>{total_fsdri.toFixed(5)}</div>
        <div className={styles.summaryCell}>{total_percent.toFixed(2).concat("%")}</div>
      </div>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Average Residues Detected per Sample</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}>{averageResidues}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
      </div>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Number of Analytes Detected</div>
        <div className={styles.summaryCell}>{totalDetections}</div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
        <div className={styles.summaryCell}></div>
      </div>
    </>
  );
}

function summaryConventional1({ data }) {
  if (data.length != 1) {
    let totalRatio = data[0].avg_total_samples / data[1].avg_total_samples;
    let residueRatio = data[0].avg_number_residues / data[1].avg_number_residues;
    let driRatio = data[0].sum_dri_mean / data[1].sum_dri_mean;
    let fsRatio = data[0].sum_dri_fs / data[1].sum_dri_fs;
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell}>Ratio of Conventional to Organic</div>
          <div className={styles.summaryCell}>
            <NumberFormat value={totalRatio} displayType="text" decimalScale={1} />
          </div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>
            <NumberFormat value={residueRatio} displayType="text" decimalScale={2} />
          </div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>
            <NumberFormat value={driRatio} displayType="text" decimalScale={2} />
          </div>
          <div className={styles.summaryCell}>
            <NumberFormat value={fsRatio} displayType="text" decimalScale={2} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell}>Ratio of Conventional to Organic</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
        </div>
      </>
    );
  }
}

function summaryConventional2({ data }) {
  var num_pos = 0;
  var dri_total = 0;
  var fsdri_total = 0;
  data.map((dat) => {
    num_pos += dat.Number_Positives;
    dri_total += dat.DRI_Mean_Kid;
    fsdri_total += dat.FS_DRI_Kid;
  });

  return (
    <>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Totals:</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>
          <NumberFormat value={num_pos} displayType="text" />
        </div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>
          <NumberFormat value={dri_total} displayType="text" decimalScale={5} fixedDecimalScale="true" />
        </div>
        <div className={styles.summaryCell}>
          <NumberFormat value={fsdri_total} displayType="text" decimalScale={5} fixedDecimalScale="true" />
        </div>
      </div>
    </>
  );
}

function summaryConventional3({ data }) {
  var num_pos = 0;
  var dri_total = 0;
  var res_over_thresh = 0;
  var num_inadvert_res = 0;
  data.map((dat) => {
    num_pos += dat.Number_Positives;
    dri_total += dat.DRI_Mean_Kid;
    res_over_thresh += dat.number_residues_exceed_at;
    num_inadvert_res += dat.number_inadvertent_residues;
  });
  return (
    <>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Totals:</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>
          <NumberFormat value={num_pos} displayType="text" />
        </div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>
          <NumberFormat value={res_over_thresh} displayType="text" />
        </div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>
          <NumberFormat value={num_inadvert_res} displayType="text" />
        </div>
        <div className={styles.summaryCell}>
          <NumberFormat value={dri_total} displayType="text" decimalScale={5} fixedDecimalScale="true" />
        </div>
      </div>
    </>
  );
}

function summaryConventional4({ data }) {
  var dri_total = 0;
  var fsdri_total = 0;
  data.map((dat) => {
    dri_total += dat.DRI_Mean_Kid;
    fsdri_total += dat.FS_DRI_Kid;
  });
  return (
    <>
      <div className={styles.totalRow}>
        <div className={styles.summaryCell}>Totals:</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>--</div>
        <div className={styles.summaryCell}>
          <NumberFormat value={dri_total} displayType="text" decimalScale={5} fixedDecimalScale="true" />
        </div>
        <div className={styles.summaryCell}>
          <NumberFormat value={fsdri_total} displayType="text" decimalScale={5} fixedDecimalScale="true" />
        </div>
      </div>
    </>
  );
}

function summaryDomestic1({ data }) {
  if (_.has(data, 1)) {
    let ratioTotal = <NumberFormat value={data[0].avg_total_samples / data[1].avg_total_samples} displayType="text" decimalScale={2} />;
    let ratioAvgRes = <NumberFormat value={data[0].avg_number_residues / data[1].avg_number_residues} displayType="text" decimalScale={2} />;
    let ratioDRI = <NumberFormat value={data[0].sum_dri_mean / data[1].sum_dri_mean} displayType="text" decimalScale={4} />;
    let ratioFS = <NumberFormat value={data[0].sum_dri_fs / data[1].sum_dri_fs} displayType="text" decimalScale={4} />;
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell}>Ratio of Domestic to Imported</div>
          <div className={styles.summaryCell}>{ratioTotal}</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>{ratioAvgRes}</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>{ratioDRI}</div>
          <div className={styles.summaryCell}>{ratioFS}</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell}>Ratio of Domestic to Imported</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
        </div>
      </>
    );
  }
}

function summaryDomestic2({ data }) {
  if (data.length > 0) {
    let totalPositives = <NumberFormat value={data.reduce((a, b) => a + b.Number_Positives, 0)} displayType="text" />;
    let totalDRI = <NumberFormat value={data.reduce((a, b) => a + b.DRI_Mean_Kid, 0)} displayType="text" decimalScale={5} fixedDecimalScale="true" />;
    let totalFS = <NumberFormat value={data.reduce((a, b) => a + b.FS_DRI_Kid, 0)} displayType="text" decimalScale={6} fixedDecimalScale="true" />;
    let totalAggPer = <NumberFormat value={data.reduce((a, b) => a + b.Percent_FS_DRI_Kid, 0)} displayType="text" decimalScale={3} fixedDecimalScale="true" suffix="%" />;
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell}>Totals:</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>{totalPositives}</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>{totalDRI}</div>
          <div className={styles.summaryCell}>{totalFS}</div>
          <div className={styles.summaryCell}>{totalAggPer}</div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell}>Totals:</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
          <div className={styles.summaryCell}>--</div>
        </div>
      </>
    );
  }
}

function summaryReport5({ data }) {
  let sumOfAvgSamples = 0
  let totalPos = 0
  let totalPosSampleDRIMean = 0
  let total_fsdri = 0
  let avgDRIDetected = 0
  let numFoodsTested = 0
  let avgDRIMeanPerFood = 0
  let avgFSDRIPerFood = 0
  data.forEach(row => {
    sumOfAvgSamples = row.AvgOfTotal_Samples + sumOfAvgSamples
    totalPos = row.SumOfNumber_Positives + totalPos
    totalPosSampleDRIMean = row.SumOfDRI_Mean_Kid + totalPosSampleDRIMean
    total_fsdri = row.SumOfFS_DRI_Kid + total_fsdri
    numFoodsTested++
  });
  avgDRIDetected = totalPos / sumOfAvgSamples
  avgDRIMeanPerFood = totalPosSampleDRIMean / numFoodsTested
  avgFSDRIPerFood = total_fsdri / numFoodsTested
  totalPos = <NumberFormat value={totalPos} displayType="text" thousandSeparator={true} />
  sumOfAvgSamples = <NumberFormat value={sumOfAvgSamples} displayType="text" decimalScale={2} thousandSeparator={true} fixedDecimalScale="true"/>
  totalPosSampleDRIMean = <NumberFormat value={totalPosSampleDRIMean} displayType="text" decimalScale={2} fixedDecimalScale="true"/>
  total_fsdri = <NumberFormat value={total_fsdri} displayType="text" decimalScale={2} fixedDecimalScale="true"/>
  avgDRIDetected = <NumberFormat value={avgDRIDetected} displayType="text" decimalScale={2} fixedDecimalScale="true"/>
  avgDRIMeanPerFood = <NumberFormat value={avgDRIMeanPerFood} displayType="text" decimalScale={2} fixedDecimalScale="true"/>
  avgFSDRIPerFood = <NumberFormat value={avgFSDRIPerFood} displayType="text" decimalScale={4} fixedDecimalScale="true"/>
  if (data.length > 0) {
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Sum of Average Number of Samples</div>
          <div className={styles.summaryCell}></div>
          <div className={styles.summaryCell}>{sumOfAvgSamples}</div>
          <div className={styles.summaryCell} colSpan="6"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Total Positives</div>
          <div className={styles.summaryCell} colSpan="2"></div>
          <div className={styles.summaryCell} colSpan="2">{totalPos}</div>
          <div className={styles.summaryCell} colSpan="4"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Total Positive Sample DRI Mean</div>
          <div className={styles.summaryCell} colSpan="2">{totalPosSampleDRIMean}</div>
          <div className={styles.summaryCell} colSpan="4"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Total FS-DRI</div>
          <div className={styles.summaryCell} colSpan="2">{total_fsdri}</div>
          <div className={styles.summaryCell} colSpan="4"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Average DRI Detections Per Sample</div>
          <div className={styles.summaryCell} colSpan="2">{avgDRIDetected}</div>
          <div className={styles.summaryCell} colSpan="4"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Number of Foods Tested</div>
          <div className={styles.summaryCell} colSpan="2">{numFoodsTested}</div>
          <div className={styles.summaryCell} colSpan="4"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Average DRI-Mean per Food Tested</div>
          <div className={styles.summaryCell} colSpan="2">{avgDRIMeanPerFood}</div>
          <div className={styles.summaryCell} colSpan="4"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="1">Average FS-DRI per Food Tested</div>
          <div className={styles.summaryCell} colSpan="2">{avgFSDRIPerFood}</div>
          <div className={styles.summaryCell} colSpan="4"></div>
        </div>
      </>
    )
  } else return null;
}

function summaryReport6({ data }) {
  let totalPos = 0
  let totalDRIMean = 0
  let totalFSDRI = 0
  data.forEach(row => {
    totalPos = row.SumOfNumber_Positives + totalPos
    totalDRIMean = row.SumOfDRI_Mean_Kid + totalDRIMean
    totalFSDRI = row.SumOfFS_DRI_Kid + totalFSDRI
  })
  totalPos = <NumberFormat value={totalPos} displayType="text" thousandSeparator={true}/>
  totalDRIMean = <NumberFormat value={totalDRIMean} displayType="text" thousandSeparator={true} decimalScale={2} fixedDecimalScale="true"/>
  totalFSDRI = <NumberFormat value={totalFSDRI} displayType="text" thousandSeparator={true} decimalScale={2} fixedDecimalScale="true"/>
  if (data.length > 0) {
    return (
      <>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="3">Total Positives</div>
          <div className={styles.summaryCell} colSpan="2">{totalPos}</div>
          <div className={styles.summaryCell} colSpan="5"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="3">Total DRI-Mean</div>
          <div className={styles.summaryCell} colSpan="2">{totalDRIMean}</div>
          <div className={styles.summaryCell} colSpan="5"></div>
        </div>
        <div className={styles.totalRow}>
          <div className={styles.summaryCell} colSpan="3">Total FS-DRI</div>
          <div className={styles.summaryCell} colSpan="2">{totalFSDRI}</div>
          <div className={styles.summaryCell} colSpan="5"></div>
        </div>
      </>
    )
  } else return null;
}