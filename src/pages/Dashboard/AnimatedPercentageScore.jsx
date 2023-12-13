import React from "react";
import styled, { keyframes } from "styled-components";
import "animate.css";

function AnimatedPercentageScore({ percentage }) {
  const offset = 2 * Math.PI * 23;
  const current = (percentage / 100) * offset;

  const anim = keyframes`
    100%{  stroke-dashoffset: ${offset - current}
  
  `;

  const Circle = styled.circle`
    fill: none;
    stroke: url(#GradientColor);
    stroke-width: 6px;
    stroke-dasharray: ${offset};
    stroke-dashoffset: ${offset};
    animation: ${anim} 0.4s linear forwards;
  `;

  return (
    <Wrapper className="animate__animated animate__fadeIn ">
      <Outer>
        <Inner>
          <p style={{ fontSize: "13px", fontWeight: "500" }}>{percentage} % </p>
        </Inner>
      </Outer>

      <div style={{ position: "absolute" }}>
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
          <Circle cx="80" cy="80" r="23" stroke-linecap="round" />
        </Svg>
      </div>
    </Wrapper>
  );
}

export default AnimatedPercentageScore;

const Wrapper = styled.div`
  padding: 10px;
  position: relative;
  z-index: 300;
  //   height: 100%;
  //   width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   background-color: rgba(250, 250, 250, 0.8);
`;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
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
  height: 40px;
  width: 40px;
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
  //   z-index: 100;
  top: 3px;
  //   left: 20px;
  //   top: 0px;
`;

const Circle = styled.circle``;
