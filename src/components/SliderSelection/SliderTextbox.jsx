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
    (state) => state.sliderquestiondataSliceIndex0reducer.value
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
    index0currentSliderQuestionScore.length === 4 &&
    !isCorrect
  ) {
    styleindex1 = incorrectstyle;
    content = <RxCross2 style={{ height: "10px", color: "red" }} />;
  } else if (index === 1 && index1currentSliderQuestionScore.length !== 4) {
    content = <></>;
  }

  // const hoverStyleFn = () => {
  //   style = normalboxstyleHover;
  //   console.log("   mouse over style = normalboxstyleHover;");
  // };

  // const stophoverFn = () => {
  //   style = normalboxstyle;
  //   console.log("   mouse LEAVE style = normalboxstyleHover;");
  // };

  return (
    <TextBox
      // onMouseOver={hoverStyleFn}
      // onMouseLeave={stophoverFn}
      style={index === 0 ? style : styleindex1}
    >
      <Text>{text}</Text>
      <div>{content}</div>
    </TextBox>
  );
}

export default SliderTextbox;

const TextBox = styled.div`
  height: 100%;
  width: 100%;
`;

const Text = styled.p`
  font-size: 13px;
  padding: 5px;
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
