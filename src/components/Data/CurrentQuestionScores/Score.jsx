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

  // points scored required for components where there is more than one point to be scored
  const { correctAnswerIsSelected, pointsScored } = scoreData;
  console.log("🚀 ~ pointsScored:", pointsScored);

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

  useEffect(() => {
    if (correctAnswerIsSelected || pointsScored > 0) {
      setScore((prevScore) => prevScore + 1);
      setButtonState((val) => ({
        ...val,
        value: "true",
      }));

      setAnimateClass("animate__animated animate__tada");
      setScoreStyle(correctStyle);
      dispatch(updateUserScore());

      if (silentModeActive) {
        new Audio(correct).play();
      }
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
  border-radius: 0px 16px 0px 40px;
  box-shadow: 0px 0px 20px 4px rgba(174, 196, 216, 0.25);
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default React.memo(Score);
