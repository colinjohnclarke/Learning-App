import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import "animate.css";
import { colors } from "../../../styles/colors";
import correct from "../../../assets/correct.mp3";
import { DualSelectionContext } from "../../DualSelection/DualSelectionContext";
import { useSelector } from "react-redux";

import {
  updatePointsAvaiableArr,
  updateUserScore,
} from "../../../features/CurrentBlockProgressData/currentblockprogressdata";

import { useDispatch } from "react-redux";

function ScoreDualSelection(props) {
  const index = props.index;
  const totalMarksAvailable = props.totalMarksAvailable;

  const [score, setScore] = useState(0);
  const [scoreStyle, setScoreStyle] = useState({});
  const [animateclass, setAnimateClass] = useState("");

  const { index0AnswerisCorrect, index1AnswerisCorrect } =
    useContext(DualSelectionContext);

  //not using context here to identify if correct score as causes re render when update function is used, use redux store instead
  let index0currentSliderQuestionScore = useSelector(
    (state) => state.sliderquestiondataSliceIndex0reducer.value
  );

  let index0IsCorrect = false;
  if (index0currentSliderQuestionScore.length === 4) {
    index0IsCorrect = true;
  }

  let animateClass = "";
  const maxscore = 1;

  const playCorrectSound = () => {
    new Audio(correct).play();
  };

  let correctstyle = { backgroundColor: colors.correctColor, color: "white" };
  let incorrectstyle = { backgroundColor: colors.incorrectColor };

  // uodate total points available arr
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePointsAvaiableArr({ totalMarksAvailable }));
  }, []);

  useEffect(() => {
    if (index0IsCorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setAnimateClass((val) => "animate__animated animate__tada");
      setScoreStyle((val) => correctstyle);

      // update redux store with score
      dispatch(updateUserScore());
    }
    return () => {
      if (index0IsCorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index0IsCorrect]);

  // useEffect(() => {
  //   if (index1IsCorrect && index === 1) {
  //     setScore((val) => val + 1);
  //     playCorrectSound();
  //     setAnimateClass((val) => "animate__animated animate__tada");
  //     setScoreStyle((val) => correctstyle);
  //     dispatch(updateUserScore());
  //   }

  //   return () => {
  //     if (index1IsCorrect) {
  //       setScore((val) => val - 1);
  //     }
  //   };
  // }, [index1IsCorrect]);

  return (
    <Wrapper style={scoreStyle}>
      <Text
        className={animateclass}
        style={{ fontSize: "16px", fontWeight: "500", color: "white" }}
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
    rgba(0, 0, 0, 0.3) 0px 1px 3px;
`;

const Text = styled.p`
  display: flex;

  justify-content: center;
  align-items: center;
`;

export default ScoreDualSelection;
