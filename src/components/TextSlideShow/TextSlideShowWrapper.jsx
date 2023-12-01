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
  const filterEmptySlideContent = data.filter((item) => item !== null);
  console.log(
    "🚀 ~ file: TextSlideShowWrapper.jsx:19 ~ TextSlideShowWrapper ~ filterEmptySlideContent:",
    filterEmptySlideContent
  );

  const [currentslide, setCurrentSlide] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

  if (filterEmptySlideContent.length - 1 === currentslide) {
    dispatch(updateAllSlidesSeen());
  }

  dispatch(updateSlideNumber(filterEmptySlideContent.length));
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
          data={filterEmptySlideContent}
        />
      ) : (
        <DesktopHorizontalSlideDeck
          currentslide={currentslide}
          setCurrentSlide={setCurrentSlide}
          length={length}
          data={filterEmptySlideContent}
        />
      )}
    </Wrapper>
  );
}

export default React.memo(TextSlideShowWrapper);

const Wrapper = styled.div`
  // padding: 40px;
  width: 100%;

`;
