import React from "react";
import styled from "styled-components";

function SlidePosition({ animateClass, currentslide, data }) {
  return (
    <Position style={{ backgroundColor: "rgb(0, 240, 240, 1)" }}>
      <Text
        className={animateClass}
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: "16px",
        }}
      >
        <sup
          style={{
            padding: "5px",
            color: "white",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          {currentslide + 1}{" "}
        </sup>{" "}
        &#8260;
        <sub
          style={{
            padding: "5px",
            color: "white",
            fontWeight: "500",
            fontSize: "16px",
          }}
        >
          {" "}
          {data.length}
        </sub>
      </Text>
    </Position>
  );
}

export default SlidePosition;

const Position = styled.div`
  min-width: 50px;
  min-height: 50px;
  height: 5vw;
  width: 5vw;
  max-height: 40px;
  max-width: 40px;
  position: absolute;
  z-index: 10;
  top: 0px;
  right: 0px;
  background-color: rgba(0, 245, 245, 1);
  border-radius: 5px 5px 5px 40px;
  box-shadow: 0px 0px 20px 4px rgba(174, 196, 216, 0.25);
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`;
