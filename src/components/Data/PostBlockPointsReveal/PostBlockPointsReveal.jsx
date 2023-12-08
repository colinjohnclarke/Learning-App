import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ContinueBtn from "../../Buttons/ContinueBtn";

import AnimatedBlockScore from "../CurrentBlockScores/AnimatedBlockScore";
import PointsSummary from "./PointsSummary";
import "animate.css";
import NativatetoDashBoard from "../../Buttons/NativatetoDashBoard";

function PostBlockPointsReveal() {
  const [displayAnimateBlockScore, setdisplayAnimateBlockScore] =
    useState(true);

  const [displaySummary, setDisplaySummary] = useState(false);
  // data to send to db from redux store

  let blockCompleted = useSelector(
    (state) => state.currentblockprogressdata.blockCompleted
  );

  const animatedBlockProgressScore = (
    <PercentageScoreRevealAnimate
      className={
        displayAnimateBlockScore
          ? "animate__animated animate__backInRight"
          : "animate__animated animate__backOutLeft"
      }
    >
      <AnimatedBlockScore></AnimatedBlockScore>
      <ContinueBtn
        onClick={() => {
          setdisplayAnimateBlockScore((val) => !val);
          setDisplaySummary((val) => true);
          // updateUserDataFN();
        }}
        style={{ position: "relative", zIndex: "300", top: "100px" }}
      ></ContinueBtn>
    </PercentageScoreRevealAnimate>
  );

  const summaryPointsReveal = (
    <Summary
      className={
        displaySummary
          ? "animate__animated animate__backInRight"
          : "animate__animated animate__backOutLeft"
      }
    >
      <PointsSummary></PointsSummary>

      <NativatetoDashBoard></NativatetoDashBoard>
    </Summary>
  );

  return (
    <Wrapper>
      {blockCompleted && animatedBlockProgressScore}
      {displaySummary && summaryPointsReveal}
    </Wrapper>
  );
}

export default PostBlockPointsReveal;

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(250, 250, 250, 0.9);

  z-index: 300;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PercentageScoreRevealAnimate = styled.div`
  z-index: 500;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Summary = styled.div`
  z-index: 600;
  position: fixed;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

// const Main = styled.div`
//   height: 100%;
//   width: 100%;
//   z-index: 100;
//   position: fixed;

// `;
