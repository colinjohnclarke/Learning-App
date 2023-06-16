import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { device } from "../../styles/breakpoints";
import {
  correctAnswerSelectedIndex0,
  correctAnswerUNSelectedIndex0,
} from "../../features/slider/sliderquestiondataSliceIndex0";

import {
  correctAnswerSelectedIndex1,
  correctAnswerUNSelectedIndex1,
} from "../../features/slider/sliderquestiondataSliceIndex1";

import { useDispatch, useSelector } from "react-redux";

import {
  selectedbuttonstyle,
  correctstyle,
  incorrectstyle,
  normalboxstyle,
  normalboxstyleHover,
} from "../../styles/colors";

function SliderTextbox(props) {
  const text = props.text;
  const isCorrect = props.isCorrect;
  let isSelected = props.isSelected;

  const index = props.index;
  const dispatch = useDispatch();

  let index0currentSliderQuestionScore = useSelector(
    (state) => state.sliderquestiondataSliceIndex0reducer.value
  );

  let index1currentSliderQuestionScore = useSelector(
    (state) => state.sliderquestiondataSliceIndex1reducer.value
  );

  // slider index 0
  useEffect(() => {
    if (index === 0 && isSelected && isCorrect) {
      dispatch(correctAnswerSelectedIndex0());
    } else if (index === 0 && !isSelected && isCorrect) {
      dispatch(correctAnswerUNSelectedIndex0());
    }
  }, [isSelected]);

  let style;

  if (index === 0 && isSelected) {
    style = selectedbuttonstyle;
  } else if (index === 0 && !isSelected) {
    style = normalboxstyle;
  }
  let content;

  if (
    index === 0 &&
    index0currentSliderQuestionScore.length === 4 &&
    isCorrect
  ) {
    style = correctstyle;
    content = <TiTickOutline style={{ height: "10px", color: "green" }} />;
  } else if (
    index === 0 &&
    index0currentSliderQuestionScore.length === 4 &&
    !isCorrect
  ) {
    style = incorrectstyle;
    content = <RxCross2 style={{ height: "10px", color: "red" }} />;
  } else if (index === 0 && index0currentSliderQuestionScore.length !== 4) {
    content = <></>;
  }

  let styleindex1;

  // slider index 1
  useEffect(() => {
    if (index === 1 && isSelected && isCorrect) {
      dispatch(correctAnswerSelectedIndex1());
    } else if (index === 1 && !isSelected && isCorrect) {
      dispatch(correctAnswerUNSelectedIndex1());
    }
  }, [isSelected]);

  if (index === 1 && isSelected) {
    styleindex1 = selectedbuttonstyle;
  } else if (index === 1 && !isSelected) {
    styleindex1 = normalboxstyle;
  }

  if (
    index === 1 &&
    index1currentSliderQuestionScore.length === 4 &&
    isCorrect
  ) {
    styleindex1 = correctstyle;
    content = <TiTickOutline style={{ height: "10px", color: "green" }} />;
  } else if (
    index === 1 &&
    index1currentSliderQuestionScore.length === 4 &&
    !isCorrect
  ) {
    styleindex1 = incorrectstyle;
    content = <RxCross2 style={{ height: "10px", color: "red" }} />;
  } else if (index === 1 && index1currentSliderQuestionScore.length !== 4) {
    content = <></>;
  }

  return (
    <TextBox style={index === 0 ? style : styleindex1}>
      <Text>{text}</Text>

      <div>{content}</div>
    </TextBox>
  );
}

export default SliderTextbox;

const TextBox = styled.div`
  transition: 0.3s;
  text-align: center;
  box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px inset,
    0 0 0 2px rgba(0, 200, 200, 0.39) inset, 0 8px 0 0 rgba(39, 106, 245, 0.3),
    0 8px 0 1px rgba(39, 106, 245, 0.3), 0 8px 8px 1px rgba(39, 106, 245, 0.3),
    rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
    rgba(0, 0, 0, 0.2) 0px 5px 10px;

  margin-bottom: 10px;
  height: 80px;
  width: 100%;
  // margin: 2%;
  max-width: 700px;
  border-radius: 20px;
  background-color: white;
  padding: 2px;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.29);
  }
`;

const Text = styled.p`
  font-size: 15px;
  padding: 5px 10px 0px 5px;
`;

//   @media ${(device.mobileS, device.mobileM, device.mobileL)} {
//     width: 100%;
//     p {
//       font-size: 16px;
//     }

//   }

//   @media ${device.laptop} {
//     width: 70%;
//     p {
//       font-size: 17px;
//     }
// `;
