import React, { useState, useEffect } from "react";
import { BsEyeSlash } from "react-icons/bs";
import MovingSlider from "./MovingSlider";

function MovingSliderWrapper({ data }) {
  console.log("🚀 ~ MovingSliderWrapper ~ data:", data);
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

  const [rightSlidersCorrect, setRightSliderCorrect] = useState(null);
  const [rightSlideIsHighlighted, setRightSlideIsHighlighted] = useState(null);

  useEffect(() => {
    randomise();
  }, []);

  function randomise() {
    console.log("run randomise");
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

  const [buttonClicked, setButtonClicked] = useState(false);

  const handleClick = () => {
    setButtonClicked((val) => !val);
    randomise();
  };


  const [count, setCount] = useState(0);

  let sliderIsInitallyRandomised = true;

  // useEffect(() => {
  //   // console.log("highlighted Wrapper", sliderRightIsHighlightedArr);
  //   // console.log("sliderNums Wrapper", slider0rightIsCorrectArr);

  //   for (let i = 0; i < data[0].number_of_pairs_entered; i++) {
  //     console.log(
  //       "helo",
  //       sliderRightIsHighlightedArr[i],
  //       slider0rightIsCorrectArr[i]
  //     );
  //     if (sliderRightIsHighlightedArr[i] === slider0rightIsCorrectArr[i]) {
  //       setCount((val) => val + 1);
  //     }
  //   }
  //   console.log("count", count);
  // }, []);

  // if (count === 2) {
  //   sliderIsInitallyRandomised = false;
  //   console.log("requres re randomising");
  // }

  // useEffect(() => {
  //   if (!sliderIsInitallyRandomised) {
  //     setReRunFunction((val) => val + 1);
  //     randomise();
  //     console.log("randomise from useEFFtec rerun");
  //   }
  // }, [sliderIsInitallyRandomised]);

  return (
    <div>
      {/* <h1> rerun count {rerunFunction}</h1> */}

      <button onClick={handleClick}> RANDOMISE</button>
      <MovingSlider
        rightSlidersCorrect={rightSlidersCorrect}
        updateStateFunctions={updateStateFunctions}
        isAlgebra={data[0].isAlgebra}
        rightSlideIsHighlighted={rightSlideIsHighlighted}
        // slidersRandom={slidersRandom}
        // setReRunFunction={setReRunFunction}
        // rerunFunction={rerunFunction}
        // sliderNumsArr={slidersCorrect}
        key={data[0]._key}
        data={data[0]}
        // index={index}
      ></MovingSlider>
    </div>
  );
}

export default React.memo(MovingSliderWrapper);
