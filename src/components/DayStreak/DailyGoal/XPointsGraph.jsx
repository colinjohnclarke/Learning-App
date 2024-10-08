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
  const { darkThemeActive, userData } = useContext(UserContext);

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

  const dailyXPGoal =
    userData?.user.preferences.personalizedSettings.dailyXPGoal;

  const options = {
    responsive: true,

    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 0,
        left: 20,
      },
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            family: "Quicksand",
            size: 12,
            weight: "normal",
          },

          generateLabels: function (chart) {
            // Custom label generation function
            return [
              {
                text: "Scored XP",
                fillStyle: "rgb(0, 245, 245)",
                strokeStyle: "rgb(0, 245, 245)",
                lineWidth: 2,
                hidden: false,
                index: 0,
                fontColor: darkThemeActive
                  ? ThemeStyles.lightThemePrimaryFrontColor
                  : ThemeStyles.darkThemePrimaryFontColor,
              },
              {
                text: "Daily XP Goal",
                fillStyle: "blue",
                strokeStyle: "blue",
                lineWidth: 2,
                hidden: false,
                index: 1,
                fontColor: darkThemeActive
                  ? ThemeStyles.lightThemePrimaryFrontColor
                  : ThemeStyles.darkThemePrimaryFontColor,
              },
            ];
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

      {
        data: [
          dailyXPGoal,
          dailyXPGoal,
          dailyXPGoal,
          dailyXPGoal,
          dailyXPGoal,
          dailyXPGoal,
          dailyXPGoal,
        ],

        borderColor: "blue",
        backgroundColor: darkThemeActive
          ? ThemeStyles.lightThemePrimaryBackgroundColor
          : ThemeStyles.darkThemePrimaryBackgroundColor,
      },
    ],
  };

  return (
    <div
      style={{
        height: "200px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Line options={options} data={data} />
    </div>
  );
}

export default XPointsGraph;
