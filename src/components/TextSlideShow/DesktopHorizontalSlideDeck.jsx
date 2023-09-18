import React from "react";
import styled from "styled-components";
import "@splidejs/react-splide/css/skyblue";
import TextSectionDesktop from "./TextSectionDesktop";
import StartQuizBtn from "../Buttons/StartQuizBtn";
import { GrLinkNext } from "react-icons/gr";
import SlideLocator from "./SlideLocator";
import "animate.css";
import { updateStartQuiz } from "../../features/CurrentBlockProgressData/currentblockprogressdata";

import { useDispatch } from "react-redux";

function DesktopHorizontalSlideDeck({
  length,
  data,
  currentslide,
  setCurrentSlide,
}) {
  const dispatch = useDispatch();
  const showbtn = { display: "block" };
  const hidebtn = { display: "none" };
  let leftbtnstyle = { hidebtn };
  let startquizbtnstyle = { hidebtn };

  const changeSlideRight = () => {
    setCurrentSlide((s) => s + 1);
  };
  const changeSlideLeft = () => {
    setCurrentSlide((s) => s - 1);
  };

  if (currentslide === 0) {
    leftbtnstyle = hidebtn;
  } else if (currentslide !== 0) {
    leftbtnstyle = showbtn;
  } else if (currentslide < 0) {
    setCurrentSlide((s) => 0);
  }

  if (currentslide === data.length - 1) {
    startquizbtnstyle = { display: "flex" };
  }

  let animateClass = "";

  switch (currentslide) {
    case 1:
      animateClass = "animate__animated animate__jello";
      break;
    case 2:
      animateClass = "animate__animated animate__rubberBand";
      break;
    case 3:
      animateClass = "animate__animated animate__shakeX";
      break;
    case 4:
      animateClass = "animate__animated animate__heartBeat";
      break;
    default:
      animateClass = "";
      break;
  }

  const positioncolorsarr = [
    "rgb(0, 255, 255, 0.2) ",
    "rgb(0, 255, 255, 0.4) ",
    "rgb(0, 255, 255, 0.6) ",
    "rgb(0, 255, 255, 0.8) ",
    "rgb(0, 255, 255, 1) ",
  ];

  let backgroundcolor = positioncolorsarr[currentslide];

  return (
    <Main>
      <Position style={{ backgroundColor: backgroundcolor }}>
        <Text
          className={animateClass}
          style={{
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          <sup style={{ padding: "4px" }}>{currentslide + 1} </sup> &#8260;
          <sub style={{ padding: "4px" }}> {data.length}</sub>
        </Text>
      </Position>

      <Left style={leftbtnstyle} onClick={changeSlideLeft}>
        <GrLinkNext style={{ width: "20px", transform: "rotate(180deg)" }} />
      </Left>
      <Wrapper>
        {data.map((item, index) => {
          return (
            <TextSectionDesktop
              currentslide={currentslide}
              setCurrentSlide={setCurrentSlide}
              length={data.length}
              index={index}
              data={item}
            ></TextSectionDesktop>
          );
        })}
      </Wrapper>
      <Right onClick={changeSlideRight}>
        <GrLinkNext />
      </Right>

      <StartQuizBtn
        style={startquizbtnstyle}
        onClick={() => {
          dispatch(updateStartQuiz());
        }}
      />
      <LocationSlider>
        {data.map((item, index) => {
          return <SlideLocator currentslide={currentslide} index={index} />;
        })}
      </LocationSlider>
    </Main>
  );
}

export default DesktopHorizontalSlideDeck;

const Main = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
`;

const Wrapper = styled.div`
  height: 700px;
  width: 80%;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: hidden;
`;

const Right = styled.button`
  position: absolute;
  top: 50%;
  right: -2%;
  width: 60px;
  height: 60px;
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

const Left = styled.button`
  // display: none;
  position: absolute;
  top: 50%;
  left: -2%;
  width: 60px;
  height: 60px;
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

const LocationSlider = styled.div`
  height: 39px;
  width: 140px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: 0.5s;
`;

const Position = styled.div`
  min-width: 50px;
  min-height: 50px;
  height: 5vw;
  width: 5vw;
  max-height: 40px;
  max-width: 40px;
  position: absolute;
  z-index: 10;
  top: 0px;
  right: 0px;
  background-color: rgba(0, 200, 200, 0.29);
  border-radius: 0px 0px 0px 40px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;
