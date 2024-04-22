import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import "animate.css";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";

function AnimatedPercentageScore({ percentage, color, fontColor, size }) {
  console.log("props", percentage, color, fontColor, size);

  let radius = size === "small" ? 10.5 : size === "medium" ? 15 : 22;

  const offset = 2 * Math.PI * radius;
  const current = (percentage / 100) * offset;

  const { darkThemeActive } = useContext(UserContext);

  const anim = keyframes`
    100%{  stroke-dashoffset: ${offset - current}
  
  `;

  let Circle = styled.circle`
    fill: none;
    stroke: url(#GradientColor);
    stroke-width: ${(props) =>
      size === "small" ? "3px" : size === "medium" ? "4px" : "5px"};
    stroke-dasharray: ${offset};
    stroke-dashoffset: ${offset};
    animation: ${anim} 0.4s linear forwards;
  `;

  return (
    <div style={{ display: "flex" }}>
      {size !== "large" && (
        <Percentage
          style={{
            color: `${fontColor}`,
            fontSize: "11px",
          }}
        >
          <div
            style={{
              width: "35px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px",
            }}
          >
            {" "}
            {Math.floor(percentage)} %{" "}
          </div>
        </Percentage>
      )}

      <Wrapper className="animate__animated animate__fadeIn ">
        <Outer size={size}>
          <Inner size={size} darkThemeActive={darkThemeActive}>
            {size === "large" && (
              <Percentage
                style={{
                  color: `${fontColor}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {Math.floor(percentage)} %{" "}
                </div>
              </Percentage>
            )}
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

            <Circle
              size={size}
              cx="80"
              cy="79"
              r={
                size === "small"
                  ? 10.5
                  : size === "medium"
                  ? 14
                  : size === "large"
                  ? 22.5
                  : 15
              }
              stroke-linecap="round"
            />
          </Svg>
        </div>
      </Wrapper>
    </div>
  );
}

export default React.memo(AnimatedPercentageScore);

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
  width: ${(props) =>
    props.size === "small"
      ? "20px"
      : props.size === "medium"
      ? "30px"
      : props.size === "large"
      ? "40px"
      : "30px"};
  height: ${(props) =>
    props.size === "small"
      ? "20px"
      : props.size === "medium"
      ? "30px"
      : props.size === "large"
      ? "40px"
      : "35px"};
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
  width: ${(props) =>
    props.size === "small"
      ? "20px"
      : props.size === "medium"
      ? "30px"
      : props.size === "large"
      ? "40px"
      : "30px"};
  height: ${(props) =>
    props.size === "small"
      ? "20px"
      : props.size === "medium"
      ? "30px"
      : props.size === "large"
      ? "40px"
      : "30px"};
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

const Percentage = styled.div`
  font-size: 11px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const breatheAnimation = keyframes`
   0% { height: 100px; width: 100px; }
   30% { height: 400px; width: 400px; opacity: 1 }
   40% { height: 405px; width: 405px; opacity: 0.3; }
   100% { height: 100px; width: 100px; opacity: 0.6; }
  `;

const Svg = styled.svg`
  position: relative;

  top: 3px;
`;

const Circle = styled.circle``;

// height: ${(props) => {
//   if (props.size === "small") {
//     return "30px";
//   } else if (props.size === "medium") {
//     return "35px";
//   } else if (props.size === "medium") {
//     return "45px";
//   }
// }}
// width: ${(props) => {
//     if (props.size === "small") {
//       return "30px";
//     } else if (props.size === "medium") {
//       return "35px";
//     } else if (props.size === "medium") {
//       return "45px";
//     }
//   }}
