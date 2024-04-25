import React, { useRef } from "react";
import TextSection from "./TextSection";
import { useDispatch } from "react-redux";
import { updateCurrentSlide } from "../../redux/CurrentBlockProgressData/currentblockprogressdata";

function MobileVerticalSlideDeck({
  length,
  data,
  currentslide,
  setCurrentSlide,
  slidesrefArr,
}) {
  const dispatch = useDispatch();

  dispatch(updateCurrentSlide(currentslide));

  const textArr = data?.map((item, index) => {
    return (
      <div key={index} style={{ padding: "5px" }}>
        <TextSection
          currentslide={currentslide}
          setCurrentSlide={setCurrentSlide}
          length={length}
          refVal={slidesrefArr[index + 1]}
          itemRef={slidesrefArr[index]}
          data={item}
          index={index}
        />
      </div>
    );
  });

  return <div>{textArr}</div>;
}

export default MobileVerticalSlideDeck;
