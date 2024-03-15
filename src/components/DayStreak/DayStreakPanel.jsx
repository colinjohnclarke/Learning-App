import React, { useContext } from "react";
import FlameDayStreak from "./FlameDayStreak";
import { ThemeStyles } from "../../styles/ThemeStyles";
import styled from "styled-components";
import { UserContext } from "../../App";
import DayStreakDaysView from "./DayStreakDaysView";
import { arrOfDatesQuizCompletedLastWeek } from "./FlameDayStreak";

function DayStreakPanel() {
  const { darkThemeActive } = useContext(UserContext);

  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const year = date.getFullYear();
  const today = `${year}-${month}-${day}`;

  return (
    <Wrapper>
      {/* <Box style={{ marginLeft: "5px" }} darkThemeActive={darkThemeActive}> */}{" "}
      <FlameDayStreak />
      <Mobile style={{ margin: "10px" }}> days</Mobile>
      {!arrOfDatesQuizCompletedLastWeek.find((item) => item === today) && (
        <p
          style={{
            color: darkThemeActive
              ? ThemeStyles.lightThemePrimaryFrontColor
              : ThemeStyles.darkThemePrimaryFontColor,
          }}
        >
          {" "}
          Complete a lesson to start day streak!
        </p>
      )}
      {arrOfDatesQuizCompletedLastWeek.find((item) => item === today) && (
        <Streak
          style={{
            margin: "10px",
            color: darkThemeActive
              ? ThemeStyles.lightThemePrimaryFrontColor
              : ThemeStyles.darkThemePrimaryFontColor,
          }}
        >
          {" "}
          Keep the flame lit by studying every day!
        </Streak>
      )}
      <DayStreakDaysView />
      {/* </Box> */}
    </Wrapper>
  );
}

export default DayStreakPanel;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const Box = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  border-radius: 5px;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const Streak = styled.p`
  display: none;

  @media (min-width: 500px) {
    display: block;
    font-size: 14px;
  }
`;

const Mobile = styled.p`
  font-size: 15px;

  @media (min-width: 500px) {
    display: none;
  }
`;
