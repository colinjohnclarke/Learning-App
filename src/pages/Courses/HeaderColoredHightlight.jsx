import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";

function HeaderColoredHightlight({ content }) {
  return (
    <HeaderContent>
      {" "}
      <h2
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: "13px",
          paddingLeft: "10px",
        }}
      >
        {content}
      </h2>{" "}
    </HeaderContent>
  );
}

export default HeaderColoredHightlight;

const HeaderContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;

  transition: 0.3s;

  background-image: linear-gradient(
    -225deg,
    rgb(142, 45, 226, 0.5) 0%,
    rgb(74, 0, 224, 0.5) 20%,
    rgb(74, 0, 224, 0.5) 30%,
    rgba(0, 200, 200, 0.7) 100%
  );

  border-radius: 5px;
  // margin: 5px;

  width: 100%;

  @media ${device.tablet} {
    width: 100%;
  }
`;
