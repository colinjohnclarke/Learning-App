import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import "animate.css";
import { colors } from "../../../styles/colors";
import correct from "../../../assets/correct.mp3";
import { DragandDropContext } from "../../Drag&Drop/DragandDropContext";
import { useDispatch } from "react-redux";
import {
  updatePointsAvaiableArr,
  updateUserScore,
} from "../../../features/CurrentBlockProgressData/currentblockprogressdata";

function Score({ index, scoreData, totalMarksAvailable }) {
  const [score, setScore] = useState(0);
  const [scoreStyle, setScoreStyle] = useState({});
  const [animateclass, setAnimateClass] = useState("");

  const {
    index0AnswerisCorrect,
    index1AnswerisCorrect,
    additionalMark1,
    additionalMark2,
  } = scoreData;
  // console.log("🚀 ~ file: Score.jsx:24 ~ Score ~ scoreData:", scoreData);

  const correctStyle = {
    backgroundColor: colors.correctColor,
    color: "white",
  };

  // uodate total points available arr
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePointsAvaiableArr({ totalMarksAvailable }));
  }, []);

  const [indexMarkUpdated, setIndexMarkUpdated] = useState(
    Array(totalMarksAvailable).fill(false)
  );
  console.log(
    "🚀 ~ file: Score.jsx:41 ~ Score ~ indexMarkUpdated:",
    indexMarkUpdated
  );

  useEffect(() => {
    const handleCorrectAnswer = (isCorrect, updateMarkArrPosition) => {
      console.log("indexMarkUpdated", indexMarkUpdated);
      if (isCorrect) {
        // console.log(index);
        setScore((prevScore) => prevScore + 1);
        setAnimateClass("animate__animated animate__tada");
        setScoreStyle(correctStyle);
        dispatch(updateUserScore());

        // checks to see if correct sound has played for particular mark

        if (!indexMarkUpdated[updateMarkArrPosition]) {
          // if falsy
          // new Audio(correct).play();

          // set state value at that position to true so will not be played twice when function rerun
          setIndexMarkUpdated((prevState) => {
            const newState = [...prevState];
            newState[updateMarkArrPosition] = true;
            return newState;
          });
        }
      }
    };

    if (index === 0) {
      if (totalMarksAvailable === 1) {
        handleCorrectAnswer(index0AnswerisCorrect, 0);
        // components which have more that one mark per question handled here, Although index is same as we have had to name the value as index 1 to prevent making a new score component for question with Score data higher than 1
      } else if (totalMarksAvailable === 4) {
        if (!indexMarkUpdated[0]) {
          // check to see if sound played as a log of correct mark assigned, pass the expeected position in indexMarkUpdated array
          handleCorrectAnswer(index0AnswerisCorrect, 0);
          console.log("check1");
        } else if (!indexMarkUpdated[1]) {
          handleCorrectAnswer(index1AnswerisCorrect, 1);
          console.log("check2");
        } else if (!indexMarkUpdated[2]) {
          handleCorrectAnswer(additionalMark1, 2);
          console.log("check3");
        } else if (!indexMarkUpdated[3]) {
          handleCorrectAnswer(additionalMark2, 3);
          console.log("check4");
        }
      }
    } else if (index === 1) {
      if (totalMarksAvailable === 1) {
        handleCorrectAnswer(index1AnswerisCorrect, 1);
      }
    } else if (index === 3) {
      if (totalMarksAvailable === 1) {
        handleCorrectAnswer(index1AnswerisCorrect, 2);
      }
    }

    // return () => {
    //   if (index0AnswerisCorrect || index1AnswerisCorrect) {
    //     setScore(0);
    //     setScoreStyle({});
    //     setIndexMarkUpdated((prevState) => {
    //       const newState = [...prevState];
    //       newState[0] = false;
    //       newState[1] = false;
    //       newState[2] = false;
    //       newState[3] = false;
    //       return newState;
    //     });
    //   }
    // };
  }, [
    index0AnswerisCorrect,
    index1AnswerisCorrect,
    additionalMark1,
    additionalMark2,
  ]);

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

export default Score;
