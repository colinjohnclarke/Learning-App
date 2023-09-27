import React, { useState, useContext, useEffect } from "react";
import Slider from "./Slider";
import styled from "styled-components";
import ScoreSlider from "../../components/Data/CurrentQuestionScores/ScoreSlider";
import { SliderContext } from "./SliderContext";
import {
  setfirstRenderCompleted,
  setSecondRenderCompleted,
  refreshRenderRequired,
  resetRenderCompleted,
  setAllSlidersCorrect,
} from "../../features/Slider/sliderindex0slice";

import { useDispatch, useSelector } from "react-redux";

function MovingSlider(props) {
  const dispatch = useDispatch();

  const rerunFunction = props.rerunFunction;
  const setReRunFunction = props.setReRunFunction;

  const slider1correct = useSelector(
    (state) => state.sliderSliceIndex0reducer.slider1correct
  );
  const slider2correct = useSelector(
    (state) => state.sliderSliceIndex0reducer.slider2correct
  );

  const slider3correct = useSelector(
    (state) => state.sliderSliceIndex0reducer.slider3correct
  );

  const slider4correct = useSelector(
    (state) => state.sliderSliceIndex0reducer.slider4correct
  );

  const sliderData = props.data;
  const pairNumber = props.data.number_of_pairs_entered;
  const index = props.index;

  const {
    initialBoolSlider1,
    initialBoolSlider2,
    initialBoolSlider3,
    initialBoolSlider4,
  } = props.sliderBool;

  const {
    slider0leftIsCorrect,
    slider0rightIsCorrect,
    slider1leftIsCorrect,
    slider1rightIsCorrect,
    slider2leftIsCorrect,
    slider2rightIsCorrect,
    slider3leftIsCorrect,
    slider3rightIsCorrect,
  } = props.sliderNumsArr;

  let sliderList = [
    slider1correct,
    slider2correct,
    slider3correct,
    slider4correct,
  ];

  let firstRenderCompleted = useSelector(
    (state) => state.sliderSliceIndex0reducer.firstRenderCompleted
  );

  let secondRenderCompleted = useSelector(
    (state) => state.sliderSliceIndex0reducer.secondRenderCompleted
  );

  // const [allcorrect, setAllCorrect] = useState(false);
  const allcorrect =
    sliderList.filter((item) => item === true).length === pairNumber;

  // useEffect(() => {
  //   setAllCorrect(
  //     (val) => sliderList.filter((item) => item === true).length === pairNumber
  //   );
  // }, [rerunFunction, initialRenderCompleted, sliderList]);

  let slidersRandom = false;

  if (!firstRenderCompleted && !slidersRandom) {
    if (allcorrect) {
      slidersRandom = false;
      dispatch(refreshRenderRequired());
      console.log("first");
    } else if (!allcorrect) {
      slidersRandom = true;
      console.log("second");
      dispatch(setfirstRenderCompleted());
    }
  }
  if (firstRenderCompleted && !slidersRandom) {
    if (allcorrect) {
      dispatch(setSecondRenderCompleted());
      console.log("third");
    } else if (!allcorrect) {
      slidersRandom = true;
      console.log("fourth");
    }
  }

  if (allcorrect && slidersRandom) {
    dispatch(setAllSlidersCorrect());
    console.log("fith");
  }

  // only diplay the number of sliders specified
  let displaySlider1 = false;
  let displaySlider2 = false;
  let displaySlider3 = false;
  let displaySlider4 = false;

  switch (sliderData.number_of_pairs_entered) {
    case 4:
      displaySlider4 = true;
      displaySlider3 = true;
      displaySlider2 = true;
      displaySlider1 = true;
      break;
    case 3:
      displaySlider3 = true;
      displaySlider2 = true;
      displaySlider1 = true;
      break;
    case 2:
      displaySlider2 = true;
      displaySlider1 = true;
      break;
    case 1:
      displaySlider1 = true;
      break;
    default:
      break;
  }

  return (
    <Wrapper>
      <p>{props.data.Question}</p>
      {/* <h1>First {JSON.stringify(firstRenderCompleted)}</h1>
      <h1>Second {JSON.stringify(secondRenderCompleted)}</h1> */}

      <ScoreSlider index={index}></ScoreSlider>
      <Slider
        slidersRandom={slidersRandom}
        initialBoolSlider={initialBoolSlider1}
        setReRunFunction={setReRunFunction}
        rerunFunction={rerunFunction}
        allcorrect={allcorrect}
        displaySlider={displaySlider1}
        pairNumber={props.data.number_of_pairs_entered}
        position={0}
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
      ></Slider>

      <Slider
        slidersRandom={slidersRandom}
        initialBoolSlider={initialBoolSlider2}
        setReRunFunction={setReRunFunction}
        rerunFunction={rerunFunction}
        allcorrect={allcorrect}
        displaySlider={displaySlider2}
        pairNumber={props.data.number_of_pairs_entered}
        position={1}
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
      ></Slider>
      <Slider
        slidersRandom={slidersRandom}
        initialBoolSlider={initialBoolSlider3}
        setReRunFunction={setReRunFunction}
        rerunFunction={rerunFunction}
        allcorrect={allcorrect}
        displaySlider={displaySlider3}
        pairNumber={props.data.number_of_pairs_entered}
        position={2}
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
      ></Slider>
      <Slider
        slidersRandom={slidersRandom}
        initialBoolSlider={initialBoolSlider4}
        setReRunFunction={setReRunFunction}
        rerunFunction={rerunFunction}
        allcorrect={allcorrect}
        displaySlider={displaySlider4}
        pairNumber={props.data.number_of_pairs_entered}
        position={3}
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
      ></Slider>
    </Wrapper>
  );
}

export default MovingSlider;

const Wrapper = styled.div`
  border-top: 0.5px solid lightblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  position: relative;
  padding-top: 40px;
  width: 100%;
`;
