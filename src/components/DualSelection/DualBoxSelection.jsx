import React, { useState, useContext } from "react";
import styled from "styled-components";
import DualBox from "./DualBox";
import ResetBtn from "../Buttons/ResetBtn";
import Score from "../Data/CurrentQuestionScores/Score";
import { device } from "../../styles/breakpoints";
import { DualSelectionContext } from "./DualSelectionContext";
import { useSelector } from "react-redux";

function DualBoxSelection({ index, data }) {
  const [resetselected, setResetSelected] = useState(false);

  //not using context here to identify if correct score as causes re render when update function is used, use redux store instead
  // let index0currentSliderQuestionScore = useSelector(
  //   (state) => state.sliderquestiondataSliceIndex0reducer.value
  // );

  // let index0AnswerisCorrect = false;
  // let index1AnswerisCorrect = false;
  // if (index0currentSliderQuestionScore.length === 4) {
  //   index0AnswerisCorrect = true;
  // }

  const {
    index0AnswerisCorrect,
    setIndex0AnswerisCorrect,
    index1AnswerisCorrect,
    setIndex1AnswerisCorrect,
  } = useContext(DualSelectionContext);

  const totalMarksAvailable = data.total_marks_available;

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

  // <NumWrapper>
  //   {list.map((item, index) => {
  //     return <NumBorder>{<Num>{index + 1}</Num>}</NumBorder>;
  //   })}
  // </NumWrapper>;

  return (
    <Wrapper>
      <Question>{data.Question}</Question>

      <Score
        scoreData={{ index0AnswerisCorrect, index1AnswerisCorrect }}
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></Score>

      <Pair>
        <DualBox
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

  @media ${device.mobileL} {
    height: 100%;
  }
`;

const Question = styled.p`
  padding: 20px;
  font-weight: 400;
`;
