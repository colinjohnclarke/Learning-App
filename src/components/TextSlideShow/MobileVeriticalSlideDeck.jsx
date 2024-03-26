import React, { useRef } from "react";
import TextSection from "./TextSection";

function MobileVerticalSlideDeck({
  length,
  data,
  currentslide,
  setCurrentSlide,
  slidesrefArr,
}) {
  const textArr = data.map((item, index) => {
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
