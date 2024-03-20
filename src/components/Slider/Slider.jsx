import React, { useEffect, useState, useContext } from "react";
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
} from "../../redux/Slider/sliderindex0slice";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";

function Slider({
  isAlgebra,
  initialBoolSlider,
  position,
  correctAnswerIsSelected,
  sliderRightIsCorrect,
  textleft,
  textright,
}) {
  const [rightisselected, setRightisSelected] = useState();
  const [leftisselected, setLeftisSelected] = useState();
  const { darkThemeActive } = useContext(UserContext);

  useEffect(() => {
    setRightisSelected(initialBoolSlider);
    setLeftisSelected(!initialBoolSlider);
  }, [initialBoolSlider]);

  const generalStyle = {};
  const dispatch = useDispatch();

  const dispatchSliderStatus = (position, isCorrect) => {
    switch (position) {
      case 0:
        return isCorrect
          ? dispatch(setslider0correct())
          : dispatch(setslider0Incorrect());
      case 1:
        return isCorrect
          ? dispatch(setslider1correct())
          : dispatch(setslider1Incorrect());
      case 2:
        return isCorrect
          ? dispatch(setslider2correct())
          : dispatch(setslider2Incorrect());
      case 3:
        return isCorrect
          ? dispatch(setslider3correct())
          : dispatch(setslider3Incorrect());
      default:
        break;
    }
  };

  useEffect(() => {
    if (
      (rightisselected && sliderRightIsCorrect) ||
      (leftisselected && !sliderRightIsCorrect)
    ) {
      dispatchSliderStatus(position, true);
    } else if (rightisselected !== sliderRightIsCorrect) {
      dispatchSliderStatus(position, false);
    }
  }, [rightisselected, leftisselected]);

  const clickHandler = () => {
    setRightisSelected((prev) => !prev);
    setLeftisSelected((prev) => !prev);
  };

  let fontSize = "14px";

  if (!isAlgebra) {
    if (
      textleft &&
      textright && // Check if textleft and textright are defined
      (textleft.length > 40 ||
        (textright.length > 40 && window.innerWidth < 400))
    ) {
      fontSize = "13px";
    } else if (
      (textleft && textleft.length > 30) ||
      (textright && textright.length > 30)
    ) {
      // Check if textleft is defined and for right
      fontSize = "12px";
    } else if (!textleft || !textright) {
      // Check if textleft is falsy or undefined
      fontSize = "14px";
    } else if (!textleft || !textright) {
      // Check if either textleft or textright is undefined
      return null;
    }
  }

  let leftTextStyle = {
    fontSize,
    color: leftisselected
      ? "white"
      : darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFrontColor,
    fontWeight: leftisselected ? "600" : "300",
  };

  let rightTextStyle = {
    fontSize,
    color: rightisselected
      ? "white"
      : darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFrontColor,
    fontWeight: rightisselected ? "600" : "300",
  };

  const content = (
    <Outer disabled={correctAnswerIsSelected} onClick={clickHandler}>
      <Box darkThemeActive={darkThemeActive}>
        {!isAlgebra ? (
          <TextLeft>
            <P style={leftTextStyle}>{textleft}</P>
          </TextLeft>
        ) : (
          <MathsMLfromString data={textleft}></MathsMLfromString>
        )}
      </Box>

      <Box darkThemeActive={darkThemeActive}>
        {!isAlgebra ? (
          <TextRight>
            <P style={rightTextStyle}>{textright}</P>
          </TextRight>
        ) : (
          <MathsMLfromString data={textright}></MathsMLfromString>
        )}
      </Box>

      <MovingBox
        style={correctAnswerIsSelected ? correctstyle : generalStyle}
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
  background-color: transparent;
  height: 80px;
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
  height: 75px;
  width: 50%;
  border-radius: 40px;
  border: 0px solid;
  outline: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
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

const P = styled.p``;

const MovingBox = styled.div`
  height: 80px;
`;
