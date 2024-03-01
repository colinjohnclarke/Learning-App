import React from "react";
import styled from "styled-components";
import NextArrowBtn from "../Buttons/NextArrowBtn";
import "animate.css";
import BlockText from "../../config/sanity/BlockText";

function TextSection({
  data,
  index,
  length,
  refVal,
  refdata,
  currentslide,
  setCurrentSlide,
}) {
  let animateSection = "";

  let textStyle = {
    display: "none",
    flexDirection: "column",
    transition: "0.3s",
  };

  if (index <= currentslide) {
    textStyle = { padding: "flex", transition: "0.3s" };
    animateSection = "animate__animated animate__fadeIn";
  }

  const continueArrowButton = (
    <NextArrowBtn
      currentslide={currentslide}
      setCurrentSlide={setCurrentSlide}
      refVal={refVal}
    ></NextArrowBtn>
  );

  return (
    <Wrapper ref={refdata} className={animateSection} style={textStyle}>
      <BlockText data={data}></BlockText>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {index + 1 !== length && continueArrowButton}
      </div>
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
