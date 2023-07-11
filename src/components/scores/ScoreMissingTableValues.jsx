import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import "animate.css";
import { colors, correctstyle } from "../../styles/colors";
import correct from "../../assets/correct.mp3";
import { TableFillMissingValuesContext } from "../Tables/MissingData/FillMissingValuesContext";
import { fontWeight } from "@mui/system";

function ScoreMissingTableValues(props) {
  const index = props.index;

  const [score, setScore] = useState(0);
  const [scoreStyle, setScoreStyle] = useState({});
  const [animateclass, setAnimateClass] = useState("");

  //   const { index0answeriscorrect, index1AnswerisCorrect } =
  //     useContext(GapFillContext);

  const {
    index0AnswerisCorrect,
    setindex0AnswerisCorrect,
    index0AnswerisInCorrect,
    setindex0AnswerisInCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
    index1AnswerisInCorrect,
    setindex1AnswerisInCorrect,
  } = useContext(TableFillMissingValuesContext);

  let animateClass = "";
  const maxscore = 1;

  const playCorrectSound = () => {
    new Audio(correct).play();
  };

  useEffect(() => {
    if (index0AnswerisCorrect && index === 0) {
      setScore((val) => val + 1);
      playCorrectSound();
      setAnimateClass((val) => "animate__animated animate__tada");
      setScoreStyle((val) => correctstyle);
    }
    return () => {
      if (index0AnswerisCorrect) {
        setScore((val) => 0);
      }
    };
  }, [index0AnswerisCorrect]);

  useEffect(() => {
    if (index1AnswerisCorrect && index === 1) {
      setScore((val) => val + 1);
      playCorrectSound();
      setAnimateClass((val) => "animate__animated animate__tada");
      setScoreStyle((val) => correctstyle);
    }

    return () => {
      if (index1AnswerisCorrect) {
        setScore((val) => 0);
      }
    };
  }, [index1AnswerisCorrect]);

  return (
    <Wrapper style={scoreStyle}>
      <Text
        className={animateclass}
        style={{ color: "white", fontWeight: "600" }}
      >
        <sup style={{ padding: "4px", color: "white", fontWeight: "600" }}>
          {score}
        </sup>{" "}
        &#8260;
        <sub style={{ padding: "4px", color: "white", fontWeight: "600" }}>
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
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ScoreMissingTableValues;
