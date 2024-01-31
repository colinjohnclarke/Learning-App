import React, { useContext } from "react";
import DataFromPrevWeek from "../DataFromPrevWeek";
import LastWeekDates from "../LastWeekDates";
import { UserContext } from "../../../App";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ThemeStyles } from "../../../styles/ThemeStyles";

export const dayOfWeekMap = new Map([
  [0, "Sunday"],
  [1, "Monday"],
  [2, "Tuesday"],
  [3, "Wednesday"],
  [4, "Thursday"],
  [5, "Friday"],
  [6, "Saturday"],
]);

function XPointsGraph() {
  const { darkThemeActive } = useContext(UserContext);

  const dataFromPrevWeek = DataFromPrevWeek();

  const lastWeekDates = LastWeekDates();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const prevDaysOfWeek = lastWeekDates
    .map((date) => {
      const dateOfWeek = new Date(date);
      const day = dateOfWeek.getDay();
      return dayOfWeekMap.get(day).substring(0, 3);
    })
    .reverse();

  const xpScoredEachDayLastWeek = lastWeekDates
    .map((date) => {
      const subItems = dataFromPrevWeek?.filter(
        (item) => item.timeStamp.substring(0, 10) === date
      );

      let combinedXP = 0;

      subItems?.forEach((item) => {
        combinedXP += item.XPScored;
      });

      return combinedXP;
    })
    .reverse();

  const options = {
    responsive: true,
    layout: {
      padding: {
        top: 20,
        right: 30,
        bottom: 20,
        left: 20,
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            family: "Quicksand",
            size: 12,
            weight: "normal",
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Quicksand",
            size: 14,
            weight: "normal",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Quicksand",
            size: 14,
            weight: "normal",
          },
        },
      },
    },
  };
  const data = {
    labels: prevDaysOfWeek,
    datasets: [
      {
        data: xpScoredEachDayLastWeek,
        borderColor: "rgb(0, 245, 245)",
        backgroundColor: darkThemeActive
          ? ThemeStyles.lightThemePrimaryBackgroundColor
          : ThemeStyles.darkThemePrimaryBackgroundColor,
      },
    ],
  };

  return <Line options={options} data={data} />;
}

export default XPointsGraph;
