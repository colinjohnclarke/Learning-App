import React, { useState } from "react";
import styled from "styled-components";
import { memo } from "react";
import { device } from "../../styles/breakpoints";
import DualBox from "./DualBox";
import { useSelector } from "react-redux";
import ResetBtn from "../Buttons/ResetBtn";
import Score from "../scores/Score";

function DualBoxSelection(props) {
  const [resetselected, setResetSelected] = useState(false);

  const sliderData = props.data;

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

  return (
    <Wrapper>
      <Score></Score>
      {/* <p>{sliderData.question}</p> */}
      {/* <p>{index0currentSliderQuestionScore}</p> */}
      <DualBox
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

      <DualBox
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
      <DualBox
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
      <DualBox
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

      <ResetBtn onClick={handleResetBtnSelected}>check</ResetBtn>
    </Wrapper>
  );
}

export default DualBoxSelection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  text-align: center;
  position: relative;
  padding-top: 40px;
`;
