import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AnimateCountFunction from "../../functions/AnimateCountFunction";

function BlockQuestionsCorrect() {
  let userScore = useSelector(
    (state) => state.currentblockprogressdata.userScore
  );

  // function to send the X points to be stored in DB

  const { counter } = AnimateCountFunction(userScore);

  return (
    <Wrapper>
      <p style={{ fontWeight: "700" }}> </p>
      <p style={{ fontWeight: "700" }}> {counter} questions attempted</p>
    </Wrapper>
  );
}

export default BlockQuestionsCorrect;

const Wrapper = styled.div`
  height: 60px;
  width: 250px;
  border-radius: 4px;
  // background-color: white;
  background-color: rgba(239, 239, 249, 1);
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
