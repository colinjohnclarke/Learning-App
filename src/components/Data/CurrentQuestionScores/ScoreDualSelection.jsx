import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import "animate.css";
import { colors } from "../../../styles/colors";
import correct from "../../../assets/correct.mp3";
import { DualSelectionContext } from "../../DualSelection/DualSelectionContext";


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

  let animateClass = "";
  const maxscore = 1;

  const playCorrectSound = () => {
    new Audio(correct).play();
  };

  let correctstyle = { backgroundColor: colors.correctColor };
  let incorrectstyle = { backgroundColor: colors.incorrectColor };

  // uodate total points available arr
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePointsAvaiableArr({ totalMarksAvailable }));
  }, []);

  useEffect(() => {
    if (index0AnswerisCorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setAnimateClass((val) => "animate__animated animate__tada");
      setScoreStyle((val) => correctstyle);

      // update redux store with score
      dispatch(updateUserScore());
    }
    return () => {
      if (index0AnswerisCorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index0AnswerisCorrect]);

  useEffect(() => {
    if (index1AnswerisCorrect && index === 1) {
      setScore((val) => val + 1);
      playCorrectSound();
      setAnimateClass((val) => "animate__animated animate__tada");
      setScoreStyle((val) => correctstyle);
      dispatch(updateUserScore());
    }

    return () => {
      if (index1AnswerisCorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index1AnswerisCorrect]);

  return (
    <Wrapper style={scoreStyle}>
      <Text
        className={animateclass}
        style={{ fontSize: "16px", fontWeight: "400" }}
      >
        <sup style={{ padding: "4px" }}>{score}</sup> &#8260;
        <sub style={{ padding: "4px" }}>{maxscore}</sub>
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
