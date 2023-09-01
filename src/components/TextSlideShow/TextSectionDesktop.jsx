import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import NextArrowBtn from "../Buttons/NextArrowBtn";
import { useSelector, useDispatch } from "react-redux";
import {
  moveDesktopPositionForward,
  moveDesktopPositionBack,
} from "./../../features/TextSlideShow/textslideshowSlice";
import "animate.css";
import { device } from "../../styles/breakpoints";
import StartQuizBtn from "../Buttons/StartQuizBtn";
import {
  updateCompletedSlideShow,
  resetPosition,
  settoLastSlide,
} from "../../features/TextSlideShow/textslideshowSlice";

function TextSectionDesktop(props) {
  const data = props.data;
  const index = props.index;
  const length = props.length;

  const position = useSelector((state) => state.textslideshowslice.position);
  const dispatch = useDispatch();

  const refdata = props.refdata;
  const refVal = props.refVal;
  const builder = imageUrlBuilder(sanityClient);

  const [translateStartPosition, setTranslateStartingPosition] = useState(
    index * 100
  );

  let slide = {
    position: "absolute",
    paddingTop: "20px",

    // margin: 20%;
    width: "100%",
    height: "700px",
    transition: "0.5s",
    transform: `translateX(${translateStartPosition}%)`,
  };

  const [slidestyle, setSlideStyle] = useState(slide);

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

  useEffect(() => {
    setTranslateStartingPosition((val) => (index - position) * 100);

    if (position === length) {
      dispatch(resetPosition());
    }

    setSlideStyle((val) => slide);
  }, [position, translateStartPosition]);

  return (
    <Slide
      style={slidestyle}
      onClick={() => {
        dispatch(moveDesktopPositionForward());
      }}
    >
      <PortableText
        value={data}
        components={myPortableTextComponents}
      ></PortableText>
    </Slide>
  );
}

export default TextSectionDesktop;

let Slide = styled.div``;
