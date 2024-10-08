import React from "react";
import styled from "styled-components";
import ContinueSlideBtn from "../Buttons/ContinueSlideBtn";
import "animate.css";
import BlockText from "../../config/sanity/BlockText";
import { useSelector, useDispatch } from "react-redux";
import { updateAllSlidesSeen } from "../../redux/CurrentBlockProgressData/currentblockprogressdata";

function TextSection({
  data,
  index,
  length,
  refVal,
  itemRef,
  currentslide,
  setCurrentSlide,
}) {
  let animateSection = "";

  const dispatch = useDispatch();
  const allslideseen = useSelector(
    (state) => state.currentblockprogressdata.allSlidesSeen
  );


  const currentblockprogressdata = useSelector(
    (state) => state.currentblockprogressdata
  );

  let textStyle = {
    display: "none",
    flexDirection: "column",
    transition: "0.3s",
  };

  const scrolltoFn = (elementRef) => {
    elementRef.current?.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };
  if (index <= currentslide) {
    textStyle = { padding: "flex", transition: "0.3s" };
    animateSection = "animate__animated animate__fadeIn animate__slow";
  }

  if (
    currentblockprogressdata.currentSlide < currentblockprogressdata.slideNumber
  ) {
    scrolltoFn(refVal);
  }

  return (
    <Wrapper ref={itemRef} className={animateSection} style={textStyle}>
      <BlockText data={data}></BlockText>
    </Wrapper>
  );
}

export default TextSection;

const Wrapper = styled.section`
  padding-top: 5vh;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  min-height: 90vh;
`;

// <StartQuizBtn
//   // style={startquizbtnstyle}
//   onClick={() => {
//     dispatch(updateStartQuiz());
//   }}
// />
