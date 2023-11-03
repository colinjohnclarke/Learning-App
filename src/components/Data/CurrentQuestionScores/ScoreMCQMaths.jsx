import React, { useEffect } from "react";
import styled from "styled-components";
import "animate.css";
import { colors, correctstyle } from "../../../styles/colors";
import correct from "../../../assets/correct.mp3";
import {
  updatePointsAvaiableArr,
  updateUserScore,
} from "../../../features/CurrentBlockProgressData/currentblockprogressdata";

import { useDispatch, useSelector } from "react-redux";

function ScoreMCQMaths(props) {
  const totalMarksAvailable = props.totalMarksAvailable;
  const index = props.index;


  const index0SelectionCorrect = useSelector(
    (state) => state.mathsMCQSlice.index0CorrectAnswerSelected
  );

  const index1SelectionCorrect = useSelector(
    (state) => state.mathsMCQSlice.index1CorrectAnswerSelected
  );

  const index0SelectionINcorrect = useSelector(
    (state) => state.mathsMCQSlice.index0INCorrectAnswerSelected
  );

  const index1SelectionINcorrect = useSelector(
    (state) => state.mathsMCQSlice.index1INCorrectAnswerSelected
  );

  let score = 0;

  let scoreStyle = {};
  let animateClass = "";
  const dispatch = useDispatch();
  const maxscore = 1;

  let correctstyle = { backgroundColor: colors.correctColor, color: "white" };
  let incorrectstyle = { backgroundColor: colors.incorrectColor };

  // update total marks available in redux store

  dispatch(updatePointsAvaiableArr({ totalMarksAvailable }));

  let index0SoundPlayed = false;
  let index1SoundPlayed = false;

  if (index0SelectionCorrect && index === 0 && index0SoundPlayed === false) {
    index0SoundPlayed = true;
    score++;
    animateClass = "animate__animated animate__tada";
    scoreStyle = correctstyle;
    dispatch(updateUserScore());
  } else if (
    index1SelectionCorrect &&
    index === 1 &&
    index1SoundPlayed === false
  ) {
    index1SoundPlayed = true;
    score++;
    animateClass = "animate__animated animate__tada";
    scoreStyle = correctstyle;
    dispatch(updateUserScore());
  }

  useEffect(() => {
    if (index0SelectionCorrect && index === 0) {
      new Audio(correct).play();
      // dispatch(updateUserScore());
    }
  }, [index0SelectionCorrect]);

  useEffect(() => {
    if (index1SelectionCorrect && index === 1) {
      new Audio(correct).play();
      // dispatch(updateUserScore());
    }
  }, [index1SelectionCorrect]);

  // handle incorrect selection for index 0

  if (index0SelectionINcorrect && index === 0) {
    animateClass = "animate__animated animate__headShake";
  }

  // handle incorrect selection for index 1

  if (index1SelectionINcorrect && index === 1) {
    animateClass = "animate__animated animate__headShake";
  }

  return (
    <Wrapper style={scoreStyle}>
      <Text
        className={animateClass}
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: "white",
        }}
      >
        <sup
          style={{
            padding: "5px",
            color: "white",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          {score}
        </sup>{" "}
        &#8260;
        <sub
          style={{
            padding: "5px",
            color: "white",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          {maxscore}
        </sub>
      </Text>
    </Wrapper>
  );
}

export default ScoreMCQMaths;

const Wrapper = styled.div`
  min-width: 50px;
  min-height: 50px;
  height: 5vw;
  width: 5vw;
  max-height: 40px;
  max-width: 40px;
  position: absolute;
  z-index: 10;
  top: 0px;
  right: 0px;
  background-color: rgba(0, 200, 200, 0.29);
  border-radius: 0px 0px 0px 40px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;
