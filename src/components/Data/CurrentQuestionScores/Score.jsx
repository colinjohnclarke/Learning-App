import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import "animate.css";
import { colors } from "../../../styles/colors";
import correct from "../../../assets/correct.mp3";
import { useDispatch } from "react-redux";
import {
  updatePointsAvailable,
  updateUserScore,
  reverseUpdatePointsAvailable,
} from "../../../redux/CurrentBlockProgressData/currentblockprogressdata";
import { UserContext } from "../../../App";
import { ActionButtonContext } from "../../../pages/Main/OrderingItems/ActionButtonContext";

function Score({ scoreData, totalMarksAvailable }) {
  const [score, setScore] = useState(0);
  const [scoreStyle, setScoreStyle] = useState({});
  const [animateclass, setAnimateClass] = useState("");

  const { correctAnswerIsSelected, pointsScored } = scoreData;

  const { silentModeActive } = useContext(UserContext);
  const { setButtonState } = useContext(ActionButtonContext);

  const correctStyle = {
    backgroundColor: colors.correctColor,
    color: "white",
  };

  let isMultiplePointQuestion;

  if (totalMarksAvailable !== 1) {
    isMultiplePointQuestion = true;
  }
  // uodate total points available arr
  const dispatch = useDispatch();

  useEffect(() => {
    setButtonState((val) => ({
      ...val,
      value: "undefined",
    }));
    dispatch(updatePointsAvailable(totalMarksAvailable));
    return () => {
      dispatch(reverseUpdatePointsAvailable(totalMarksAvailable));
    };
  }, [totalMarksAvailable]);

  const [indexMarkUpdated, setIndexMarkUpdated] = useState(
    Array(totalMarksAvailable).fill(false)
  );

  let allCorrect = totalMarksAvailable === pointsScored;

  useEffect(() => {
    const handleCorrectAnswer = (isCorrect, updateMarkArrPosition) => {
      if (isCorrect) {
        // console.log(index);

        setScore((prevScore) => prevScore + 1);
        setButtonState((val) => ({
          ...val,
          value: "true",
        }));

        setAnimateClass("animate__animated animate__tada");
        setScoreStyle(correctStyle);
        dispatch(updateUserScore());

        // checks to see if correct sound has played for particular mark

        if (!indexMarkUpdated[updateMarkArrPosition]) {
          // if falsy

          if (silentModeActive) {
            new Audio(correct).play();
          }

          // set state value at that position to true so will not be played twice when function rerun
          setIndexMarkUpdated((prevState) => {
            const newState = [...prevState];
            newState[updateMarkArrPosition] = true;
            return newState;
          });
        }
      }
    };

    // if (index === 0) {
    if (totalMarksAvailable === 1) {
      handleCorrectAnswer(correctAnswerIsSelected, 0);
    } else if (totalMarksAvailable === 4) {
      handleCorrectAnswer(allCorrect, 0);
    }
  }, [correctAnswerIsSelected, pointsScored]);

  return (
    <Wrapper style={scoreStyle}>
      <Text
        className={animateclass}
        style={{ fontSize: "16px", fontWeight: "400", color: "white" }}
      >
        <sup
          style={{
            padding: "5px",
            color: "white",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          {isMultiplePointQuestion ? pointsScored : score}
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
          {totalMarksAvailable}
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
  background-color: rgba(0, 245, 245, 1);
  border-radius: 5px 5px 5px 40px;
  box-shadow: 0px 0px 20px 4px rgba(174, 196, 216, 0.25);
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(Score);
