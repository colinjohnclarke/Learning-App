import React, { useContext } from "react";
import styled from "styled-components";
import "@splidejs/react-splide/css/skyblue";
import TextSectionDesktop from "./TextSectionDesktop";
// import StartQuizBtn from "../Buttons/StartQuizBtn";
import { GrLinkNext } from "react-icons/gr";
import SlideLocator from "./SlideLocator";
import "animate.css";
// import { updateStartQuiz } from "../../features/CurrentBlockProgressData/currentblockprogressdata";
import SlideShowNavBtn from "../Buttons/SlideShowNavBtn";
import { device } from "../../styles/breakpoints";
import { useDispatch } from "react-redux";
import { GrNext } from "react-icons/gr";
import { FcNext } from "react-icons/fc";

function DesktopHorizontalSlideDeck({
  length,
  data,
  currentslide,
  setCurrentSlide,
}) {
  const dispatch = useDispatch();
  const showLeftBtn = { display: "block", left: "8px" };
  const showRightBtn = { display: "block", right: "8px" };
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
    leftbtnstyle = showLeftBtn;
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

  const positioncolorsarr = ["rgb(0, 240, 240, 1) "];

  let backgroundcolor = positioncolorsarr[currentslide];

  return (
    <Main>
      <SlideShowNavBtn style={leftbtnstyle} onClick={changeSlideLeft}>
        <FcNext size={50} style={{ transform: "rotate(180deg)" }} />
      </SlideShowNavBtn>
      <Wrapper>
        <Position style={{ backgroundColor: "rgb(0, 240, 240, 1)" }}>
          <Text
            className={animateClass}
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: "16px",
            }}
          >
            <sup
              style={{
                padding: "5px",
                color: "white",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {currentslide + 1}{" "}
            </sup>{" "}
            &#8260;
            <sub
              style={{
                padding: "5px",
                color: "white",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {" "}
              {data.length}
            </sub>
          </Text>
        </Position>
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

      <SlideShowNavBtn style={showRightBtn} onClick={changeSlideRight}>
        <FcNext size={50} />
      </SlideShowNavBtn>

      {/* <StartQuizBtn
        style={startquizbtnstyle}
        onClick={() => {
          dispatch(updateStartQuiz());
        }}
      /> */}
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
  padding-top: 40px;
  overflow: hidden;

  @media ${device.mobileL} {
    padding-top: 40px;
  }
`;

const Wrapper = styled.div`
  height: 900px;
  width: 100%;
  display: flex;
  flex-direction: row;
  // position: relative;
  overflow: hidden;
`;

const LocationSlider = styled.div`
  // height: 39px;
  width: 140px;
  // margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.5s;

  @media ${device.mobileL} {
    position: absolute;
    bottom: 15%;
  }
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
