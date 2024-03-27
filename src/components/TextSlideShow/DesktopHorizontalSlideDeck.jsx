import React, { useContext } from "react";
import styled from "styled-components";
import "@splidejs/react-splide/css/skyblue";
import TextSectionDesktop from "./TextSectionDesktop";

import SlideLocator from "./SlideLocator";
import "animate.css";
// import { updateStartQuiz } from "../../features/CurrentBlockProgressData/currentblockprogressdata";
import SlideShowNavBtn from "../Buttons/SlideShowNavBtn";
import { device } from "../../styles/breakpoints";
import { useDispatch } from "react-redux";
import { FcNext } from "react-icons/fc";
import SlidePosition from "./SlidePosition";
import { updateCurrentSlide } from "../../redux/CurrentBlockProgressData/currentblockprogressdata";

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

  dispatch(updateCurrentSlide(currentslide));

  if (currentslide === 0) {
    leftbtnstyle = hidebtn;
  } else if (currentslide !== 0) {
    leftbtnstyle = showLeftBtn;
  } else if (currentslide < 0) {
    setCurrentSlide((s) => 0);
  }

  if (currentslide === data?.length - 1) {
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
      <SlidePosition
        animateClass={animateClass}
        currentslide={currentslide}
        data={data}
      ></SlidePosition>
      <Wrapper>
        {data?.map((item, index) => {
          return (
            <TextSectionDesktop
              currentslide={currentslide}
              setCurrentSlide={setCurrentSlide}
              length={data?.length}
              index={index}
              data={item}
            ></TextSectionDesktop>
          );
        })}
      </Wrapper>

      <SlideShowNavBtn style={showRightBtn} onClick={changeSlideRight}>
        <FcNext size={50} />
      </SlideShowNavBtn>

      <LocationSlider>
        {data?.map((item, index) => {
          return <SlideLocator currentslide={currentslide} index={index} />;
        })}
      </LocationSlider>
    </Main>
  );
}

export default React.memo(DesktopHorizontalSlideDeck);

const Main = styled.div`
  height: auto;
  display: flex;
  width: 100%;
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
