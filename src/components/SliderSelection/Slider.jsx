import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { useDispatch, useSelector } from "react-redux";
import SliderTextbox from "./SliderTextbox";
import { resetSliderSelectionIndex0 } from "../../features/slider/sliderquestiondataSliceIndex0";
import { resetSliderSelectionIndex1 } from "../../features/slider/sliderquestiondataSliceIndex1";

function Slider(props) {
  const [leftselected, setLeftSelected] = useState(false);
  const [rightselected, setRightSelected] = useState(false);

  const index = props.index;
  const sliderLeftIsCorrect = props.sliderLeftIsCorrect;
  const sliderRightIsCorrect = props.sliderRightIsCorrect;

  const textleft = props.textleft;
  const textright = props.textright;
  const resetselected = props.resetselected;

  const dispatch = useDispatch();

  // reset btn selected when resetbtn selected
  useEffect(() => {
    if (index === 0) {
      setRightSelected(false);
      setLeftSelected(false);
      dispatch(resetSliderSelectionIndex0());
    } else if (index === 1) {
      setRightSelected(false);
      setLeftSelected(false);
      dispatch(resetSliderSelectionIndex1());
    }
  }, [resetselected]);

  // set opposite box to opposite state so only one box can be selected at one time in one slider line
  useEffect(() => {
    if (leftselected) {
      setRightSelected(false);
    }
  }, [leftselected]);

  useEffect(() => {
    if (rightselected) {
      setLeftSelected(false);
    }
  }, [rightselected]);

  return (
    <Wrapper>
      {/* left */}
      <LeftBox
        onClick={() => {
          setLeftSelected(!leftselected);
        }}
      >
        <SliderTextbox
          index={index}
          isSelected={leftselected}
          isCorrect={sliderLeftIsCorrect}
          text={textleft}
        ></SliderTextbox>
      </LeftBox>
      {/* right */}
      <RightBox
        onClick={() => {
          setRightSelected(!rightselected);
        }}
      >
        <SliderTextbox
          index={index}
          isSelected={rightselected}
          isCorrect={sliderRightIsCorrect}
          text={textright}
        ></SliderTextbox>
      </RightBox>
    </Wrapper>
  );
}

export default Slider;

const LeftBox = styled.div`
  width: 45%;
  border-radius: 20px;
`;

const RightBox = styled.div`
  width: 45%;
  border-radius: 20px;
`;

const Wrapper = styled.div`
  max-width: 700px;
  width: 100%; 
  height: 150px; 
  display: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
 

//   @media ${(device.mobileS, device.mobileM)} {
//     box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px,
//       rgba(39, 106, 245, 0.3) 0px 7px 10px -3px,
//       rgba(39, 106, 245, 0.1) 0px -3px 0px inset;
//     width: 90%;
  }
`;
