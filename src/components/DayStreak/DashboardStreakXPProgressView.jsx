import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import DayStreakPanel from "./DayStreakPanel";
import XPointsGraph from "./DailyGoal/XPointsGraph";
import XPRemainingToCompleteGoal from "./DailyGoal/XPRemainingToCompleteGoal";
import SetDailyGoalBtn from "./DailyGoal/SetDailyGoalBtn";
import XPPointsScoredToday from "./DailyGoal/XPPointsScoredToday";

function DashboardStreakXPProgressView() {
  const { darkThemeActive, userData } = useContext(UserContext);
  const XP = XPPointsScoredToday();

  const percentageGoalCompleted =
    (XP / userData?.user.preferences.personalizedSettings.dailyXPGoal) * 100;
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
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "flex-start",
              width: "100%",
              padding: "10px",
            }}
          >
            {" "}
            <h2
              style={{
                // padding: "5px",
                marginLeft: "10px",
                fontSize: "14px",
                display: "flex",
                width: "100px",
                flexDirection: "column",
                justifyContent: "space-between",

                color: darkThemeActive
                  ? ThemeStyles.lightThemePrimaryFrontColor
                  : ThemeStyles.darkThemePrimaryFontColor,
              }}
            >
              Daily Progress {percentageGoalCompleted > 100 && "completed!"}
            </h2>
            <XPRemainingToCompleteGoal></XPRemainingToCompleteGoal>
          </div>

          <SetDailyGoalBtn />
        </div>

        <XPointsGraph />
      </Graph>
    </Wrapper>
  );
}

export default DashboardStreakXPProgressView;

const Wrapper = styled.div`
  width: 100%;
`;

const Graph = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;

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
  border-radius: 16px;
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
