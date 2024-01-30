import React, { useContext } from "react";
import DailyGoal from "./DailyGoal/DailyGoal";
import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import DayStreakPanel from "./DayStreakPanel";
import { device } from "../../styles/breakpoints";

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
      <Graph darkThemeActive={darkThemeActive}>
        <h2
          style={{
            fontSize: "15px",
            color: darkThemeActive
              ? ThemeStyles.lightThemePrimaryFrontColor
              : ThemeStyles.darkThemePrimaryFontColor,
          }}
        >
          Daily Progress
        </h2>
        <DailyGoal />
      </Graph>
      <Gap></Gap>

      <DayStreak darkThemeActive={darkThemeActive}>
        <DayStreakPanel />
      </DayStreak>
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

  @media ${device.mobileL} {
    // margin-right: 5px;
    width: 49%;
  }
`;

const DayStreak = styled.div`
  margin-top: 10px;
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

  @media ${device.mobileL} {
    // margin-left: 5px;
    width: 49%;
    margin-top: 0px;
  }
`;

const Gap = styled.div`
  display: none;
  @media ${device.mobileL} {
    display: block;
    width: 2%;
    max-width: 20px;
  }
`;
