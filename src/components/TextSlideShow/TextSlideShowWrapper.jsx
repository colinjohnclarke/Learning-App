import React, { useState, useEffect } from "react";
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
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  if (data.length - 1 === currentslide) {
    dispatch(updateAllSlidesSeen());
  }

  dispatch(updateSlideNumber(data.length));
  dispatch(updateCurrentSlide(currentslide));

  function handleResize() {
    setWidth((width) => window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Call handleResize initially
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return (
    <Wrapper>
      {width < 550 ? (
        <MobileVerticalSlideDeck
          currentslide={currentslide}
          setCurrentSlide={setCurrentSlide}
          length={length}
          data={data}
        />
      ) : (
        <DesktopHorizontalSlideDeck
          currentslide={currentslide}
          setCurrentSlide={setCurrentSlide}
          length={length}
          data={data}
        />
      )}
    </Wrapper>
  );
}

export default TextSlideShowWrapper;

const Wrapper = styled.div`
  width: 100%;
`;
