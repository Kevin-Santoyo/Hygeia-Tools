import NumberFormat from "react-number-format";
import _ from "lodash";
import styles from "./Table.module.css";
import { useRouter } from "next/router";

export default function Summary({ data, tableNum }) {
  var localURL = useRouter().route;
  if (localURL == "/dri/by_pesticide") {
    switch (tableNum) {
      case 1:
        return summaryPesticide((data = { data }));
      default:
        return null;
    }
  } else if (localURL == "/dri/by_commodity") {
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
  } else {
    return null;
  }
}

function summaryPesticide({ data }) {
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
    total_samples = row.total_samples + total_samples;
    total_num_pos = total_num_pos + row.number_positives;
    total_drim = total_drim + row.dri_mean_kid;
    total_fsdri = total_fsdri + row.fs_dri_kid;
    total_percent = total_percent + row.per_agg_fsdri * 100;
    totalDetections++;
    agg_dri = row.fs_dri_kid + agg_dri;
    dri_kid = row.fs_dri_kid + dri_kid;
  });
  averageSamples = total_samples / totalDetections;
  averageResidues = (total_num_pos / total_samples).toFixed(2);
  total_percent = (dri_kid / agg_dri) * 100;
  averageSamples = averageSamples.toFixed(0);
  total_drim = total_drim.toFixed(5);
  return (
    <>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Total Number of Samples</td>
        <td className={styles.cell}>
          {
            <NumberFormat
              value={total_samples}
              displayType="text"
              thousandSeparator=","
            />
          }
        </td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
      </tr>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Total Positives and Aggregate DRI</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}>{total_num_pos}</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}>{total_drim}</td>
        <td className={styles.cell}>{total_fsdri.toFixed(5)}</td>
        <td className={styles.cell}>{total_percent.toFixed(2).concat("%")}</td>
      </tr>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Average Residues Detected per Sample</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}>{averageResidues}</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
      </tr>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Number of Foods with Residues</td>
        <td className={styles.cell}>{totalDetections}</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
      </tr>
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
    averageSamples = row.total_samples + averageSamples;
    total_num_pos += row.number_positives;
    total_drim += row.dri_mean_kid;
    total_fsdri += row.fs_dri_kid;
    total_percent += row.per_agg_fsdri * 100;
    totalDetections++;
    agg_dri = row.fs_dri_kid + agg_dri;
    dri_kid = row.fs_dri_kid + dri_kid;
  });
  averageSamples = averageSamples / totalDetections;
  averageResidues = (total_num_pos / averageSamples).toFixed(2);
  total_percent = total_percent;
  averageSamples = averageSamples.toFixed(0);
  total_drim = total_drim.toFixed(5);
  return (
    <>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Average Number of Samples</td>
        <td className={styles.cell}>{averageSamples}</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
      </tr>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Total Positives and Aggregate DRI</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}>{total_num_pos}</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}>{total_drim}</td>
        <td className={styles.cell}>{total_fsdri.toFixed(5)}</td>
        <td className={styles.cell}>{total_percent.toFixed(2).concat("%")}</td>
      </tr>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Average Residues Detected per Sample</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}>{averageResidues}</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
      </tr>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Number of Analytes Detected</td>
        <td className={styles.cell}>{totalDetections}</td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
        <td className={styles.cell}></td>
      </tr>
    </>
  );
}

function summaryConventional1({ data }) {
  if (data.length != 1) {
      let totalRatio = data[0].avg_total_samples / data[1].avg_total_samples
      let residueRatio = data[0].avg_number_residues / data[1].avg_number_residues
      let driRatio = data[0].sum_dri_mean / data[1].sum_dri_mean
      let fsRatio = data[0].sum_dri_fs / data[1].sum_dri_fs
    return (
      <>
        <tr className={styles.totalRow}>
          <td className={styles.cell}>Ratio of Conventional to Organic</td>
          <td className={styles.cell}>
            <NumberFormat
              value={totalRatio}
              displayType="text"
              decimalScale={1}
            />
          </td>
          <td className={styles.cell}>--</td>
          <td className={styles.cell}>
            <NumberFormat
              value={residueRatio}
              displayType="text"
              decimalScale={2}
            />
          </td>
          <td className={styles.cell}>--</td>
          <td className={styles.cell}>
            <NumberFormat
              value={driRatio}
              displayType="text"
              decimalScale={2}
            />
          </td>
          <td className={styles.cell}>
            <NumberFormat
              value={fsRatio}
              displayType="text"
              decimalScale={2}
            />
          </td>
        </tr>
      </>
    );
  } else {
    return (
      <>
        <tr className={styles.totalRow}>
          <td className={styles.cell}>Ratio of Conventional to Organic</td>
          <td className={styles.cell}>--</td>
          <td className={styles.cell}>--</td>
          <td className={styles.cell}>--</td>
          <td className={styles.cell}>--</td>
          <td className={styles.cell}>--</td>
          <td className={styles.cell}>--</td>
        </tr>
      </>
    );
  }
}

function summaryConventional2({ data }) {
  var num_pos = 0;
  var dri_total = 0;
  var fsdri_total = 0;
  data.map((dat) => {
    num_pos += dat.number_positives;
    dri_total += dat.dri_mean_kid;
    fsdri_total += dat.fs_dri_kid;
  });

  return (
    <>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Totals:</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>
          <NumberFormat value={num_pos} displayType="text" />
        </td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>
          <NumberFormat
            value={dri_total}
            displayType="text"
            decimalScale={5}
            fixedDecimalScale="true"
          />
        </td>
        <td className={styles.cell}>
          <NumberFormat
            value={fsdri_total}
            displayType="text"
            decimalScale={5}
            fixedDecimalScale="true"
          />
        </td>
      </tr>
    </>
  );
}

function summaryConventional3({ data }) {
  var num_pos = 0;
  var dri_total = 0;
  var res_over_thresh = 0;
  var num_inadvert_res = 0;
  data.map((dat) => {
    num_pos += dat.number_positives;
    dri_total += dat.dri_mean_kid;
    res_over_thresh += dat.number_residues_exceed_at;
    num_inadvert_res += dat.number_inadvertent_residues;
  });
  return (
    <>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Totals:</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>
          <NumberFormat value={num_pos} displayType="text" />
        </td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>
          <NumberFormat value={res_over_thresh} displayType="text" />
        </td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>
          <NumberFormat value={num_inadvert_res} displayType="text" />
        </td>
        <td className={styles.cell}>
          <NumberFormat
            value={dri_total}
            displayType="text"
            decimalScale={5}
            fixedDecimalScale="true"
          />
        </td>
      </tr>
    </>
  );
}

function summaryConventional4({ data }) {
  var dri_total = 0;
  var fsdri_total = 0;
  data.map((dat) => {
    dri_total += dat.dri_mean_kid;
    fsdri_total += dat.fs_dri_kid;
  });
  return (
    <>
      <tr className={styles.totalRow}>
        <td className={styles.cell}>Totals:</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>--</td>
        <td className={styles.cell}>
          <NumberFormat
            value={dri_total}
            displayType="text"
            decimalScale={5}
            fixedDecimalScale="true"
          />
        </td>
        <td className={styles.cell}>
          <NumberFormat
            value={fsdri_total}
            displayType="text"
            decimalScale={5}
            fixedDecimalScale="true"
          />
        </td>
      </tr>
    </>
  );
}
