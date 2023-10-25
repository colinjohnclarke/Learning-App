import React from "react";
import styled from "styled-components";
import BlockText from "../../config/sanity/BlockText";

function TextSectionDesktop({
  data,
  index,
  length,
  currentslide,
  setCurrentSlide,
}) {
  let translateStartPosition = index * 100;

  translateStartPosition = (index - currentslide) * 100;

  if (currentslide === length) {
    setCurrentSlide((s) => 0);
  }

  return (
    <Wrapper
      style={{
        position: "absolute",
        transition: "0.5s",
        width: "100%",
        transform: `translateX(${translateStartPosition}%)`,
        overflow: "hidden",
        // padding: "40px",
      }}
    >
      <Wrapper
        style={{
          padding: "40px",
          overflow: "hidden",
        }}
      >
        <BlockText data={data}></BlockText>
      </Wrapper>
    </Wrapper>
  );
}

export default TextSectionDesktop;

const Wrapper = styled.section`
  // display: flex;
  // flex-direction: column;
  // overflow: hidden;
`;
