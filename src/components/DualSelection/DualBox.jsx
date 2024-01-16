import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { useDispatch, useSelector } from "react-redux";
import Textbox from "./Textbox";
import { resetSliderSelectionIndex0 } from "../../features/DualSelection/dualselectionquestiondataSliceIndex0";
import { resetSliderSelectionIndex1 } from "../../features/DualSelection/dualselectionquestiondataSliceIndex1";
import MathsMLfromString from "../../config/sanity/MathsMLfromString";

function DualBox({
  index,
  sliderLeftIsCorrect,
  sliderRightIsCorrect,
  isAlgebra,
  textleft,
  textright,
  boxnum,
  displayBox,
  updateStateFunctions,
}) {
  const [leftselected, setLeftSelected] = useState(false);
  const [rightselected, setRightSelected] = useState(false);

  const { correctAnswerIsSelected } = updateStateFunctions;

  // set opposite box to opposite state so only one box can be selected at one time in one slider line
  useEffect(() => {
    if (leftselected) {
      setRightSelected(false);
      // setUserHasInteracted((val) => true);
    }
  }, [leftselected]);

  useEffect(() => {
    if (rightselected) {
      setLeftSelected(false);
      // setUserHasInteracted((val) => true);
    }
  }, [rightselected]);

  let style = {};
  if (!displayBox) {
    style = { display: "none" };
  }

  return (
    <Wrapper style={style}>
      <Num>{boxnum}</Num>
      {/* left */}
      <LeftBox
        onClick={() => {
          if (!correctAnswerIsSelected) {
            setLeftSelected(!leftselected);
          }
        }}
      >
        <Textbox
          updateStateFunctions={updateStateFunctions}
          isAlgebra={isAlgebra}
          index={index}
          isSelected={leftselected}
          isCorrect={sliderLeftIsCorrect}
          text={textleft}
        ></Textbox>
      </LeftBox>
      {/* right */}

      <RightBox
        onClick={() => {
          if (!correctAnswerIsSelected) {
            setRightSelected(!rightselected);
          }
        }}
      >
        <Textbox
          updateStateFunctions={updateStateFunctions}
          isAlgebra={isAlgebra}
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
  height: 120px; 
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
