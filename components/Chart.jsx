import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/router";
import { Bar, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Charts({ data, params, state }) {
  let toggleState = state;
  const pageName = useRouter().route;
  if (data[1]) {
    let title1, title2, title3, dataset1, dataset2, dataset3, dataset4, labels, chartText
    if (pageName == "/dri/conventional-vs-organic") {
      let selected = [params[0].selected, params[1].selected];
      title1 = `Figure 1: Aggregate FS-DRI for ${selected[0]}, ${selected[1]}`;
      title2 = `Figure 2: Average Number of Pesticide Residues per Sample in ${selected[0]}, ${selected[1]}`;
      title3 = `Figure 3: ${selected[0]} Containing Zero Positive Pesticide Residues, ${selected[1]}`;
      chartText = ['Conventional Samples', 'Organic Samples']
      let pChar1 = (data[0].sum_dri_fs * 100).toFixed(1);
      let pChar2 = (100 - pChar1).toFixed(1);
      let pChar3 = (data[1].sum_dri_fs * 100).toFixed(1);
      let pChar4 = (100 - pChar3).toFixed(1);
      dataset1 = [data[0].sum_dri_fs.toFixed(4), data[1].sum_dri_fs.toFixed(4)]
      dataset2 = [data[0].avg_number_residues.toFixed(2), data[1].avg_number_residues.toFixed(2)]
      dataset3 = [pChar1, pChar2]
      dataset4 = [pChar3, pChar4]
      
    } else if (pageName == "/dri/domestic_vs_imported") {
      console.log(data, "chart data");
      let selected = [params[0].selected, params[1].selected, params[2].selected, params[3].selected];
      labels = [data[0].origin, data[1].origin]
      title1 = `Figure 1: Aggregate FS-DRI for ${selected[2]} ${selected[0]}, ${selected[3]}`;
      title2 = `Figure 2: Number of Pesticide Residues Contained in ${selected[2]} ${selected[0]}, ${selected[3]}`;
      title3 = `Figure 3: ${selected[2]} ${selected[0]} Containing Zero Positive Pesticide Residues, ${selected[3]}`;
      chartText = ['Domestic Samples', 'Imported Samples']
      let pChar1 = (data[0].sum_dri_fs * 100).toFixed(1);
      let pChar2 = (100 - pChar1).toFixed(1);
      let pChar3 = (data[1].sum_dri_fs * 100).toFixed(1);
      let pChar4 = (100 - pChar3).toFixed(1);
      dataset1 = [data[0].sum_dri_fs.toFixed(2), data[1].sum_dri_fs.toFixed(2)]
      dataset2 = [data[0].avg_number_residues.toFixed(0), data[1].avg_number_residues.toFixed(0)]
      dataset3 = [pChar1, pChar2]
      dataset4 = [pChar3, pChar4]
    } else if (pageName == "/fsa/conventional_vs_organic") {
      
    }
    let barChart1Data = {
      labels: labels,
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: "rgb(158, 27, 52)",
          borderColor: "rgb(158, 27, 52)",
          borderWidth: 1,
          data: dataset1,
        },
      ],
    };
    let barChart2Data = {
      labels: labels,
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: "rgb(158, 27, 52)",
          borderColor: "rgb(158, 27, 52)",
          borderWidth: 1,
          data: dataset2,
        },
      ],
    };
    let pieChart1Data = {
      labels: [">0 Positives", "0 Positives"],
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: ["#1B9E87", "#9E1B34"],
          borderColor: ["#1B9E87", "#9E1B34"],
          borderWidth: 1,
          data: dataset3,
        },
      ],
    };
    let pieChart2Data = {
      labels: [">0 Positives", "0 Positives"],
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: ["#1B9E87", "#9E1B34"],
          borderColor: ["#1B9E87", "#9E1B34"],
          borderWidth: 1,
          data: dataset4,
        },
      ],
    };
    return (
      <div className={styles.container}>
        <div class={toggleState === 1 ? styles.activeContent : styles.content}>
          <BarChart1 data={barChart1Data} title={title1} />
        </div>
        <div class={toggleState === 2 ? styles.activeContent : styles.content}>
          <BarChart2 data={barChart2Data} title={title2} />
        </div>
        <div class={toggleState === 3 ? styles.activeContent : styles.content}>
          <PieChart1 data={pieChart1Data} title={title3} chartText={chartText[0]} />
          <PieChart2 data={pieChart2Data} chartText={chartText[1]} />
        </div>
      </div>
    );
  } else return null;
}

const BarChart1 = ({ title, data }) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles.chart}>
        <Bar
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              responsive: true,
            },
          }}
        />
      </div>
    </>
  );
};

const BarChart2 = ({ data, title }) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={styles.chart}>
        <Bar
          data={data}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              responsive: true,
            },
          }}
        />
      </div>
    </>
  );
};

const PieChart1 = ({ data, title, chartText }) => {
  return (
    <>
      <p className={styles.title}>{title}</p>
      <div className={`${styles.chart} ${styles.chartSmall}`}>
        <Pie
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: chartText,
                position: "bottom",
              },
              legend: {
                display: false,
              },
              tooltip: {
                displayColors: false,
                yAlign: "bottom",
                callbacks: {
                  label: function (context) {
                    return context.label + ": " + context.raw + "%";
                  },
                },
              },
              responsive: true,
            },
          }}
        />
      </div>
    </>
  );
};

const PieChart2 = ({ data, chartText }) => {
  return (
    <div className={`${styles.chart} ${styles.chartSmall}`}>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: chartText,
              position: "bottom",
            },
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              yAlign: "bottom",
              callbacks: {
                label: function (context) {
                  return context.label + ": " + context.raw + "%";
                },
              },
            },
            responsive: true,
          },
        }}
      />
    </div>
  );
};
