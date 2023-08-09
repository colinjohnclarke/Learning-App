import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { MCQcontext } from "../../MCQ/MCQContext";
import "animate.css";
import { colors, correctstyle } from "../../../styles/colors";
import correct from "../../../assets/correct.mp3";
import {
  updatePointsAvaiableArr,
  updateUserScore,
} from "../../../features/CurrentBlockProgressData/currentblockprogressdata";

import { useDispatch } from "react-redux";

function ScoreMCQ(props) {
  const totalMarksAvailable = props.totalMarksAvailable;

  const index = props.index;

  const [score, setScore] = useState(0);
  const [scoreStyle, setScoreStyle] = useState({});
  const [animateclass, setAnimateClass] = useState("");

  const {
    index0ItemClickedisCorrect,
    index1ItemClickedisCorrect,
    index0ItemClickedisInCorrect,
    index1ItemClickedisInCorrect,
  } = useContext(MCQcontext);

  const dispatch = useDispatch();

  let animateClass = "";

  const maxscore = 1;

  const playCorrectSound = () => {
    new Audio(correct).play();
  };

  let correctstyle = { backgroundColor: colors.correctColor };
  let incorrectstyle = { backgroundColor: colors.incorrectColor };

  // update total marks available in redux store

  useEffect(() => {
    dispatch(updatePointsAvaiableArr({ totalMarksAvailable }));
  }, []);

  useEffect(() => {
    if (index0ItemClickedisCorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setAnimateClass((val) => "animate__animated animate__tada");
      setScoreStyle((val) => correctstyle);

      // need to update action
      dispatch(updateUserScore());
    }
    return () => {
      if (index0ItemClickedisCorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index0ItemClickedisCorrect]);

  useEffect(() => {
    if (index1ItemClickedisCorrect && index === 1) {
      setScore((val) => val + 1);
      playCorrectSound();
      setAnimateClass((val) => "animate__animated animate__tada");
      setScoreStyle((val) => correctstyle);

      // need to update action
      dispatch(updateUserScore());

      ///
    }

    return () => {
      if (index1ItemClickedisCorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index1ItemClickedisCorrect]);

  // handle incorrect selection for index 0

  useEffect(() => {
    if (index0ItemClickedisInCorrect && index === 0) {
      // setScoreStyle((val) => incorrectstyle);
      setAnimateClass((val) => "animate__animated animate__headShake");
    }

    return () => {};
  }, [index0ItemClickedisInCorrect]);

  // handle incorrect selection for index 1

  useEffect(() => {
    if (index1ItemClickedisInCorrect && index === 1) {
      // setScoreStyle((val) => incorrectstyle);
      setAnimateClass((val) => "animate__animated animate__headShake");
    }

    return () => {};
  }, [index1ItemClickedisInCorrect]);

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

export default ScoreMCQ;

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
