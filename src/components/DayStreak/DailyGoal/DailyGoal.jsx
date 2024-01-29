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

function DailyGoal() {
  const { darkThemeActive } = useContext(UserContext);

  const dataFromPrevWeek = DataFromPrevWeek();
  console.log("🚀 ~ DailyGoal ~ dataFromPrevWeek:", dataFromPrevWeek);

  const lastWeekDates = LastWeekDates();
  console.log("🚀 ~ DailyGoal ~ lastWeekDates:", lastWeekDates);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const dayOfWeekMap = new Map([
    [0, "Sunday"],
    [1, "Monday"],
    [2, "Tuesday"],
    [3, "Wednesday"],
    [4, "Thursday"],
    [5, "Friday"],
    [6, "Saturday"],
  ]);

  const prevDaysOfWeek = lastWeekDates
    .map((date) => {
      const dateOfWeek = new Date(date);
      const day = dateOfWeek.getDay();
      return dayOfWeekMap.get(day).substring(0, 3);
    })
    .reverse();
  console.log("🚀 ~ DailyGoal ~ prevDaysOfWeek:", prevDaysOfWeek);

  // console.log("🚀 ~ prevDaysOfWeek ~ prevDaysOfWeek:", prevDaysOfWeek);

  const test = [5, 19, 15, 25, 33, 35, 45];

  // const xpScoredEachDayLastWeek = lastWeekDates.map((day, index) => {
  //   const date = new Date(day);

  //   console.log("🚀 ~ xpScoredEachDayLastWeek ~ date:", date);
  //   const dateFromQuiz = dataFromPrevWeek.map((subDay) => {
  //     if (new Date(subDay.timeStamp).getTime() === date.getTime()) {
  //       return subDay.XpScored;
  //     }
  //   });
  // });

  // console.log(
  //   "🚀 ~ xpScoredEachDayLastWeek ~ xpScoredEachDayLastWeek:",
  //   xpScoredEachDayLastWeek
  // );

  // console.log("xpScoredEachDayLastWeek", xpScoredEachDayLastWeek);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: prevDaysOfWeek,
    datasets: [
      {
        data: test,
        borderColor: "rgb(0, 245, 245)",
        backgroundColor: darkThemeActive
          ? ThemeStyles.lightThemePrimaryBackgroundColor
          : ThemeStyles.darkThemePrimaryBackgroundColor,
      },
    ],
  };

  return (
    <div
      style={{
        height: "300px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        width: "100%",
        borderRadius: "4px",

        backgroundColor: darkThemeActive
          ? ThemeStyles.lightThemePrimaryBackgroundColor
          : ThemeStyles.darkThemePrimaryBackgroundColor,
        boxShadow: darkThemeActive
          ? ThemeStyles.lightThemeMainBoxShadow
          : ThemeStyles.darkThemeMainBoxShadow,
      }}
    >
      {" "}
      {/* Daily Goal */}
      <Line options={options} data={data} />
    </div>
  );
}

export default DailyGoal;
