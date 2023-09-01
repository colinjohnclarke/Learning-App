import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import "@splidejs/react-splide/css/skyblue";
import TextSectionDesktop from "./TextSectionDesktop";
import StartQuizBtn from "../Buttons/StartQuizBtn";
import {
  moveDesktopPositionForward,
  moveDesktopPositionBack,
  updateCompletedSlideShow,
  resetPosition,
} from "./../../features/TextSlideShow/textslideshowSlice";
import { useDispatch, useSelector } from "react-redux";
import { GrLinkNext } from "react-icons/gr";
import { device } from "../../styles/breakpoints";
import SlideLocator from "./SlideLocator";
import "animate.css";

function DesktopHorizontalSlideDeck(props) {
  const length = props.length;
  const data = props.data;
  const builder = imageUrlBuilder(sanityClient);
  const dispatch = useDispatch();
  const position = useSelector((state) => state.textslideshowslice.position);
  const showbtn = { display: "block" };
  const hidebtn = { display: "none" };

  const [leftbtnstyle, setLeftBtnStyle] = useState(hidebtn);
  const [startquizbtnstyle, setStartQuizBtnStyle] = useState(hidebtn);

  const [animateclass, setAimateClass] = useState();

  function imgurlFor(source) {
    return builder.image(source);
  }

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={imgurlFor(props.value.asset).width(300)} alt="" />
        </div>
      ),
      marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        em: ({ children }) => (
          <em className="text-gray-600 font-semibold">{children}</em>
        ),
      },
    },
  };

  const changeSlideRight = () => {
    dispatch(moveDesktopPositionForward());
  };
  const changeSlideLeft = () => {
    dispatch(moveDesktopPositionBack());
  };

  useEffect(() => {
    if (position === 0) {
      setLeftBtnStyle((val) => hidebtn);
    } else if (position !== 0) {
      setLeftBtnStyle((val) => showbtn);
    } else if (position < 0) {
      dispatch(resetPosition());
    }

    if (position === data.length - 1) {
      setStartQuizBtnStyle((val) => ({ display: "flex" }));
      console.log("setStartQuizBtnStyle((val) => showbtn);");
    }

    console.log(data.length - 1);
    console.log("position ", position);

    switch (position) {
      case 1:
        setAimateClass("animate__animated animate__jello");
        break;
      case 2:
        setAimateClass("animate__animated animate__rubberBand");
        break;
      case 3:
        setAimateClass("animate__animated animate__shakeX");
        break;

      case 4:
        setAimateClass("animate__animated animate__heartBeat");
        break;

      default:
        setAimateClass("");
        break;
    }
  }, [position]);

  const positioncolorsarr = [
    "rgb(0, 255, 255, 0.2) ",
    "rgb(0, 255, 255, 0.4) ",
    "rgb(0, 255, 255, 0.6) ",
    "rgb(0, 255, 255, 0.8) ",
    "rgb(0, 255, 255, 1) ",
  ];

  let backgroundcolor = positioncolorsarr[position];

  return (
    <Main>
      <Position style={{ backgroundColor: backgroundcolor }}>
        <Text
          className={animateclass}
          style={{
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          <sup style={{ padding: "4px" }}>{position + 1} </sup> &#8260;
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
          dispatch(updateCompletedSlideShow());
        }}
      />
      <LocationSlider>
        {data.map((item, index) => {
          return <SlideLocator index={index} />;
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
