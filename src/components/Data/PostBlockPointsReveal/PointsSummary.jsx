import React, { useContext } from "react";
import styled from "styled-components";
import ExperiencePoints from "../ExperiencePoints/ExperiencePoints";
import PercentagePoints from "./PercentagePoints";
import BlockQuestionsCorrect from "./BlockQuestionsCorrect";
import "animate.css";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import ConfettiDashboard from "../../AnimatedEffects/ConfettiDashboard";
import AnimatedSuccessIcon from "../../../assets/animations/AnimatedSuccessIcon";
import NativatetoDashBoard from "../../Buttons/NativatetoDashBoard";
import SetDailyGoalBtn from "../../DayStreak/DailyGoal/SetDailyGoalBtn";
import NavigateToCourseDetails from "../../Buttons/NavigateToCourseDetails";

function PointsSummary() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <PointsReveal darkThemeActive={darkThemeActive}>
      <ConfettiDashboard style={{ zIndex: "200" }} />
      <AnimatedSuccessIcon />

      <div>
        <PercentagePoints></PercentagePoints>
        <BlockQuestionsCorrect></BlockQuestionsCorrect>
        <ExperiencePoints></ExperiencePoints>
      </div>

      <div>
        <NativatetoDashBoard></NativatetoDashBoard>
        <div style={{ height: "20px" }}></div>
        <NavigateToCourseDetails></NavigateToCourseDetails>
      </div>

      <SetDailyGoalBtn> </SetDailyGoalBtn>
    </PointsReveal>
  );
}

export default PointsSummary;

const PointsReveal = styled.div`
  z-index: 400;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;
