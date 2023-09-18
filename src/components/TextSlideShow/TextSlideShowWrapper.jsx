import React, { useState } from "react";
import styled from "styled-components";
import MobileVerticalSlideDeck from "./MobileVeriticalSlideDeck";
import DesktopHorizontalSlideDeck from "./DesktopHorizontalSlideDeck";
import { useDispatch } from "react-redux";
import {
  updateCurrentSlide,
  updateAllSlidesSeen,
  updateSlideNumber,
} from "../../features/CurrentBlockProgressData/currentblockprogressdata";

function TextSlideShowWrapper({ data, length }) {
  const [currentslide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  if (data.length - 1 === currentslide) {
    dispatch(updateAllSlidesSeen());
  }

  dispatch(updateSlideNumber(data.length));

  dispatch(updateCurrentSlide(currentslide));

  let content;

  if (window.innerWidth < 700) {
    content = (
      <MobileVerticalSlideDeck
        currentslide={currentslide}
        setCurrentSlide={setCurrentSlide}
        length={length}
        data={data}
      ></MobileVerticalSlideDeck>
    );
  } else {
    content = (
      <DesktopHorizontalSlideDeck
        currentslide={currentslide}
        setCurrentSlide={setCurrentSlide}
        length={length}
        data={data}
      ></DesktopHorizontalSlideDeck>
    );
  }

  return <Wrapper>{content}</Wrapper>;
}

export default TextSlideShowWrapper;

const Wrapper = styled.div`
  width: 100vw;
  max-width: 1000px;
  height: auto;
`;
