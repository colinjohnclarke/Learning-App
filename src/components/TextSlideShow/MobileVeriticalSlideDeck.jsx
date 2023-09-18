import React, { useRef } from "react";
import TextSection from "./TextSection";

function MobileVerticalSlideDeck({
  length,
  data,
  currentslide,
  setCurrentSlide,
}) {
  const item1listRef = useRef(null);
  const item2listRef = useRef(null);
  const item3listRef = useRef(null);
  const item4listRef = useRef(null);
  const item5listRef = useRef(null);
  const item6listRef = useRef(null);
  const item7listRef = useRef(null);

  const textArr = data.map((item, index) => {
    const refArr = [
      item1listRef,
      item2listRef,
      item3listRef,
      item4listRef,
      item5listRef,
      item6listRef,
    ];

    return (
      <div key={index} style={{ padding: "20px" }}>
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
