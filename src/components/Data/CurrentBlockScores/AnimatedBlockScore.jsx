import React, { useState, useEffect, Children } from "react";
import styled, { keyframes } from "styled-components";
import PercentageScore from "./PercentageScore";
import { useSelector, useDispatch } from "react-redux";
import ContinueBtn from "../../Buttons/ContinueBtn";
import { updatePercentage } from "../../../features/CurrentBlockProgressData/currentblockprogressdata";

function AnimatedBlockScore() {
  const [currentprogress, setCurrentProgress] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const dispatch = useDispatch();

  let userScore = useSelector(
    (state) => state.currentblockprogressdata.userScore
  );
  console.log("🚀 ~ file: AnimatedBlockScore.jsx:17 ~ userScore:", userScore)

  let totalAvailablePointsArr = useSelector(
    (state) => state.currentblockprogressdata.pointsAvaiableArr
  );

  // totalAvailablePointsArr.forEach((element) => {
  //   totalAvailablePoints += element.totalMarksAvailable;
  // });

  const removedEmptyObjectsArr = totalAvailablePointsArr.filter(
    (value) => JSON.stringify(value) !== "{}"
  );

  let totalAvailablePoints = 0;

  removedEmptyObjectsArr.forEach((element) => {
    totalAvailablePoints += element.totalMarksAvailable;
  });

  useEffect(() => {
    const ratio = userScore / totalAvailablePoints;
    const percentage = (userScore / totalAvailablePoints) * 100;
    setPercentage((val) => percentage);
    setCurrentProgress((val) => 472 - ratio * 472);

    dispatch(updatePercentage(percentage));
  }, []);

  const anim = keyframes`
  100%{  stroke-dashoffset: ${currentprogress}
  // 100%{  stroke-dashoffset: 472}

`;

  const Circle = styled.circle`
    fill: none;
    stroke: url(#GradientColor);
    stroke-width: 11px;
    stroke-dasharray: 472;
    stroke-dashoffset: 472;
    animation: ${anim} 2s linear forwards;
  `;

  const test = currentprogress;

  return (
    <Wrapper>
      <p style={{ fontWeight: "600", textSize: "1.3rem" }}>
        Well done! You scored...
      </p>
      <Outer>
        <Inner>
          <PercentageScore percentage={percentage}></PercentageScore>
        </Inner>
      </Outer>

      <div>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stop-color="rgba(39, 106, 245, 0.5)" />
              <stop offset="50%" stop-color="rgba(0,200,200,1)" />
              <stop offset="100%" stop-color="rgba(0,200,200,1)" />
            </linearGradient>
          </defs>
          <Circle cx="80" cy="80" r="74" stroke-linecap="round" />
        </Svg>
      </div>
    </Wrapper>
  );
}

export default AnimatedBlockScore;

const Wrapper = styled.div`
  position: fixed;
  z-index: 300;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(250, 250, 250, 0.8);
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  box-shadow: -6px -6px -10px -1px rgba(255, 255, 255, 0.7);
  box-shadow: 6px 6px 10px 1px rgba(0, 0, 0, 0.15);
  border-top: 1.4px white solid;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 140px;
  width: 140px;
  // border: 1px solid;
  border-radius: 50%;
  box-shadow: inset 4px 4px 2px 1px rgba(0, 0, 0, 0.15),
    inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1);
  background-color: rgba(0, 0, 0, 0.04);
`;

const breatheAnimation = keyframes`
 0% { height: 100px; width: 100px; }
 30% { height: 400px; width: 400px; opacity: 1 }
 40% { height: 405px; width: 405px; opacity: 0.3; }
 100% { height: 100px; width: 100px; opacity: 0.6; }
`;

const Svg = styled.svg`
  position: relative;
  top: -160px;
`;

// @keyframes anim (
//   100%(
//     stroke-dashoffset: 0;
//   )
// )
