import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import "animate.css";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function AnimatedPercentageScore({ percentage, color, fontColor }) {
  const offset = 2 * Math.PI * 22.5;
  const current = (percentage / 100) * offset;

  const { darkThemeActive } = useContext(UserContext);

  const anim = keyframes`
    100%{  stroke-dashoffset: ${offset - current}
  
  `;

  const Circle = styled.circle`
    fill: none;
    stroke: url(#GradientColor);
    stroke-width: 5px;
    stroke-dasharray: ${offset};
    stroke-dashoffset: ${offset};
    animation: ${anim} 0.4s linear forwards;
  `;

  return (
    <Wrapper className="animate__animated animate__fadeIn ">
      <Outer>
        <Inner darkThemeActive={darkThemeActive}>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: `${fontColor}`,
            }}
          >
            {Math.floor(percentage)} %{" "}
          </p>
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
              <stop
                offset="100%"
                stop-color={`${color}` || "rgb(0,245, 245)"}
              />
            </linearGradient>
          </defs>
          <Circle cx="79" cy="79" r="22.5" stroke-linecap="round" />
        </Svg>
      </div>
    </Wrapper>
  );
}

export default AnimatedPercentageScore;

const Wrapper = styled.div`
  padding: 10px;
  position: relative;
  z-index: 10;
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
  height: 49px;
  width: 49px;
  border-radius: 50%;
  box-shadow: -6px -6px -10px -1px rgba(255, 255, 255, 0.7);
  box-shadow: 6px 6px 10px 1px rgba(0, 0, 0, 0.15);
  border-top: 1.4px white solid;
  background-color: white;
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

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
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
