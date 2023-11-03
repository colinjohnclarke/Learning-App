import React from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../../components/functions/AnimateCountFunction";

function AllTimeLearningTimeBox({ data }) {
  let allTimeLearningTime = data?.user.totalTimeElapsed / 1000 / 60;

  // let allTimeLearningTime = 300;

  let counter = 0;

  // if (allTimeLearningTime > 60) {
  //   allTimeLearningTime = data?.user.totalTimeElapsed / 1000 / 60 / 60;
  // }

  if (allTimeLearningTime) {
    const animiationCounter = AnimateCountFunction(allTimeLearningTime);
    counter = animiationCounter.counter;
  }

  return (
    <Wrapper>
      <Points>{counter} mins </Points> total time
    </Wrapper>
  );
}

export default AllTimeLearningTimeBox;

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

const Points = styled.div`
  color: rgb(0, 255, 0);
  font-weight: 700;
  font-size: 12px;
`;
