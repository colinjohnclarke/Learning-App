import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "animate.css";
import AnimateCountFunction from "../../functions/AnimateCountFunction";

import { correctstyle } from "../../../styles/colors";

function ExperiencePoints() {
  const percentageScore = useSelector(
    (state) => state.currentblockprogressdata.percentageScore
  );

  const { counter, animateclass } = AnimateCountFunction(percentageScore);

  return (
    <Wrapper
      style={animateclass !== "" ? correctstyle : {}}
      className={animateclass}
    >
      <p style={{ fontWeight: "700" }}> Result {"   "} </p>
      <p style={{ fontWeight: "700" }}>
        {"   "} + {counter * 10}
      </p>
      <p style={{ fontWeight: "700" }}> XP</p>
    </Wrapper>
  );
}

export default ExperiencePoints;

const Wrapper = styled.div`
  height: 60px;
  width: 250px;
  border-radius: 5px;
  background-color: white;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;
