import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { device } from "../../styles/breakpoints";
import styled from "styled-components";
import Score from "../../components/Data/CurrentQuestionScores/Score";

import { useSelector } from "react-redux";

function MovingSlider({
  data,
  isAlgebra,
  rightSlideIsHighlighted,
  rightSlidersCorrect,
  updateStateFunctions,
}) {
  console.log("🚀 ~ data:", data);
  const sliderCorrect = useSelector((state) => state.sliderSliceIndex0reducer);
  console.log("🚀 ~ sliderCorrectSELECT:", sliderCorrect);
  const sliderCorrectList = [];

  const { correctAnswerIsSelected, setCorrectAnswerIsSelected } =
    updateStateFunctions;

  for (let i = 0; i < 4; i++) {
    sliderCorrectList.push(sliderCorrect[`slider${i}correct`]);
  }

  const sliderData = data;

  const allcorrect =
    sliderCorrectList.filter((item) => item === true).length ===
    data.number_of_pairs_entered;

  useEffect(() => {
    if (allcorrect) {
      setCorrectAnswerIsSelected((val) => true);
    }
  }, [allcorrect]);

  // only diplay the number of sliders specified
  let displaySlider0 = false;
  let displaySlider1 = false;
  let displaySlider2 = false;
  let displaySlider3 = false;

  let displaySliders = [
    displaySlider0,
    displaySlider1,
    displaySlider2,
    displaySlider3,
  ];

  // for (
  //   let i = 0;
  //   i < data.number_of_pairs_entered && i < displaySliders.length;
  //   i++
  // ) {
  //   displaySliders[i] = true;
  // }

  switch (data.number_of_pairs_entered) {
    case 4:
      displaySlider3 = true;
      displaySlider2 = true;
      displaySlider1 = true;
      displaySlider0 = true;
      break;
    case 3:
      displaySlider2 = true;
      displaySlider1 = true;
      displaySlider0 = true;
      break;
    case 2:
      displaySlider1 = true;
      displaySlider0 = true;
      break;
    case 1:
      displaySlider0 = true;
      break;
    default:
      break;
  }

  const sliderProps = {
    isAlgebra,
    correctAnswerIsSelected,
    pairNumber: data.number_of_pairs_entered,
  };

  return (
    <Wrapper>
      <Score
        scoreData={{ correctAnswerIsSelected }}
        totalMarksAvailable={data.total_marks_available}
      ></Score>

      <p style={{ padding: "10px" }}>{data.Question}</p>

      {displaySlider0 && rightSlidersCorrect && (
        <Slider
          {...sliderProps}
          initialBoolSlider={
            rightSlideIsHighlighted.rightSlideIsHighlightedSlider0
          }
          position={0}
          sliderLeftIsCorrect={!rightSlidersCorrect.slider0rightIsCorrect}
          sliderRightIsCorrect={rightSlidersCorrect.slider0rightIsCorrect}
          textleft={
            !rightSlidersCorrect.slider0rightIsCorrect
              ? sliderData.Statement_1_correct_option
              : sliderData.Statement_1_incorrect_option
          }
          textright={
            rightSlidersCorrect.slider0rightIsCorrect
              ? sliderData.Statement_1_correct_option
              : sliderData.Statement_1_incorrect_option
          }
        ></Slider>
      )}
      {displaySlider1 && rightSlidersCorrect && (
        <Slider
          {...sliderProps}
          initialBoolSlider={
            rightSlideIsHighlighted.rightSlideIsHighlightedSlider1
          }
          position={1}
          sliderLeftIsCorrect={!rightSlidersCorrect.slider1rightIsCorrect}
          sliderRightIsCorrect={rightSlidersCorrect.slider1rightIsCorrect}
          textleft={
            !rightSlidersCorrect.slider1rightIsCorrect
              ? sliderData.Statement_2_correct_option
              : sliderData.Statement_2_incorrect_option
          }
          textright={
            rightSlidersCorrect.slider1rightIsCorrect
              ? sliderData.Statement_2_correct_option
              : sliderData.Statement_2_incorrect_option
          }
        ></Slider>
      )}

      {displaySlider2 && rightSlidersCorrect && (
        <Slider
          {...sliderProps}
          initialBoolSlider={
            rightSlideIsHighlighted.rightSlideIsHighlightedSlider2
          }
          position={2}
          sliderLeftIsCorrect={!rightSlidersCorrect.slider2rightIsCorrect}
          sliderRightIsCorrect={rightSlidersCorrect.slider2rightIsCorrect}
          textleft={
            !rightSlidersCorrect.slider2rightIsCorrect
              ? sliderData.Statement_3_correct_option
              : sliderData.Statement_3_incorrect_option
          }
          textright={
            rightSlidersCorrect.slider2rightIsCorrect
              ? sliderData.Statement_3_correct_option
              : sliderData.Statement_3_incorrect_option
          }
        ></Slider>
      )}

      {displaySlider3 && rightSlidersCorrect && (
        <Slider
          {...sliderProps}
          initialBoolSlider={
            rightSlideIsHighlighted.rightSlideIsHighlightedSlider3
          }
          position={3}
          sliderLeftIsCorrect={!rightSlidersCorrect.slider3rightIsCorrect}
          sliderRightIsCorrect={rightSlidersCorrect.slider3rightIsCorrect}
          textleft={
            !rightSlidersCorrect.slider3rightIsCorrect
              ? sliderData.Statement_4_correct_option
              : sliderData.Statement_4_incorrect_option
          }
          textright={
            rightSlidersCorrect.slider3rightIsCorrect
              ? sliderData.Statement_4_correct_option
              : sliderData.Statement_4_incorrect_option
          }
        ></Slider>
      )}
    </Wrapper>
  );
}

export default MovingSlider;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  position: relative;
  padding-top: 40px;
  padding-bottom: 40px;

  width: 100%;

  @media ${device.mobileL} {
    height: 100%;
  }
`;
