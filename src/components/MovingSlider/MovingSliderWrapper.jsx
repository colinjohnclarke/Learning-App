import React, { useState, useEffect } from "react";
import MovingSlider from "./MovingSlider";
import { SliderContext } from "./SliderContext";

function MovingSliderWrapper(props) {
  const data = props.data;

  const [index0AnswerisCorrect, setIndex0AnswerIsCorrect] = useState(false);
  const [index0AnswerisInCorrect, setIndex0AnswerIsInCorrect] = useState(false);
  const [index1AnswerisCorrect, index1AnswerIsCorrect] = useState(false);
  const [index1AnswerisInCorrect, setIndex1AnswerIsInCorrect] = useState(false);

  // const [val, setVal] = useState(0);

  const contextObj = {
    index0AnswerisCorrect,
    setIndex0AnswerIsCorrect,
    index0AnswerisInCorrect,
    setIndex0AnswerIsInCorrect,
    index1AnswerisCorrect,
    index1AnswerIsCorrect,
    index1AnswerisInCorrect,
    setIndex1AnswerIsInCorrect,
  };

  // useEffect(() => {
  //   setVal((value) => +1);
  // }, []);

  return data?.map((item, index) => {
    return (
      <SliderContext.Provider index={index} value={contextObj}>
        {/* <h1>{val}</h1> */}
        <MovingSlider key={item._key} data={item} index={index}></MovingSlider>
      </SliderContext.Provider>
    );
  });
}

export default MovingSliderWrapper;
