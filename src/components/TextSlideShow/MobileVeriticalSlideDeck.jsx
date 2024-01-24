import React, { useRef } from "react";
import TextSection from "./TextSection";

function MobileVerticalSlideDeck({
  length,
  data,
  currentslide,
  setCurrentSlide,
}) {
  const refArr = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const textArr = data.map((item, index) => {
    return (
      <div key={index} style={{ padding: "5px" }}>
        <TextSection
          currentslide={currentslide}
          setCurrentSlide={setCurrentSlide}
          length={length}
          refVal={refArr[index + 1]}
          refdata={refArr[index]}
          data={item}
          index={index}
        />
      </div>
    );
  });

  return <div>{textArr}</div>;
}

export default MobileVerticalSlideDeck;
