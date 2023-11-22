import React from "react";
import styled from "styled-components";

function SlideLocator({ index, currentslide }) {
  const unSelected = {
    backgroundColor: "rgb(0, 255, 255, 0.3)",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
    height: "13px",
    width: "13px",
    transition: "0.5s",
  };

  let locatorStyle = unSelected;

  const selected = {
    backgroundColor: "rgb(0, 255, 255, 1)",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    height: "18px",
    width: "18px",
    transition: "0.5s",
  };

  if (index === currentslide) {
    locatorStyle = selected;
  } else {
    locatorStyle = unSelected;
  }

  return <Wrapper style={locatorStyle}></Wrapper>;
}

export default SlideLocator;

const Wrapper = styled.div`
  border-radius: 100%;
  position: relative;
`;
