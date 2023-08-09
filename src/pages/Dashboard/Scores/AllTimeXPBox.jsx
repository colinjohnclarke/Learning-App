import React, { useState } from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../../components/functions/AnimateCountFunction";

function AllTimeXPBox() {
  const XPoints = 30;

  const { counter } = AnimateCountFunction(XPoints);

  return (
    <Wrapper>
      <XP>{counter}</XP> All time XP
    </Wrapper>
  );
}

export default AllTimeXPBox;

const Wrapper = styled.p`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  font-size: 12px;
`;

const XP = styled.div`
  color: blue;
  font-weight: 700;
  font-size: 12px;
`;
