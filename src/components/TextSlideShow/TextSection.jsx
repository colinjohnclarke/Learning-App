import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import NextArrowBtn from "../Buttons/NextArrowBtn";
import { useSelector } from "react-redux";
import "animate.css";
import { device } from "../../styles/breakpoints";
import StartQuizBtn from "../Buttons/StartQuizBtn";
import { useDispatch } from "react-redux";
import { updateCompletedSlideShow } from "../../features/TextSlideShow/textslideshowSlice";
import SlideLocator from "./SlideLocator";

function TextSection(props) {
  const data = props.data;
  const index = props.index;
  const length = props.length;

  const refdata = props.refdata;
  const refVal = props.refVal;

  const [textStyle, setTextStyle] = useState({
    display: "none",
    flexDirection: "column",
    transition: "0.3s",
  });
  const displayItemStyle = {
    padding: "flex",
    transition: "0.3s",
    // paddingTop: "45px",
  };

  const dispatch = useDispatch();

  const [animateSection, setAnimateSection] = useState("");

  const positionVal = useSelector((state) => state.textslideshowslice.position);

  const builder = imageUrlBuilder(sanityClient);

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
    if (index === positionVal) {
      setTextStyle((val) => displayItemStyle);
      setAnimateSection(
        (val) => "animate__animated animate__fadeInLeftBig animate__fast"
      );
    }
  }, [positionVal]);

  const continueArrowButton = <NextArrowBtn refVal={refVal}></NextArrowBtn>;

  return (
    <Wrapper ref={refdata} className={animateSection} style={textStyle}>
      <PortableText
        value={data}
        components={myPortableTextComponents}
      ></PortableText>

      {index !== length - 1 ? (
        continueArrowButton
      ) : (
        <StartQuizBtn
          onClick={() => {
            dispatch(updateCompletedSlideShow());
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
