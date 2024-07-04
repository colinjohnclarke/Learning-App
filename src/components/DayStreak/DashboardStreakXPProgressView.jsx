import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import DayStreakPanel from "./DayStreakPanel";
import XPointsGraph from "./DailyGoal/XPointsGraph";
import XPRemainingToCompleteGoal from "./DailyGoal/XPRemainingToCompleteGoal";
import SetDailyGoalBtn from "./DailyGoal/SetDailyGoalBtn";
import XPPointsScoredToday from "./DailyGoal/XPPointsScoredToday";
import Border from "../Border";

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
        <Border>
          <DayStreakPanel darkThemeActive={darkThemeActive} />
        </Border>
      </DayStreak>

      <Gap></Gap>

      <Graph darkThemeActive={darkThemeActive}>
        <Border style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              backgroundColor: darkThemeActive
                ? ThemeStyles.lightThemePrimaryBackgroundColor
                : ThemeStyles.darkThemePrimaryBackgroundColor,
              width: "100%",
              borderRadius: "16px",
              height: "300px",
            }}
          >
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
          </div>
        </Border>
      </Graph>
    </Wrapper>
  );
}

export default DashboardStreakXPProgressView;

const Wrapper = styled.div`
  width: 100%;
`;

const Graph = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
  width: 100%;
  min-height: 300px;
  // border: 1px solid;

  @media (min-width: 640px) {
    width: 49%;
    min-height: 300px;
    margin-top: 10px;
  }
`;

const DayStreak = styled.div`
  margin-bottom: 10px;
  width: 100%;

  border-radius: 16px;
  min-height: 300px;

  @media (min-width: 640px) {
    // margin-left: 5px;
    width: 49%;
    margin-top: 10px;
    min-height: 300px;
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
