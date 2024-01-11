import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ContinueBtn from "../../Buttons/ContinueBtn";
import AnimatedBlockScore from "../CurrentBlockScores/AnimatedBlockScore";
import PointsSummary from "./PointsSummary";
import "animate.css";
import NativatetoDashBoard from "../../Buttons/NativatetoDashBoard";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";

function PostBlockPointsReveal() {
  const [displayAnimateBlockScore, setdisplayAnimateBlockScore] =
    useState(true);

  const { darkThemeActive } = useContext(UserContext);

  const [displaySummary, setDisplaySummary] = useState(false);
  // data to send to db from redux store

  let blockCompleted = useSelector(
    (state) => state.currentblockprogressdata.blockCompleted
  );

  const animatedBlockProgressScore = (
    <PercentageScoreRevealAnimate
      darkThemeActive={darkThemeActive}
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
      darkThemeActive={darkThemeActive}
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
    <Wrapper darkThemeActive={darkThemeActive}>
      {blockCompleted && animatedBlockProgressScore}
      {displaySummary && summaryPointsReveal}
    </Wrapper>
  );
}

export default PostBlockPointsReveal;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: 300;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const PercentageScoreRevealAnimate = styled.div`
  z-index: 500;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Summary = styled.div`
  z-index: 600;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

// const Main = styled.div`
//   height: 100%;
//   width: 100%;
//   z-index: 100;
//   position: fixed;

// `;
