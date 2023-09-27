import React, { useContext, useEffect, useState, useRef } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { colors, correctstyle } from "../../styles/colors";
import { SliderContext } from "./SliderContext";

import {
  setslider1correct,
  setslider2correct,
  setslider3correct,
  setslider4correct,
  setslider1Incorrect,
  setslider2Incorrect,
  setslider3Incorrect,
  setslider4Incorrect,
  setRenderCompleted,
  rerunRandomiseRequired,
  rerunRandomiseNOTRequired,
  resetRenderCompleted,
  setAllSlidersCorrect,
} from "../../features/Slider/sliderindex0slice";

function Slider({
  slidersRandom,
  initialBoolSlider,
  rerunFunction,
  setReRunFunction,
  statObj,
  position,
  resetselected,
  slidercorrect,
  setSliderCorrect,
  allcorrect,
  // setAllSlidersCorrectArr,
  // allSlidersCorrectArr,
  pairNumber,
  sliderLeftIsCorrect,
  sliderRightIsCorrect,
  textleft,
  textright,
  displaySlider,
}) {
  const [rightisselected, setRightisSelected] = useState(initialBoolSlider);
  const [leftisselected, setLeftisSelected] = useState(!initialBoolSlider);

  // useEffect(() => {
  //   setRightisSelected(initialBoolSlider);
  //   setLeftisSelected(!initialBoolSlider);
  // }, [rerunFunction]);

  const initialRenderCompleted = useSelector(
    (state) => state.sliderSliceIndex0reducer.renderCompleted
  );

  const generalStyle = {};

  // initial render check to see which statements are set to the correct poisition and update redux store that initial render is completed

  let checkSliderCorrect = false;

  if (displaySlider && slidersRandom) {
    checkSliderCorrect =
      (leftisselected && sliderLeftIsCorrect) ||
      (rightisselected && sliderRightIsCorrect);
  }

  const dispatch = useDispatch();

  if (checkSliderCorrect) {
    switch (position) {
      case 0:
        dispatch(setslider1correct());
        break;
      case 1:
        dispatch(setslider2correct());
        break;
      case 2:
        dispatch(setslider3correct());
        break;
      case 3:
        dispatch(setslider4correct());
        break;
      default:
        break;
    }
  }

  // if !allcorrect this means items will not be correctly marked after inital render so can set initial render completed to true.

  const clickHandler = () => {
    setRightisSelected((rightisselected) => !rightisselected);
    setLeftisSelected((leftisselected) => !leftisselected);
    // dispatch(setRenderCompleted());
  };

  let fontsize = "16px";

  if (textleft.length > 40 && window.innerWidth < 400) {
    fontsize = "14px";
  } else if (textleft.length > 30) {
    fontsize = "15px";
  } else if (textleft.length === undefined) {
    fontsize = "16px";
  }

  let leftTextStyle = {
    fontSize: fontsize,
    color: leftisselected ? "white" : "black",
    fontWeight: leftisselected ? "600" : "300",
  };

  let rightTextStyle = {
    fontSize: fontsize,
    color: rightisselected ? "white" : "black",
    fontWeight: rightisselected ? "600" : "300",
  };

  let style = {};
  if (!displaySlider) {
    style = { display: "none" };
  }

  if (allcorrect) {
    // dispatch(setAllSlidersCorrect());
  }

  return (
    <div>
      <Wrapper style={style}>
        <Outer
          // disabled={isDisabled}

          onClick={clickHandler}
        >
          <Box>
            <TextLeft>
              <p style={leftTextStyle}>{textleft}</p>
            </TextLeft>
          </Box>

          <Box>
            <TextRight>
              <p style={rightTextStyle}>{textright}</p>
            </TextRight>
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
      </Wrapper>
    </div>
  );
}

export default Slider;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Outer = styled.button`
  border: 2px solid red;
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

const TextLeft = styled.p`
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

const TextRight = styled.p`
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
