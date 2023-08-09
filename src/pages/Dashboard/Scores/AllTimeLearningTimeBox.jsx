import React from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../../components/functions/AnimateCountFunction";

function AllTimeLearningTimeBox() {
  const learningTime = "8hr 2min";

  const { counter } = AnimateCountFunction(20);

  return (
    <Wrapper>
      <Points>{counter} hours </Points> total time
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
