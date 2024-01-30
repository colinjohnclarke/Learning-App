import React, { useContext } from "react";
import FlameDayStreak from "./FlameDayStreak";
import { ThemeStyles } from "../../styles/ThemeStyles";
import styled from "styled-components";
import { UserContext } from "../../App";
import DayStreakDaysView from "./DayStreakDaysView";

function DayStreakPanel() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper>
      {/* <Box style={{ marginLeft: "5px" }} darkThemeActive={darkThemeActive}> */}{" "}
      <FlameDayStreak />
      <Mobile style={{ margin: "10px" }}> days</Mobile>
      <Streak style={{ margin: "10px" }}> day streak</Streak>
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
  justify-content: start;
  align-items: center;
  margin-top: 20px;
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
