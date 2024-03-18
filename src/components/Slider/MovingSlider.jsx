import React, { useEffect } from "react";
import Slider from "./Slider";
import { device } from "../../styles/breakpoints";
import styled from "styled-components";
import Score from "../../components/Data/CurrentQuestionScores/Score";

import { useSelector } from "react-redux";

function MovingSlider({
  data,
  isAlgebra,
  sliderBool,
  sliderNumsArr,
  slidersRandom,
  updateStateFunctions,
}) {
  const sliderCorrect = useSelector((state) => state.sliderSliceIndex0reducer);
  const sliderCorrectList = [];

  console.log("sliderBool", sliderBool);
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

  const {
    slider0leftIsCorrect,
    slider0rightIsCorrect,
    slider1leftIsCorrect,
    slider1rightIsCorrect,
    slider2leftIsCorrect,
    slider2rightIsCorrect,
    slider3leftIsCorrect,
    slider3rightIsCorrect,
  } = sliderNumsArr;

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
    slidersRandom,
    correctAnswerIsSelected,
    pairNumber: data.number_of_pairs_entered,
  };

  return (
    <Wrapper>
      <Score
        scoreData={{ correctAnswerIsSelected }}
        totalMarksAvailable={data.total_marks_available}
      ></Score>

      <Slider
        {...sliderProps}
        initialBoolSlider={sliderBool[0]}
        displaySlider={displaySlider0}
        position={0}
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
      ></Slider>

      <Slider
        {...sliderProps}
        initialBoolSlider={sliderBool[1]}
        displaySlider={displaySlider1}
        position={1}
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
      ></Slider>
      <Slider
        {...sliderProps}
        initialBoolSlider={sliderBool[2]}
        displaySlider={displaySlider2}
        position={2}
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
      ></Slider>
      <Slider
        {...sliderProps}
        initialBoolSlider={sliderBool[3]}
        displaySlider={displaySlider3}
        position={3}
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
      ></Slider>
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
  width: 100%;

  @media ${device.mobileL} {
    height: 100%;
  }
`;
