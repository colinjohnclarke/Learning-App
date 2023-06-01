import React, { useState, useContext } from "react";
import { createContext } from "react";
import styled from "styled-components";
export const SliderSelectionIsCorrectContext = createContext();

function SliderTextbox(props) {
  const [boxiselected, setBoxIsSelected] = useState(false);

  const isCorrect = props.isCorrect;
  const text = props.text;

  const { sliderquestioncorrectnumber, setSliderQuestionCorrectNumber } =
    useContext(SliderSelectionIsCorrectContext);

  const selected_style = {
    backgroundColor: "rgba(39, 106, 245, 0.4)",
    transform: "translateY(6px)",
    transition: "0.4s",
    color: "white",
    boxShadow:
      "rgba(0, 0, 0, 0.39) 0px 2px 4px, rgba(39, 106, 245, 0.3) 0px 7px 10px -3px, rgba(39, 106, 245, 0.1) 0px -3px 0px inset",
  };

  const non_selected_style = {
    color: "black",
    transition: "0.4s",
    boxShadow:
      "rgba(39, 106, 245, 0.39) 0px 20px 40px -12px, rgba(0, 0, 0, 0.3) 0px 10px 20px -18px",
  };

  console.log("boxisSelected", boxiselected);

  // const check = () => {
  //   if (boxiselected === isCorrect) {
  //     setSliderQuestionCorrectNumber(sliderquestioncorrectnumber + 1);
  //     console.log("hsdjdhsj");
  //   } else {
  //     console.log("TRY AGAIN");
  //   }
  // };

  return (
    <TextBox
      onClick={() => {
        setBoxIsSelected(!boxiselected);
      }}
      style={boxiselected ? selected_style : non_selected_style}
    >
      <p>{text}</p>
    </TextBox>
  );
}

export default SliderTextbox;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30%;
  width: 30%;
  min-height: 120px;
  min-width: 120px;
  margin: 5px;
  border-radius: 30px;
  padding: 10px;
  background-color: rgba(39, 106, 245, 0.18);

  p {
    position: relative;
    z-index: 20;
    font-size: 18px;
    text-align: center;
  }
`;
