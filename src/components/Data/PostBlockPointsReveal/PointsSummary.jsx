import React, { useContext } from "react";
import styled from "styled-components";
import ExperiencePoints from "../ExperiencePoints/ExperiencePoints";
import PercentagePoints from "./PercentagePoints";
import BlockQuestionsCorrect from "./BlockQuestionsCorrect";
import "animate.css";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import ConfettiDashboard from "../../Effects/ConfettiDashboard";

function PointsSummary() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <PointsReveal darkThemeActive={darkThemeActive}>
      <ConfettiDashboard />
      <PercentagePoints></PercentagePoints>
      <BlockQuestionsCorrect></BlockQuestionsCorrect>
      <ExperiencePoints></ExperiencePoints>
      {/* <SetGoalBtn> Set Goal</SetGoalBtn> */}
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
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;
