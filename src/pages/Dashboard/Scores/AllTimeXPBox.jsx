import React, { useState } from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../../components/functions/AnimateCountFunction";

function AllTimeXPBox({ data }) {
  const totalXP = data?.user.totalXP;

  let counter = 0;

  if (totalXP) {
    const animateXP = AnimateCountFunction(totalXP);

    counter = animateXP.counter;
  }

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
  justify-content: space-between;
  flex-direction: column;
  font-size: 15px;
`;

const XP = styled.div`
  color: blue;
  font-weight: 700;
  font-size: 16px;
`;
