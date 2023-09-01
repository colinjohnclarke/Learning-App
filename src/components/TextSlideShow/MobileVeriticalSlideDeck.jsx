import React, { useRef } from "react";
import styled from "styled-components";

import TextSection from "./TextSection";
import { device } from "../../styles/breakpoints";
import SlideLocator from "./SlideLocator";

function MobileVerticalSlideDeck(props) {
  const length = props.length;
  const data = props.data;

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
      <Wrapper>
        <Section>
          <TextSection
            length={length}
            refVal={refArr[index + 1]}
            refdata={refArr[index]}
            data={item}
            index={index}
          />
        </Section>
      </Wrapper>
    );
  });

  return <div>{textArr}</div>;
}

export default MobileVerticalSlideDeck;

const Section = styled.section`
  padding: 20px;
`;

const LocationSlider = styled.div`
  height: 39px;
  width: 140px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  transition: 0.5s;
`;

const Wrapper = styled.div``;
