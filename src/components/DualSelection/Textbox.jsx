import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { device } from "../../styles/breakpoints";
import MathsMLfromString from "../../config/sanity/MathsMLfromString";
import "animate.css";
import {
  correctAnswerSelectedIndex0,
  correctAnswerUNSelectedIndex0,
} from "../../features/DualSelection/dualselectionquestiondataSliceIndex0";

import { useDispatch, useSelector } from "react-redux";
import { DualSelectionContext } from "./DualSelectionContext";

import {
  selectedbuttonstyle,
  correctstyle,
  incorrectstyle,
  normalboxstyle,
  normalboxstyleHover,
} from "../../styles/colors";

function Textbox({ text, isCorrect, isSelected, index, isAlgebra }) {
  const dispatch = useDispatch();

  let index0currentSliderQuestionScore = useSelector(
    (state) => state.sliderquestiondataSliceIndex0reducer.value
  );

  // context value functions to update score component

  const { setIndex0AnswerisCorrect } = useContext(DualSelectionContext);

  // slider index 0
  useEffect(() => {
    if (index === 0 && isSelected && isCorrect) {
      dispatch(correctAnswerSelectedIndex0());
    } else if (index === 0 && !isSelected && isCorrect) {
      dispatch(correctAnswerUNSelectedIndex0());
    }
  }, [isSelected]);

  useEffect(() => {
    if (index0currentSliderQuestionScore.length === 4) {
      // set context value to true to update score component, this needs to be in use Effect or we get a set state error
      setIndex0AnswerisCorrect((val) => true);
    }

    return () => {
      setIndex0AnswerisCorrect((val) => false);
    };
  }, [index0currentSliderQuestionScore.length]);

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

    content = <></>;

    // <TiTickOutline style={{ height: "10px", color: "white" }} />;
  } else if (
    index === 0 &&
    index0currentSliderQuestionScore.length === 4 &&
    !isCorrect
  ) {
    style = incorrectstyle;

    content = <></>;

    // <RxCross2 style={{ height: "10px", color: "white" }} />;
  } else if (index === 0 && index0currentSliderQuestionScore.length !== 4) {
    content = <></>;
  }

  let styleindex1 = {
    color: "",
  };

  // useEffect(() => {
  //   if (index1currentSliderQuestionScore.length === 4)
  //     // set context value to true to update score component, this needs to be in use Effect or we get a set state error
  //     setIndex1AnswerisCorrect((val) => true);

  //   return () => {
  //     setIndex1AnswerisCorrect((val) => false);
  //   };
  // }, [isSelected]);

  // // slider index 1
  // useEffect(() => {
  //   if (index === 1 && isSelected && isCorrect) {
  //     dispatch(correctAnswerSelectedIndex1());
  //   } else if (index === 1 && !isSelected && isCorrect) {
  //     dispatch(correctAnswerUNSelectedIndex1());
  //   }
  // }, [isSelected]);

  // if (index === 1 && isSelected) {
  //   styleindex1 = selectedbuttonstyle;
  // } else if (index === 1 && !isSelected) {
  //   styleindex1 = normalboxstyle;
  // }

  // if (
  //   index === 1 &&
  //   index1currentSliderQuestionScore.length === 4 &&
  //   isCorrect
  // ) {
  //   styleindex1 = correctstyle;
  //   content = <TiTickOutline style={{ height: "10px", color: "green" }} />;
  // } else if (
  //   index === 1 &&
  //   index1currentSliderQuestionScore.length === 4 &&
  //   !isCorrect
  // ) {
  //   styleindex1 = incorrectstyle;
  //   content = <RxCross2 style={{ height: "10px", color: "red" }} />;
  // } else if (index === 1 && index1currentSliderQuestionScore.length !== 4) {
  //   content = <></>;
  // }

  const whiteText = {
    color: "white",
  };

  const normalText = {
    color: "",
  };

  return (
    <Box
      className={
        index0currentSliderQuestionScore.length === 4 && isCorrect
          ? "animate__animated animate__bounce"
          : "animate__animated"
      }
      style={style}
    >
      {!isAlgebra ? (
        <Text
          style={
            index0currentSliderQuestionScore.length === 4 || isSelected
              ? whiteText
              : normalText
          }
        >
          {text}
        </Text>
      ) : (
        <MathsMLfromString data={text}></MathsMLfromString>
      )}

      {content}
    </Box>
  );
}

export default Textbox;

const Box = styled.p`
  transition: 0.3s;
  text-align: center;
  box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px inset,
    0 0 0 2px rgba(0, 200, 200, 0.39) inset, 0 8px 0 0 rgba(39, 106, 245, 0.3),
    0 8px 0 1px rgba(39, 106, 245, 0.3), 0 8px 8px 1px rgba(39, 106, 245, 0.3),
    rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
    rgba(0, 0, 0, 0.2) 0px 5px 10px;

  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 700px;
  border-radius: 20px;

  &:hover {
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
