import React, { useRef } from "react";
import styled from "styled-components";

import TextSection from "./TextSection";
import { device } from "../../styles/breakpoints";

function MobileVerticalSlideDeck(props) {
  const length = props.length;
  const data = props.data;
  console.log(
    "🚀 ~ file: MobileVeriticalSlideDeck.jsx:9 ~ MobileVerticalSlideDeck ~ props:",
    props
  );

  const item1listRef = useRef(null);
  const item2listRef = useRef(null);
  const item3listRef = useRef(null);
  const item4listRef = useRef(null);
  const item5listRef = useRef(null);
  const item6listRef = useRef(null);
  const item7listRef = useRef(null);

  const scrolltoFn = (elementRef) => {
    elementRef.current?.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };

  const handleContinueBtnClicked = (elementRef) => {
    // setTimeout(() => {
    //   scrolltoFn(elementRef);
    // }, 100);

    scrolltoFn(elementRef);
  };

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
      <Section>
        <TextSection
          length={length}
          refVal={refArr[index + 1]}
          refdata={refArr[index]}
          data={item}
          index={index}
        />
      </Section>
    );
  });

  return <div>{textArr}</div>;
}

export default MobileVerticalSlideDeck;

const Section = styled.section``;
