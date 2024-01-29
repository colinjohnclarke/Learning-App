import React from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../../components/functions/AnimateCountFunction";
import { GoQuestion } from "react-icons/go";
function AllTimeQuestionsAnsweredBox({ data }) {
  const questionAttempted = data;
  let counter = 0;

  if (questionAttempted) {
    const animiationCount = AnimateCountFunction(questionAttempted);

    counter = animiationCount.counter;
  }

  return (
    <Wrapper>
      <Points>{counter}</Points>
      <div style={{ height: "10px" }}></div>
      Questions
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
  justify-content: space-between;
  flex-direction: column;
  font-size: 15px;
`;

const Points = styled.div`
  color: blue;
  font-weight: 700;
  font-size: 16px;
`;
