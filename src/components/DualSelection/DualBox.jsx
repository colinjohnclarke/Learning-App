import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { useDispatch, useSelector } from "react-redux";
import Textbox from "./Textbox";
import { resetSliderSelectionIndex0 } from "../../features/DualSelection/dualselectionquestiondataSliceIndex0";
import { resetSliderSelectionIndex1 } from "../../features/DualSelection/dualselectionquestiondataSliceIndex1";

function DualBox(props) {
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

  let index0currentSliderQuestionScore = useSelector(
    (state) => state.sliderquestiondataSliceIndex0reducer.value
  );
  let inactivateSelection = false;

  if (index0currentSliderQuestionScore.length === 4) {
    inactivateSelection = true;
  }
  let style = {};
  if (!props.displayBox) {
    style = { display: "none" };
  }

  return (
    <Wrapper style={style}>
      <Num>{props.boxnum}</Num>
      {/* left */}
      <LeftBox
        onClick={() => {
          if (!inactivateSelection) {
            setLeftSelected(!leftselected);
          }
        }}
      >
        <Textbox
          index={index}
          isSelected={leftselected}
          isCorrect={sliderLeftIsCorrect}
          text={textleft}
        ></Textbox>
      </LeftBox>
      {/* right */}
      <RightBox
        onClick={() => {
          if (!inactivateSelection) {
            setRightSelected(!rightselected);
          }
        }}
      >
        <Textbox
          index={index}
          isSelected={rightselected}
          isCorrect={sliderRightIsCorrect}
          text={textright}
        ></Textbox>
      </RightBox>
    </Wrapper>
  );
}

export default DualBox;

const LeftBox = styled.div`
  padding-left: 5px;
  width: 46%;
  border-radius: 20px;
  margin: 5px;
`;

const RightBox = styled.div`
  padding-right: 5px;
  width: 46%;
  border-radius: 20px;
  margin: 5px;
`;

const Wrapper = styled.div`
  max-width: 700px;
  width: 100%; 
  height: 110px; 
  display: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

 

//   @media ${(device.mobileS, device.mobileM)} {
//     box-shadow: rgba(0, 200, 200, 0.39) 0px 2px 4px,
//       rgba(39, 106, 245, 0.3) 0px 7px 10px -3px,
//       rgba(39, 106, 245, 0.1) 0px -3px 0px inset;
//     width: 90%;
  }
`;

const Num = styled.div`
position: relative; 
// left: -80px; 

  display: none;
  justify-content: center;
  align-items: center;
  height: 8px;
  width: 8px;
  padding: 10px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  border: 2px solid rgba(0, 200, 200, 0.8);
  color: rgba(0, 200, 200, 0.8);
  font-weight: 400;

  @media ${device.tablet} {
  left: -10px; 
  display: flex;
  }
  @media ${device.desktop} {
    left: -20px;
    display: flex;
  }

 @media ${device.mobileS} {

  

`;
