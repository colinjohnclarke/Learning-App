import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import "animate.css";
import { colors } from "../../../styles/colors";
import correct from "../../../assets/correct.mp3";
import { IncorrectWordContext } from "../../IncorrectWordIdentifier/IncorrectWordContext";

import {
  updatePointsAvaiableArr,
  updateUserScore,
} from "../../../features/CurrentBlockProgressData/currentblockprogressdata";

import { useDispatch } from "react-redux";

function ScoreInCorrectWord(props) {
  const index = props.index;
  const totalMarksAvailable = props.totalMarksAvailable;
  const [score, setScore] = useState(0);
  const [scoreStyle, setScoreStyle] = useState({});
  const [animateclass, setAnimateClass] = useState("");
  const [allcorrect, setAllCorrect] = useState(false);

  const {
    index0word1selectioncorrect,
    setindex0Word1SelectionCorrect,
    index0mcq1selectioncorrect,
    setindex0MCQ1SelectionCorrect,
    index0mcq1selectionIncorrect,
    index0setMCQ1SelectionInCorrect,
    index0word2selectioncorrect,
    setindex0Word2SelectionCorrect,
    index0mcq2selectioncorrect,
    setindex0MCQ2SelectionCorrect,
    index0mcq2selectionIncorrect,
    setindex0MCQ2SelectionInCorrect,
  } = useContext(IncorrectWordContext);

  let animateClass = "";
  const maxscore = 4;

  const playCorrectSound = () => {
    new Audio(correct).play();
  };

  let correctStyle = {
    backgroundColor: colors.correctColor,
    color: "white",
  };

  let someCorrect = { backgroundColor: colors.someCorrectColor };
  // let correctstyles = correctStyle;

  // uodate total points available arr
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updatePointsAvaiableArr({ totalMarksAvailable }));
  }, []);

  // update score based on incorrect words correctly clicked

  // word 1

  useEffect(() => {
    if (index0word1selectioncorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setScoreStyle((val) => someCorrect);
      setAnimateClass((val) => "animate__animated animate__tada");
      dispatch(updateUserScore());
      setTimeout(() => {
        setAnimateClass((val) => "");
      }, 500);
    }
    return () => {
      if (index0word1selectioncorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index0word1selectioncorrect]);

  // word 1
  useEffect(() => {
    if (index0word2selectioncorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setScoreStyle((val) => someCorrect);
      setAnimateClass((val) => "animate__animated animate__tada");
      dispatch(updateUserScore());

      setTimeout(() => {
        setAnimateClass((val) => "");
      }, 500);
    }
    return () => {
      if (index0word2selectioncorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index0word2selectioncorrect]);

  // update score based on correct answers selected for

  // MCQ1

  useEffect(() => {
    if (index0mcq1selectioncorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setScoreStyle((val) => someCorrect);
      setAnimateClass((val) => "animate__animated animate__tada");
      dispatch(updateUserScore());

      setTimeout(() => {
        setAnimateClass((val) => "");
      }, 500);

    
    }
    return () => {
      if (index0mcq1selectioncorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index0mcq1selectioncorrect]);

  // MCQ2
  useEffect(() => {
    if (index0mcq2selectioncorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setScoreStyle((val) => someCorrect);
      setAnimateClass((val) => "animate__animated animate__tada");
      dispatch(updateUserScore());

      setTimeout(() => {
        setAnimateClass((val) => "");
      }, 500);

    
    }
    return () => {
      if (index0mcq1selectioncorrect) {
        setScore((val) => val - 1);
      }
    };
  }, [index0mcq2selectioncorrect]);

  useEffect(() => {
    if (
      index0word1selectioncorrect &&
      index0word2selectioncorrect &&
      index0mcq2selectioncorrect &&
      index0mcq1selectioncorrect
    )
      setScoreStyle((val) => correctStyle);
  }, [
    index0word1selectioncorrect,
    index0word2selectioncorrect,
    index0mcq2selectioncorrect,
    index0mcq1selectioncorrect,
  ]);

  //   useEffect(() => {
  //     if (index1AnswerisCorrect && index === 1) {
  //       setScore((val) => val + 1);
  //       playCorrectSound();
  //       setAnimateClass((val) => "animate__animated animate__tada");
  //       setScoreStyle((val) => correctStyle);
  //     }

  //     return () => {
  //       if (index1AnswerisCorrect) {
  //         setScore((val) => val - 1);
  //       }
  //     };
  //   }, [index1AnswerisCorrect]);

  return (
    <Wrapper style={scoreStyle}>
      <Text
        className={animateclass}
        style={{
          fontSize: "16px",
          fontWeight: "400",
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

export default ScoreInCorrectWord;
