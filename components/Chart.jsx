import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css";
import TableContainer from "./TableContainer";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Charts({ data, params, state }) {
  let toggleState = state;
  if (data[1]) {
    let selected = [params[0].selected, params[1].selected];
    let pChar1 = (data[0].sum_dri_fs * 100).toFixed(1);
    let pChar2 = (100 - pChar1).toFixed(1);
    let pChar3 = (data[1].sum_dri_fs * 100).toFixed(1);
    let pChar4 = (100 - pChar3).toFixed(1);
    console.log(pChar1, "pChar1");
    let barChart1Data = {
      labels: ["Conventional", "Organic"],
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: "rgb(158, 27, 52)",
          borderColor: "rgb(158, 27, 52)",
          borderWidth: 1,
          data: [data[0].sum_dri_fs.toFixed(4), data[1].sum_dri_fs.toFixed(4)],
        },
      ],
    };
    let barChart2Data = {
      labels: ["Conventional", "Organic"],
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: "rgb(158, 27, 52)",
          borderColor: "rgb(158, 27, 52)",
          borderWidth: 1,
          data: [data[0].avg_number_residues.toFixed(2), data[1].avg_number_residues.toFixed(2)],
        },
      ],
    };
    let pieChart1Data = {
      labels: ["0 Positives", ">0 Positives"],
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: ["#1B9E87", "#9E1B34"],
          borderColor: ["#1B9E87", "#9E1B34"],
          borderWidth: 1,
          data: [pChar1, pChar2],
        },
      ],
    };
    let pieChart2Data = {
      labels: ["0 Positives", ">0 Positives"],
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: ["#1B9E87", "#9E1B34"],
          borderColor: ["#1B9E87", "#9E1B34"],
          borderWidth: 1,
          data: [pChar3, pChar4],
        },
      ],
    };
    return (
      <div className={styles.container}>
        <div class={toggleState === 1 ? styles.activeContent : styles.content}>
          <BarChart1 data={barChart1Data} params={selected} />
        </div>
        <div class={toggleState === 2 ? styles.activeContent : styles.content}>
          <BarChart2 data={barChart2Data} params={selected} />
        </div>
        <div class={toggleState === 3 ? styles.activeContent : styles.content}>
          <PieChart1 data={pieChart1Data} params={selected} />
          <PieChart2 data={pieChart2Data} params={selected} />
        </div>
      </div>
    );
  } else return null;
}

const BarChart1 = ({ data, params }) => {
  return (
    <>
      <p className={styles.title}>
        Figure 1: Aggregate FS-DRI for {params[0]}, {params[1]}
      </p>
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

const BarChart2 = ({ data, params }) => {
  return (
    <>
      <p className={styles.title}>
        Figure 2: Average Number of Pesticide Residues per Sample in {params[0]}, {params[1]}
      </p>
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

const PieChart1 = ({ data, params }) => {
  return (
    <>
      <p className={styles.title}>
        Figure 3: {params[0]} Containing Zero Positive Pesticide Residues, {params[1]}
      </p>
      <div className={`${styles.chart} ${styles.chartSmall}`}>
        <Pie
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Conventional Samples",
                position: "bottom",
              },
              legend: {
                display: false,
              },
              tooltip: {
                displayColors: false,
                yAlign: 'bottom',
                callbacks: {
                  label: function (context) {
                    return context.label + ': ' + context.raw + "%";
                  }
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

const PieChart2 = ({ data }) => {
  return (
    <div className={`${styles.chart} ${styles.chartSmall}`}>
      <Pie
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Organic Samples",
              position: "bottom",
            },
            legend: {
              display: false,
            },
            tooltip: {
              displayColors: false,
              yAlign: 'bottom',
              callbacks: {
                label: function (context) {
                  return context.label + ': ' + context.raw + "%";
                }
              },
            },
            responsive: true,
          },
        }}
      />
    </div>
  );
};
