import React, { useState, useEffect } from "react";
import MovingSlider from "./MovingSlider";
import { SliderContext } from "./SliderContext";
import { useSelector, useDispatch } from "react-redux";
import {
  setslider1Incorrect,
  setslider2Incorrect,
  setslider3Incorrect,
  setslider4Incorrect,
  rerunRandomiseNOTRequired,
  index0correctanswerselected,
  index0correctanswerUNselected,
  index0EmptyArr,
  initialRenderCompleted,
  rerunRandomiseRequired,
} from "../../features/Slider/sliderindex0slice";

function MovingSliderWrapper({ data }) {
  let rerunRandomiseRequired = useSelector(
    (state) => state.sliderSliceIndex0reducer.rerunRandomiseRequired
  );

  const dispatch = useDispatch();

  // generate random vales to random ordering of the slider items on each refresh, in pairs, one pair for each slider, use these values to set which side recives the correct value and which incorrect  ( changes each time)

  // const [slider0leftIsCorrect, setslider0leftIsCorrect] = useState();
  // const [slider0rightIsCorrect, setslider0rightIsCorrect] = useState();
  // const [slider1leftIsCorrect, setslider1leftIsCorrect] = useState();
  // const [slider1rightIsCorrect, setslider1rightIsCorrect] = useState();
  // const [slider2leftIsCorrect, setslider2leftIsCorrect] = useState();
  // const [slider2rightIsCorrect, setslider2rightIsCorrect] = useState();
  // const [slider3leftIsCorrect, setslider3leftIsCorrect] = useState();
  // const [slider3rightIsCorrect, setslider3rightIsCorrect] = useState();
  const [rerunFunction, setReRunFunction] = useState(0);

  const isinitialRenderCompleted = useSelector(
    (state) => state.sliderSliceIndex0reducer.renderCompleted
  );

  let secondRenderCompleted = useSelector(
    (state) => state.sliderSliceIndex0reducer.secondRenderCompleted
  );

  dispatch(setslider1Incorrect());
  dispatch(setslider2Incorrect());
  dispatch(setslider3Incorrect());
  dispatch(setslider4Incorrect());

  useEffect(() => {
    setReRunFunction((val) => val + 1);
  }, [isinitialRenderCompleted, secondRenderCompleted]);

  console.log("rerun");

  // if (allcorrect && !initial) {
  //   setReRunFunction((val) => val);
  //   console.log("    setReRunFunction((val) => val);");
  // }

  // let tester = false;

  let initialBoolSlider1 = 0;
  let initialBoolSlider2 = 1;
  let initialBoolSlider3 = 2;
  let initialBoolSlider4 = 3;

  // useEffect(() => {

  const num1a = Math.random();
  const num1b = Math.random();
  const num2a = Math.random();
  const num2b = Math.random();
  const num3a = Math.random();
  const num3b = Math.random();
  const num4a = Math.random();
  const num4b = Math.random();

  // deterine which value is higher and assign a boolean for condition

  // setslider0leftIsCorrect(num1a > num1b);
  // setslider0rightIsCorrect(num1a < num1b);
  // setslider1leftIsCorrect(num2a > num2b);
  // setslider1rightIsCorrect(num2a < num2b);
  // setslider2leftIsCorrect(num3a > num3b);
  // setslider2rightIsCorrect(num3a < num3b);
  // setslider3leftIsCorrect(num4a > num4b);
  // setslider3rightIsCorrect(num4a < num4b);

  let slider0leftIsCorrect = num1a > num1b;
  let slider0rightIsCorrect = num1a < num1b;

  let slider1leftIsCorrect = num2a > num2b;
  let slider1rightIsCorrect = num2a < num2b;

  let slider2leftIsCorrect = num3a > num3b;
  let slider2rightIsCorrect = num3a < num3b;

  let slider3leftIsCorrect = num4a > num4b;
  let slider3rightIsCorrect = num4a < num4b;

  initialBoolSlider1 = Math.random() > 0.5;
  initialBoolSlider2 = Math.random() > 0.5;
  initialBoolSlider3 = Math.random() > 0.5;
  initialBoolSlider4 = Math.random() > 0.5;

  // const boolRef = useRef(initialBool);
  // }, [rerunFunction]);

  console.log(
    "BOOLS",
    initialBoolSlider1,
    initialBoolSlider2,
    initialBoolSlider3,
    initialBoolSlider4
  );

  const sliderBool = {
    initialBoolSlider1,
    initialBoolSlider2,
    initialBoolSlider3,
    initialBoolSlider4,
  };

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

  return data?.map((item, index) => {
    return (
      <SliderContext.Provider index={index}>
        <MovingSlider
          sliderBool={sliderBool}
          setReRunFunction={setReRunFunction}
          rerunFunction={rerunFunction}
          sliderNumsArr={sliderNumsArr}
          key={item._key}
          data={item}
          index={index}
        ></MovingSlider>
      </SliderContext.Provider>
    );
  });
}

export default MovingSliderWrapper;
