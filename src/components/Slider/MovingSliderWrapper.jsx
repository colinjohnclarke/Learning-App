import React, { useState, useEffect } from "react";
import { BsEyeSlash } from "react-icons/bs";
import MovingSlider from "./MovingSlider";

function MovingSliderWrapper({ data }) {
  console.log("🚀 ~ MovingSliderWrapper ~ data:", data);
  const [sliderIsInitallyRandomised, setSliderIsInitallyRandomised] =
    useState(false);

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

  const [rightSlidersCorrect, setRightSliderCorrect] = useState(null);
  const [rightSlideIsHighlighted, setRightSlideIsHighlighted] = useState(null);

  useEffect(() => {
    randomise();
  }, []);

  function randomise() {
    setRightSliderCorrect((prevState) => ({
      ...prevState,
      slider0rightIsCorrect: Math.random() > Math.random(),
      slider1rightIsCorrect: Math.random() > Math.random(),
      slider2rightIsCorrect: Math.random() > Math.random(),
      slider3rightIsCorrect: Math.random() > Math.random(),
    }));

    setRightSlideIsHighlighted((prev) => ({
      ...prev,
      rightSlideIsHighlightedSlider0: Math.random() > 0.5,
      rightSlideIsHighlightedSlider1: Math.random() > 0.5,
      rightSlideIsHighlightedSlider2: Math.random() > 0.5,
      rightSlideIsHighlightedSlider3: Math.random() > 0.5,
    }));

    console.log(rightSlidersCorrect, rightSlideIsHighlighted);
  }

  let count = 0;

  if (rightSlideIsHighlighted && rightSlidersCorrect) {
    const arrrightSlideIsHighlighted = Object.values(rightSlideIsHighlighted);
    const arrrightSlidersCorrect = Object.values(rightSlidersCorrect);

    for (let i = 0; i < data[0].number_of_pairs_entered; i++)
      if (arrrightSlideIsHighlighted[i] === arrrightSlidersCorrect[i]) {
        count++;
      }
  }

  useEffect(() => {
    if (count === data[0].number_of_pairs_entered) {
      setSliderIsInitallyRandomised((val) => !val);
    }
  }, [rightSlidersCorrect, rightSlideIsHighlighted]);

  useEffect(() => {
    randomise();
  }, [sliderIsInitallyRandomised]);

  return (
    <MovingSlider
      rightSlidersCorrect={rightSlidersCorrect}
      updateStateFunctions={updateStateFunctions}
      isAlgebra={data[0].isAlgebra}
      rightSlideIsHighlighted={rightSlideIsHighlighted}
      key={data[0]._key}
      data={data[0]}
    ></MovingSlider>
  );
}

export default React.memo(MovingSliderWrapper);
