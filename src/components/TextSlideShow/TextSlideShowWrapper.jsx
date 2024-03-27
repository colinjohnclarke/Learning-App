import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MobileVerticalSlideDeck from "./MobileVeriticalSlideDeck";
import DesktopHorizontalSlideDeck from "./DesktopHorizontalSlideDeck";
import { useDispatch } from "react-redux";
import {
  updateCurrentSlide,
  updateAllSlidesSeen,
  updateSlideNumber,
  updateIsDesktopSlideShow,
} from "../../redux/CurrentBlockProgressData/currentblockprogressdata";

function TextSlideShowWrapper({
  data,
  currentslide,
  setCurrentSlide,
  slidesrefArr,
}) {
  const filterEmptySlideContent = data?.filter((item) => item !== null);

  const [width, setWidth] = useState(window.innerWidth);
  const [currentSlidesDesktop, setCurrentSlideDesktop] = useState(0);
  const dispatch = useDispatch();

  if (filterEmptySlideContent?.length - 1 === currentslide) {
    // dispatch(updateAllSlidesSeen());
  }

  dispatch(updateSlideNumber(filterEmptySlideContent?.length));

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

  useEffect(() => {
    if (width < 550) {
      dispatch(updateIsDesktopSlideShow(false));
    } else {
      dispatch(updateIsDesktopSlideShow(true));
    }
  }, [width]);

  return (
    <Wrapper>
      {width < 550 ? (
        <MobileVerticalSlideDeck
          slidesrefArr={slidesrefArr}
          currentslide={currentslide}
          setCurrentSlide={setCurrentSlide}
          length={filterEmptySlideContent?.length}
          data={filterEmptySlideContent}
        />
      ) : (
        <DesktopHorizontalSlideDeck
          currentslide={currentSlidesDesktop}
          setCurrentSlide={setCurrentSlideDesktop}
          length={filterEmptySlideContent?.length}
          data={filterEmptySlideContent}
        />
      )}
    </Wrapper>
  );
}

export default React.memo(TextSlideShowWrapper);

const Wrapper = styled.div`
  width: 100%;
`;
