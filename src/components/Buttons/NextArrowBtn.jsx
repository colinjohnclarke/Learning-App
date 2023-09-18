import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { GrLinkNext } from "react-icons/gr";

function NextArrowBtn({ refVal, currentslide, setCurrentSlide }) {
  const iconStyle = {
    transform: "rotate(90deg)",
    heigh: "10px",
    width: "10px",
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
      <GrLinkNext style={iconStyle}></GrLinkNext>
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
  animation: ${rotate} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 40px;
  margin: 10px;
  border-radius: 40px;
  border: 0px solid;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 1px;
  background-color: rgb(0, 200, 200, 0.3);
  box-shadow: -6px -6px -10px -1px rgba(255, 255, 255, 0.7);
  box-shadow: 6px 6px 10px 1px rgba(0, 0, 0, 0.15);
  border-top: 1.4px white solid;
  box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, 0.15),
    inset -3px -1px 3px -1px rgba(255, 255, 255, 0.7),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  transition: 0.3s;
  margin: 30px;

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
