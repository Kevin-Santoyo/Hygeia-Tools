import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import styles from "./Chart.module.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Charts({ data, params }) {
    console.log(params, 'chartparams')
  console.log(data, "chartData");
  if (data[1]) {
      let selected = [params[0].selected, params[1].selected]
    let barChart1Data = {
      labels: ["Conventional", "Organic"],
      datasets: [
        {
          label: "FS-DRI",
          backgroundColor: "rgb(158, 27, 52)",
          borderColor: "rgb(255, 99, 132)",
          data: [
            data[0].sum_dri_fs,
            data[1].sum_dri_fs
            ],
        },
      ],
    };
    return (
      <>
        <BarChart1 data={barChart1Data} params={selected} />
      </>
    );
  } else return null;
}
const BarChart1 = ({ data, params }) => {
  return (
    <div className={styles.chart}>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Figure 1: Aggregate FS-DRI for ${params[0]}, ${params[1]}`,
              position: "top",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

const BarChart2 = ({ data }) => {
  return (
    <div className={styles.chart}>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Figure 1: Aggregate FS-DRI for Apples, 2016",
              position: "top",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

const PieChart1 = ({ data }) => {
  return (
    <div className={styles.chart}>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Figure 1: Aggregate FS-DRI for Apples, 2016",
              position: "top",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};
const PieChart2 = ({ data }) => {
  return (
    <div className={styles.chart}>
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Figure 1: Aggregate FS-DRI for Apples, 2016",
              position: "top",
            },
            legend: {
              display: false,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};
