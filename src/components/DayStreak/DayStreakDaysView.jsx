import React, { useContext } from "react";
import FlameDayStreak from "./FlameDayStreak";
import { ThemeStyles } from "../../styles/ThemeStyles";
import styled from "styled-components";
import { UserContext } from "../../App";
import { FaCheck } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { arrOfDatesQuiZCompletedLastWeek } from "./FlameDayStreak";
import { dayOfWeekMap } from "./DailyGoal/DailyGoal";
import LastWeekDates from "./LastWeekDates";

function DayStreakDaysView() {
  const lastWeekDates = LastWeekDates();

  const daysCompleted = arrOfDatesQuiZCompletedLastWeek.map((item) => {
    const day = new Date(item).getDay();
    const dayValue = dayOfWeekMap.get(day);
    return dayValue;
  });

  const content = lastWeekDates.map((date, index) => {
    const day = new Date(date).getDay();
    const letter = dayOfWeekMap.get(day);

    return (
      <Day>
        <P>{letter.substring(0, 1)} </P>
        <DayIcon
          style={{
            backgroundColor: daysCompleted.find((item) => item === letter)
              ? "orange"
              : "lightgrey",
          }}
        >
          {daysCompleted.find((item) => item === letter) ? (
            <FaCheckCircle size={22} fill="white" />
          ) : null}
        </DayIcon>
      </Day>
    );
  });

  console.log("🚀 ~ content ~ content:", content);

  return <Outer>{content.reverse()}</Outer>;
}

export default DayStreakDaysView;

const DayIcon = styled.div`
  height: 23px;
  width: 23px;
  border-radius: 50%;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Outer = styled.div`
  padding: 5px;
  margin-bottom: 20px;
  height: 80px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Day = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const P = styled.p``;
