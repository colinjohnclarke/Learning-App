import React from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../../components/functions/AnimateCountFunction";

function AllTimeQuestionsAnsweredBox({ data }) {
  const questionAttempted = data?.user.totalQuestionsAttempted;
  let counter = 0;

  if (questionAttempted) {
    const animiationCount = AnimateCountFunction(questionAttempted);

    counter = animiationCount.counter;
  }

  return (
    <Wrapper>
      <Points>{counter}</Points> Questions Correct
    </Wrapper>
  );
}

export default AllTimeQuestionsAnsweredBox;

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
  color: rgb(0, 255, 255);
  font-weight: 700;
  font-size: 12px;
`;
