import React from "react";
import styled from "styled-components";
import AnimateCountFunction from "../../../components/functions/AnimateCountFunction";

function AllTimeXPBox({ data }) {
  let totalXP;
  if (data) {
    totalXP = data;
  }

  let counter = 0;

  if (totalXP) {
    const animateXP = AnimateCountFunction(totalXP);

    counter = animateXP.counter;
  }

  return (
    <Wrapper>
      <XP>{counter} Xp </XP>
      <div style={{ height: "10px" }}></div>
      Scored
    </Wrapper>
  );
}

export default AllTimeXPBox;

const Wrapper = styled.p`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  font-size: 15px;
`;

const XP = styled.div`
  color: rgb(0, 255, 255);
  font-weight: 700;
  font-size: 16px;
`;
