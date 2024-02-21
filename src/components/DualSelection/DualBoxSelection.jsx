import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DualBox from "./DualBox";
import Score from "../Data/CurrentQuestionScores/Score";
import { device } from "../../styles/breakpoints";

function DualBoxSelection({ index, data, updateStateFunctions }) {
  const [resetselected, setResetSelected] = useState(false);

  const [num1a, setNum1a] = useState(null);
  const [num1b, setNum1b] = useState(null);
  const [num2a, setNum2a] = useState(null);
  const [num2b, setNum2b] = useState(null);
  const [num3a, setNum3a] = useState(null);
  const [num3b, setNum3b] = useState(null);
  const [num4a, setNum4a] = useState(null);
  const [num4b, setNum4b] = useState(null);

  const { correctAnswerIsSelected } = updateStateFunctions;

  useEffect(() => {
    setNum1a(Math.random());
    setNum1b(Math.random());
    setNum2a(Math.random());
    setNum2b(Math.random());
    setNum3a(Math.random());
    setNum3b(Math.random());
    setNum4a(Math.random());
    setNum4b(Math.random());
  }, []);

  const slider0leftIsCorrect = num1a > num1b ? true : false;
  const slider0rightIsCorrect = num1a < num1b ? true : false;

  const slider1leftIsCorrect = num2a > num2b ? true : false;
  const slider1rightIsCorrect = num2a < num2b ? true : false;

  const slider2leftIsCorrect = num3a > num3b ? true : false;
  const slider2rightIsCorrect = num3a < num3b ? true : false;

  const slider3leftIsCorrect = num4a > num4b ? true : false;
  const slider3rightIsCorrect = num4a < num4b ? true : false;

  const handleResetBtnSelected = () => {
    setResetSelected(!resetselected);
  };

  let displayBox1 = false;
  let displayBox2 = false;
  let displayBox3 = false;
  let displayBox4 = false;

  switch (data.number_of_pairs_entered) {
    case 4:
      displayBox4 = true;
      displayBox3 = true;
      displayBox2 = true;
      displayBox1 = true;
      break;
    case 3:
      displayBox3 = true;
      displayBox2 = true;
      displayBox1 = true;
      break;
    case 2:
      displayBox2 = true;
      displayBox1 = true;
      break;
    case 1:
      displayBox1 = true;
      break;
    default:
      break;
  }

  return (
    <Wrapper>
      <Question>{data.Question}</Question>
      <Score
        scoreData={{ correctAnswerIsSelected }}
        totalMarksAvailable={data.total_marks_available}
        index={index}
      ></Score>

      <Pair>
        <DualBox
          numberOfPairs={data.number_of_pairs_entered}
          updateStateFunctions={updateStateFunctions}
          boxnum={1}
          isAlgebra={data.isAlgebra}
          displayBox={displayBox1}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider0leftIsCorrect}
          sliderRightIsCorrect={slider0rightIsCorrect}
          textleft={
            slider0leftIsCorrect
              ? data.Statement_1_correct_option
              : data.Statement_1_incorrect_option
          }
          textright={
            slider0rightIsCorrect
              ? data.Statement_1_correct_option
              : data.Statement_1_incorrect_option
          }
        ></DualBox>
      </Pair>

      <Pair>
        <DualBox
          numberOfPairs={data.number_of_pairs_entered}
          updateStateFunctions={updateStateFunctions}
          boxnum={2}
          isAlgebra={data.isAlgebra}
          displayBox={displayBox2}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider1leftIsCorrect}
          sliderRightIsCorrect={slider1rightIsCorrect}
          textleft={
            slider1leftIsCorrect
              ? data.Statement_2_correct_option
              : data.Statement_2_incorrect_option
          }
          textright={
            slider1rightIsCorrect
              ? data.Statement_2_correct_option
              : data.Statement_2_incorrect_option
          }
        ></DualBox>
      </Pair>

      <Pair>
        <DualBox
          numberOfPairs={data.number_of_pairs_entered}
          updateStateFunctions={updateStateFunctions}
          boxnum={3}
          isAlgebra={data.isAlgebra}
          displayBox={displayBox3}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider2leftIsCorrect}
          sliderRightIsCorrect={slider2rightIsCorrect}
          textleft={
            slider2leftIsCorrect
              ? data.Statement_3_correct_option
              : data.Statement_3_incorrect_option
          }
          textright={
            slider2rightIsCorrect
              ? data.Statement_3_correct_option
              : data.Statement_3_incorrect_option
          }
        ></DualBox>
      </Pair>

      <Pair>
        <DualBox
          numberOfPairs={data.number_of_pairs_entered}
          updateStateFunctions={updateStateFunctions}
          boxnum={4}
          isAlgebra={data.isAlgebra}
          displayBox={displayBox4}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider3leftIsCorrect}
          sliderRightIsCorrect={slider3rightIsCorrect}
          textleft={
            slider3leftIsCorrect
              ? data.Statement_4_correct_option
              : data.Statement_4_incorrect_option
          }
          textright={
            slider3rightIsCorrect
              ? data.Statement_4_correct_option
              : data.Statement_4_incorrect_option
          }
        ></DualBox>
      </Pair>

      {/* <ResetBtn onClick={handleResetBtnSelected}>check</ResetBtn> */}
    </Wrapper>
  );
}

export default React.memo(DualBoxSelection);

const Pair = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;

  @media ${device.tablet} {
    box-shadow: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;
  position: relative;
  padding-top: 20px;
  padding-bottom: 0px;

  @media ${device.mobileL} {
    height: 100%;
  }
`;

const Question = styled.p`
  padding: 20px;
  font-weight: 400;
`;
