import React, { useState } from "react";
import styled from "styled-components";
import DualBox from "./DualBox";
import ResetBtn from "../Buttons/ResetBtn";
import ScoreDualSelection from "../Data/CurrentQuestionScores/ScoreDualSelection";
import { device } from "../../styles/breakpoints";

function DualBoxSelection(props) {
  const [resetselected, setResetSelected] = useState(false);

  const sliderData = props.data;

  const totalMarksAvailable = sliderData.total_marks_available;

  const index = props.index;
  const num1a = Math.random();
  const num1b = Math.random();
  const num2a = Math.random();
  const num2b = Math.random();
  const num3a = Math.random();
  const num3b = Math.random();
  const num4a = Math.random();
  const num4b = Math.random();

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

  switch (sliderData.number_of_pairs_entered) {
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

  // <NumWrapper>
  //   {list.map((item, index) => {
  //     return <NumBorder>{<Num>{index + 1}</Num>}</NumBorder>;
  //   })}
  // </NumWrapper>;

  return (
    <Wrapper>
      <Question>{sliderData.Question}</Question>

      <ScoreDualSelection
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></ScoreDualSelection>

      <Pair>
        <DualBox
          boxnum={1}
          displayBox={displayBox1}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider0leftIsCorrect}
          sliderRightIsCorrect={slider0rightIsCorrect}
          textleft={
            slider0leftIsCorrect
              ? sliderData.Statement_1_correct_option
              : sliderData.Statement_1_incorrect_option
          }
          textright={
            slider0rightIsCorrect
              ? sliderData.Statement_1_correct_option
              : sliderData.Statement_1_incorrect_option
          }
        ></DualBox>
      </Pair>

      <Pair>
        <DualBox
          boxnum={2}
          displayBox={displayBox2}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider1leftIsCorrect}
          sliderRightIsCorrect={slider1rightIsCorrect}
          textleft={
            slider1leftIsCorrect
              ? sliderData.Statement_2_correct_option
              : sliderData.Statement_2_incorrect_option
          }
          textright={
            slider1rightIsCorrect
              ? sliderData.Statement_2_correct_option
              : sliderData.Statement_2_incorrect_option
          }
        ></DualBox>
      </Pair>

      <Pair>
        <DualBox
          boxnum={3}
          displayBox={displayBox3}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider2leftIsCorrect}
          sliderRightIsCorrect={slider2rightIsCorrect}
          textleft={
            slider2leftIsCorrect
              ? sliderData.Statement_3_correct_option
              : sliderData.Statement_3_incorrect_option
          }
          textright={
            slider2rightIsCorrect
              ? sliderData.Statement_3_correct_option
              : sliderData.Statement_3_incorrect_option
          }
        ></DualBox>
      </Pair>

      <Pair>
        <DualBox
          boxnum={4}
          displayBox={displayBox4}
          resetselected={resetselected}
          index={index}
          sliderLeftIsCorrect={slider3leftIsCorrect}
          sliderRightIsCorrect={slider3rightIsCorrect}
          textleft={
            slider3leftIsCorrect
              ? sliderData.Statement_4_correct_option
              : sliderData.Statement_4_incorrect_option
          }
          textright={
            slider3rightIsCorrect
              ? sliderData.Statement_4_correct_option
              : sliderData.Statement_4_incorrect_option
          }
        ></DualBox>
      </Pair>

      {/* <ResetBtn onClick={handleResetBtnSelected}>check</ResetBtn> */}
    </Wrapper>
  );
}

export default DualBoxSelection;

const Pair = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  box-shadow: rgba(0, 200, 200, 1) 0px 2px 5px -1px;
  rgba(0, 200, 200, 1) 0px 1px 3px -1px;

  @media ${device.tablet} {
    box-shadow: none; 


  }
`;

const Wrapper = styled.div`
  border-top: 0.5px solid lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;
  position: relative;
  padding-top: 20px;
  padding-bottom: 0px;
`;

const Question = styled.p`
  padding: 20px;
  font-weight: 400;
`;
