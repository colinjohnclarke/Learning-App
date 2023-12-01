import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { GrLinkNext } from "react-icons/gr";

function NextArrowBtn({ refVal, currentslide, setCurrentSlide }) {
  const iconStyle = {
    transform: "rotate(90deg)",
    height: "20px",
    width: "20px",
  };

  const scrolltoFn = (elementRef) => {
    elementRef.current?.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };

  const handleContinueBtnClicked = (elementRef) => {
    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 100);

    scrolltoFn(elementRef);
  };

  return (
    <Wrapper
      // disabled={buttondisabled}
      onClick={() => {
        setCurrentSlide((s) => s + 1);
        // setButtonDisabled((val) => true);
        handleContinueBtnClicked(refVal);
      }}
    >
      Continue
      {/* <GrLinkNext style={iconStyle}></GrLinkNext> */}
    </Wrapper>
  );
}

export default NextArrowBtn;

const rotate = keyframes`
0%   { transform: scale(1,1)      translateY(0); }
3.3%  { transform: scale(1.1,.9)   translateY(0); }
10%  { transform: scale(.9,1.1)   translateY(-20px); }
16.6%  { transform: scale(1.05,.95) translateY(0); }
19%  { transform: scale(1,1)      translateY(-3px); }
24%  { transform: scale(1,1)      translateY(0); }
100% { transform: scale(1,1)      translateY(0); }
`;

const Wrapper = styled.button`
  // animation: ${rotate} 3s linear infinite;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // border: none;
  margin: 60px;
  height: 50px;
  min-width: 350px;
  border: none;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  background-color: rgba(0, 200, 200, 0.8);
  color: white;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 1);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    transition: 0.3s;
  }

  &:active {
    transform: translateY(2px);
    transition: 0.3s;
  }
`;
