import React, { useState } from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../functions/AnimateCountFunction";

function AnimateTime({data}) {

  let allTimeLearningTime = data?.user.totalTimeElapsed / 1000 / 60;

  const totalXP = data?.user.totalXP;

  let counter = 0;

  if (totalXP) {
    const animateXP = AnimateCountFunction(totalXP);

    counter = animateXP.counter;
  }

  return (
    <Wrapper>
      <Time>{counter}</Time> All time XP
    </Wrapper>
  );
}

export default AnimateTime;

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

const Time = styled.div`
  color: blue;
  font-weight: 700;
  font-size: 16px;
`;
