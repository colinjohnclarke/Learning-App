import React, { useContext } from "react";
import { ThemeStyles } from "../../styles/ThemeStyles";
import styled from "styled-components";
import { UserContext } from "../../App";
import { FaCheckCircle } from "react-icons/fa";
import { arrOfDatesQuizCompletedLastWeek } from "./FlameDayStreak";
import { AiFillQuestionCircle } from "react-icons/ai";
import { dayOfWeekMap } from "./DailyGoal/XPointsGraph";
import LastWeekDates from "./LastWeekDates";

function DayStreakDaysView() {
  const lastWeekDates = LastWeekDates();

  const { darkThemeActive } = useContext(UserContext);

  const daysCompleted = arrOfDatesQuizCompletedLastWeek.map((item) => {
    const day = new Date(item).getDay();
    const dayValue = dayOfWeekMap.get(day);
    return dayValue;
  });

  const date = new Date();
  const today = dayOfWeekMap.get(date.getDay());

  const content = lastWeekDates.map((date, index) => {
    const day = new Date(date).getDay();
    const letterOfDay = dayOfWeekMap.get(day);

    let icon;

    if (daysCompleted.find((item) => item === letterOfDay)) {
      icon = (
        <>
          <P
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {letterOfDay.substring(0, 1)}{" "}
          </P>
          <DayIcon
            style={{
              backgroundColor: "orange",
            }}
          >
            <FaCheckCircle
              size={23}
              fill={darkThemeActive ? "white" : "black"}
            />
          </DayIcon>
        </>
      );
    } else if (
      !daysCompleted.find((item) => item === today) &&
      letterOfDay === today
    ) {
      icon = (
        <>
          <P
            style={{
              color: "rgb(0, 245, 245)",
            }}
          >
            {letterOfDay.substring(0, 1)}{" "}
          </P>

          <DayIcon
            style={{
              backgroundColor: "rgb(0, 245, 245)",
            }}
          >
            <AiFillQuestionCircle
              size={23}
              fill={darkThemeActive ? "white" : "black"}
            />
          </DayIcon>
        </>
      );
    } else {
      icon = (
        <>
          <P
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {letterOfDay.substring(0, 1)}{" "}
          </P>
          <DayIcon
            style={{
              backgroundColor: "grey",
            }}
          >
            {/* <FaCheckCircle size={23} fill={darkThemeActive ? "white" : "black"} /> */}
          </DayIcon>
        </>
      );
    }

    return <Day>{icon}</Day>;
  });

  return <Outer>{content.reverse()}</Outer>;
}

export default DayStreakDaysView;

const DayIcon = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin: 2px;
  padding: 2px;
  display: flex;
  flex-direction: row;
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
