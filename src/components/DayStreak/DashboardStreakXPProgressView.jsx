import React, { useContext } from "react";

import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import DayStreakPanel from "./DayStreakPanel";

import XPointsGraph from "./DailyGoal/XPointsGraph";
import XPRemainingToCompleteGoal from "./DailyGoal/XPRemainingToCompleteGoal";

import SetDailyGoalBtn from "./DailyGoal/SetDailyGoalBtn";

function DashboardStreakXPProgressView() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper
      darkThemeActive={darkThemeActive}
      style={{
        display: "flex",
        flexWrap: "wrap",
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <DayStreak darkThemeActive={darkThemeActive}>
        <DayStreakPanel />
      </DayStreak>
      <Gap></Gap>
      <Graph darkThemeActive={darkThemeActive}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2
            style={{
              padding: "5px",
              marginLeft: "30px",
              fontSize: "14px",
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            Daily Progress
          </h2>
          <SetDailyGoalBtn />
          <XPRemainingToCompleteGoal></XPRemainingToCompleteGoal>
        </div>

        <XPointsGraph />
      </Graph>
    </Wrapper>
  );
}

export default DashboardStreakXPProgressView;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 5px;
`;

const Graph = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  @media (min-width: 640px) {
    // margin-right: 5px;

    width: 49%;
  }
`;

const DayStreak = styled.div`
  margin-bottom: 10px;
  width: 100%;

  // display: flex;
  // flex-direction: column;
  // align-items: center;
  border-radius: 4px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  @media (min-width: 640px) {
    // margin-left: 5px;
    width: 49%;
    margin-top: 0px;
  }
`;

const Gap = styled.div`
  display: none;
  @media (min-width: 640px) {
    display: block;
    width: 2%;
    max-width: 20px;
  }
`;
