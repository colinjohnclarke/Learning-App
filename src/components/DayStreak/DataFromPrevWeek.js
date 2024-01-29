import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import LastWeekDates from "./LastWeekDates";

function DataFromPrevWeek() {
  const { userData } = useContext(UserContext);

  const reverseChronologicalOrderdates = LastWeekDates();

  // returns a array of quizzes data where completion has occoured in previous 7 days
  const datesWithScoresAwardedinPrevWeek = userData?.user.quizScores.filter(
    (score) => {
      // check which quiz scores have a  date listed in the last week previousDates
      // if (score.timestamp) {
      return reverseChronologicalOrderdates.includes(
        score.timeStamp.substring(0, 10)
      );
    }
  );

  return datesWithScoresAwardedinPrevWeek;
}

export default DataFromPrevWeek;
