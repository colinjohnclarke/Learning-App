import React, { useState } from "react";
import { GrLinkNext } from "react-icons/gr";
import styled, { keyframes } from "styled-components";

function ContinueSlideBtn({
  refVal,
  currentslide,
  setCurrentSlide,
  index,
  length,
}) {
  const scrolltoFn = (elementRef) => {
    elementRef.current?.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleContinueBtnClicked = (elementRef) => {
    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 100);

    scrolltoFn(elementRef);
  };

  return (
    <Wrapper
      disabled={buttonDisabled}
      onClick={() => {
        setCurrentSlide((s) => s + 1);
        // setButtonDisabled((val) => true);
        handleContinueBtnClicked(refVal);
      }}
    >
      Continue
    </Wrapper>
  );
}

export default ContinueSlideBtn;

const Wrapper = styled.button`
  margin: 60px;
  height: 50px;
  min-width: 350px;
  border: none;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  background-color: rgba(0, 245, 245, 0.8);
  color: white;
  font-weight: 400;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    transition: 0.3s;
  }

  &:active {
    transform: translateY(2px);
    transition: 0.3s;
  }
`;
