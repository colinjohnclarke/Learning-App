import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { correctstyle } from "../../styles/colors";
import MathsMLfromString from "../../config/sanity/MathsMLfromString";
import {
  setslider0correct,
  setslider1correct,
  setslider2correct,
  setslider3correct,
  setslider0Incorrect,
  setslider1Incorrect,
  setslider2Incorrect,
  setslider3Incorrect,
} from "../../features/Slider/sliderindex0slice";

function Slider({
  isAlgebra,
  slidersRandom,
  initialBoolSlider,
  position,
  allcorrect,
  sliderLeftIsCorrect,
  sliderRightIsCorrect,
  textleft,
  textright,
  displaySlider,
}) {
  const [rightisselected, setRightisSelected] = useState(initialBoolSlider);
  const [leftisselected, setLeftisSelected] = useState(!initialBoolSlider);

  const generalStyle = {};
  const dispatch = useDispatch();

  if (displaySlider && slidersRandom) {
    const sliderCorrectMap = {
      0: setslider0correct,
      1: setslider1correct,
      2: setslider2correct,
      3: setslider3correct,
    };
    const correctSliderDispatch = sliderCorrectMap[position];

    if (
      (leftisselected && sliderLeftIsCorrect) ||
      (rightisselected && sliderRightIsCorrect)
    ) {
      dispatch(correctSliderDispatch());
    }
    if (leftisselected !== sliderLeftIsCorrect) {
      const sliderInCorrectMap = {
        0: setslider0Incorrect,
        1: setslider1Incorrect,
        2: setslider2Incorrect,
        3: setslider3Incorrect,
      };
      const incorrectSliderDispatch = sliderInCorrectMap[position];
      dispatch(incorrectSliderDispatch());
    }
  }

  // if !allcorrect this means items will not be correctly marked after inital render so can set initial render completed to true.

  const clickHandler = () => {
    setRightisSelected((rightisselected) => !rightisselected);
    setLeftisSelected((leftisselected) => !leftisselected);
  };

  let fontSize = "18px";

  if (!isAlgebra) {
    if (
      textleft &&
      textright && // Check if textleft and textright are defined
      (textleft.length > 40 ||
        (textright.length > 40 && window.innerWidth < 400))
    ) {
      fontSize = "14px";
    } else if (
      (textleft && textleft.length > 30) ||
      (textright && textright.length > 30)
    ) {
      // Check if textleft is defined and for right
      fontSize = "15px";
    } else if (!textleft || !textright) {
      // Check if textleft is falsy or undefined
      fontSize = "16px";
    } else if (!textleft || !textright) {
      // Check if either textleft or textright is undefined
      return null;
    }
  }

  let leftTextStyle = {
    fontSize,
    color: leftisselected ? "white" : "black",
    fontWeight: leftisselected ? "600" : "300",
  };

  let rightTextStyle = {
    fontSize,
    color: rightisselected ? "white" : "black",
    fontWeight: rightisselected ? "600" : "300",
  };

  const content = (
    <Outer disabled={allcorrect} onClick={clickHandler}>
      <Box>
        {!isAlgebra ? (
          <TextLeft>
            <p style={leftTextStyle}>{textleft}</p>
          </TextLeft>
        ) : (
          <MathsMLfromString data={textleft}></MathsMLfromString>
        )}
      </Box>

      <Box>
        {!isAlgebra ? (
          <TextRight>
            <p style={rightTextStyle}>{textright}</p>
          </TextRight>
        ) : (
          <MathsMLfromString data={textright}></MathsMLfromString>
        )}
      </Box>

      <MovingBox
        style={allcorrect ? correctstyle : generalStyle}
        className={
          rightisselected
            ? "moving_box_right_position"
            : "moving_box_left_position"
        }
      ></MovingBox>
    </Outer>
  );

  return content;
}

export default Slider;

const Outer = styled.button`
  outline: none;
  border: none;
  background-color: white;
  height: 70px;
  width: 90vw;
  max-width: 700px;
  border-radius: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 8px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;

const Box = styled.div`
  max-width: 700px;
  height: 65px;
  width: 50%;
  border-radius: 40px;
  border: 0px solid;
  outline: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextLeft = styled.div`
  margin-right: 15px;
  padding: 2px;
  position: relative;
  z-index: 5;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextRight = styled.div`
  margin-left: 15px;
  padding: 2px;
  position: relative;
  z-index: 5;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MovingBox = styled.div`
  opacity: 0.8;
  height: 70px;
`;
