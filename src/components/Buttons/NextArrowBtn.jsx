import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { GrLinkNext } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { updatePosition } from "../../features/TextSlideShow/textslideshowSlice";

function NextArrowBtn(props) {
  const ref = props.refVal;

  const iconStyle = {
    transform: "rotate(90deg)",
    heigh: "10px",
    width: "10px",
  };
  const [buttondisabled, setButtonDisabled] = useState(false);

  const dispatch = useDispatch();

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

  return (
    <Wrapper
      // disabled={buttondisabled}
      onClick={() => {
        dispatch(updatePosition());
        // setButtonDisabled((val) => true);
        handleContinueBtnClicked(ref);
      }}
    >
      <GrLinkNext style={iconStyle}></GrLinkNext>
    </Wrapper>
  );
}

export default NextArrowBtn;
