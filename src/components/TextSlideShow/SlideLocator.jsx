import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

function SlideLocator(props) {
  const index = props.index;

  const position = useSelector((state) => state.textslideshowslice.position);

  const unSelected = {
    backgroundColor: "rgb(0, 255, 255, 0.3)",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
    height: "13px",
    width: "13px",
    transition: "0.5s",
  };

  const [locatorStyle, setLocatorStyle] = useState(unSelected);

  const selected = {
    backgroundColor: "rgb(0, 255, 255, 1)",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
    height: "18px",
    width: "18px",
    transition: "0.5s",
  };

  useEffect(() => {
    if (index === position) {
      setLocatorStyle((val) => selected);
    } else {
      setLocatorStyle((val) => unSelected);
    }
  }, [position]);

  return <Wrapper style={locatorStyle}></Wrapper>;
}

export default SlideLocator;

const Wrapper = styled.div`
  border-radius: 100%;
`;
