import React from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import NextArrowBtn from "../Buttons/NextArrowBtn";
import "animate.css";
import StartQuizBtn from "../Buttons/StartQuizBtn";
import SlideLocator from "./SlideLocator";
import { myPortableTextComponents } from "../../config/sanity/portableText";
import { useDispatch } from "react-redux";
import { updateStartQuiz } from "../../features/CurrentBlockProgressData/currentblockprogressdata";
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
  const dispatch = useDispatch();
  let animateSection = "";

  let textStyle = {
    display: "none",
    flexDirection: "column",
    transition: "0.3s",
  };

  if (index <= currentslide) {
    textStyle = { padding: "flex", transition: "0.3s" };
    animateSection = "animate__animated animate__fadeInLeftBig animate__fast";
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
      {/* <PortableText
        value={data}
        components={myPortableTextComponents}
      ></PortableText> */}

      <BlockText data={data}></BlockText>

      {index !== length - 1 ? (
        continueArrowButton
      ) : (
        <StartQuizBtn
          // style={startquizbtnstyle}
          onClick={() => {
            dispatch(updateStartQuiz());
          }}
        />
      )}
    </Wrapper>
  );
}

export default TextSection;

const Wrapper = styled.section`
  padding-top: 5vh;
  //   margin-top: 5vh;
  margin-left: 7px;
  margin-right: 7px;
  border-bottom: 0.5px solid grey;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  //   justify-content: space-between;
  align-items: center;
`;
