import React from "react";
import styled from "styled-components";
import SliderSelectionRandomise from "./SliderSelectionRandomise";
import { SliderSelectionIsCorrectContext } from "./SliderTextbox";

import { useContext, useState } from "react";

function SliderSelection(props) {
  const slidercontent = props.slider;

  const { sliderquestioncorrectnumber, setSliderQuestionCorrectNumber } =
    useContext(SliderSelectionIsCorrectContext);

  return (
    <Wrapper>
      {slidercontent?.map((item) => {
        return <SliderSelectionRandomise data={item} />;
      })}
    </Wrapper>
  );
}

export default SliderSelection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Slider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 90%;
  width: 90%;
  // border: 0.5px solid;
  margin: 5px;
  border-radius: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  border: 0.5px solid;
  p {
    position: relative;
    z-index: 20;
  }
`;

// const Section = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border: 2px solid red;
//   width: 100%;
//   height: 100%;
//   position: relative:
//   z-index: 5;
// `;
