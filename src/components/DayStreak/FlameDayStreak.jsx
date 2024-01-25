import { fontFamily } from "@mui/system";
import React from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

function FlameDayStreak() {
  return (
    <Wrapper>
      <div class="flameContainer">
        <div class="red flame"></div>
        <div class="orange flame"></div>
        <div class="yellow flame"></div>
        <div class="white flame">
          {" "}
          <div></div>
          <p style={{ fontSize: "13px", color: "white" }}>5</p>
        </div>
      </div>
      <p style={{ fontSize: "13px" }}> &nbsp; </p>
      <Mobile> days</Mobile>
      <Streak> day streak</Streak>
    </Wrapper>
  );
}

export default FlameDayStreak;

const Wrapper = styled.div`
  display: flex;
`;

const Streak = styled.p`
  display: none;

  @media (min-width: 500px) {
    display: block;
    font-size: 13px;
  }
`;

const Mobile = styled.p`
  font-size: 13px;

  @media (min-width: 500px) {
    display: none;
  }
`;
