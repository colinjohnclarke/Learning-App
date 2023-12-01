import React, { useState, useEffect } from "react";
import MovingSlider from "./MovingSlider";

function MovingSliderWrapper({ data }) {
  const [rerunFunction, setReRunFunction] = useState(0);

  const [
    slidersAreInitiallySettoCorrectPosition,
    setslidersAreInitiallySettoCorrectPosition,
  ] = useState(false);


  const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState(false);
  const [incorrectAnswerIsSelected, setIncorrectAnswerIsSelected] =
    useState(false);

  const updateStateFunctions = {
    correctAnswerIsSelected,
    setCorrectAnswerIsSelected,
    incorrectAnswerIsSelected,
    setIncorrectAnswerIsSelected,
  };

  // generate random vales to random ordering of the slider items on each refresh, in pairs, one pair for each slider, use these values to set which side recives the correct value and which incorrect  ( changes each time)

  let slider0leftIsCorrect = Math.random() > Math.random();
  let slider0rightIsCorrect = !slider0leftIsCorrect;

  let slider1leftIsCorrect = Math.random() > Math.random();
  let slider1rightIsCorrect = !slider1leftIsCorrect;

  let slider2leftIsCorrect = Math.random() > Math.random();
  let slider2rightIsCorrect = !slider2leftIsCorrect;

  let slider3leftIsCorrect = Math.random() > Math.random();
  let slider3rightIsCorrect = !slider3leftIsCorrect;

  let rightSlideIsHighlightedSlider0 = Math.random() > 0.5;
  let rightSlideIsHighlightedSlider1 = Math.random() > 0.5;
  let rightSlideIsHighlightedSlider2 = Math.random() > 0.5;
  let rightSlideIsHighlightedSlider3 = Math.random() > 0.5;

  const sliderNumsArr = {
    slider0leftIsCorrect,
    slider0rightIsCorrect,
    slider1leftIsCorrect,
    slider1rightIsCorrect,
    slider2leftIsCorrect,
    slider2rightIsCorrect,
    slider3leftIsCorrect,
    slider3rightIsCorrect,
  };

  const slider0rightArr = [
    slider0rightIsCorrect,
    slider1rightIsCorrect,
    slider2rightIsCorrect,
    slider3rightIsCorrect,
  ];

  const sliderBoolsArr = [
    rightSlideIsHighlightedSlider0,
    rightSlideIsHighlightedSlider1,
    rightSlideIsHighlightedSlider2,
    rightSlideIsHighlightedSlider3,
  ];

  const sliderBools = {
    rightSlideIsHighlightedSlider0,
    rightSlideIsHighlightedSlider1,
    rightSlideIsHighlightedSlider2,
    rightSlideIsHighlightedSlider3,
  };

  let boolsCorrect = 0;
  let slidersRandom = false;

  useEffect(() => {
    setReRunFunction((val) => val + 1);
  }, [slidersAreInitiallySettoCorrectPosition]);

  return data?.map((item, index) => {
    for (let i = 0; i < item.number_of_pairs_entered; i++) {
      if (sliderBoolsArr[i] === slider0rightArr[i]) {
        boolsCorrect++;
      }
    }

    if (boolsCorrect === item.number_of_pairs_entered) {
      setslidersAreInitiallySettoCorrectPosition((val) => !val);
      boolsCorrect = 0;
      slidersRandom = false;
    } else {
      slidersRandom = true;
    }

    return (
      <MovingSlider
      updateStateFunctions={updateStateFunctions}
        isAlgebra={item.isAlgebra}
        sliderBool={sliderBools}
        slidersRandom={slidersRandom}
        // setReRunFunction={setReRunFunction}
        // rerunFunction={rerunFunction}
        sliderNumsArr={sliderNumsArr}
        key={item._key}
        data={item}
        index={index}
      ></MovingSlider>
    );
  });
}

export default React.memo(MovingSliderWrapper);
