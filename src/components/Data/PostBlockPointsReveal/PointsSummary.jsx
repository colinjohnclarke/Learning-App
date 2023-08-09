import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ContinueBtn from "../../Buttons/ContinueBtn";
import ExperiencePoints from "../ExperiencePoints/ExperiencePoints";
import SetGoalBtn from "../../Buttons/SetGoalBtn";

import PercentagePoints from "./PercentagePoints";
import BlockQuestionsCorrect from "./BlockQuestionsCorrect";
import AnimatedBlockScore from "../CurrentBlockScores/AnimatedBlockScore";
import "animate.css";

function PointsSummary() {
  return (
    <PointsReveal>
      <PercentagePoints></PercentagePoints>
      <BlockQuestionsCorrect></BlockQuestionsCorrect>
      <ExperiencePoints></ExperiencePoints>
      <SetGoalBtn> Set Goal</SetGoalBtn>
    </PointsReveal>
  );
}

export default PointsSummary;

const PointsReveal = styled.div`
  z-index: 400;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
