import { fontWeight } from "@mui/system";
import React from "react";
import styled from "styled-components";

function Score(props) {
  return (
    <Wrapper>
      <p style={{ fontSize: "16px", fontWeight: "bold" }}>
        <sup>2</sup> &#8260; <sub>3</sub>
      </p>
    </Wrapper>
  );
}

export default Score;

const Wrapper = styled.div`
  background-color: rgba(0, 200, 200, 0.29);
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  min-height: 50px;
  height: 8vw;
  width: 8vw;
  max-height: 70px;
  max-width: 70px;
  position: absolute;
  z-index: 10;
  top: 0px;
  right: 0px;
  border-radius: 0px 0px 0px 40px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
