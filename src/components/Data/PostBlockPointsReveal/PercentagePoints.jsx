import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { UserContext } from "../../../App";

import { ThemeStyles } from "../../../styles/ThemeStyles";

function PercentagePoints() {
  const percentageScore = useSelector(
    (state) => state.currentblockprogressdata.percentageScore
  );

  const { darkThemeActive } = useContext(UserContext);
  const [points, setPoints] = useState(Math.floor(percentageScore));
  const [counter, setCounter] = useState(0);

  const [counterinterval, setCounterInterval] = useState(50);

  const [animateclass, setAnimateClass] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((val) => val + 1);
    }, counterinterval);

    if (counter === points - 20) {
      setCounterInterval((val) => 50);
    }

    if (counter === points - 10) {
      setCounterInterval((val) => 100);
    }
    if (counter === points - 5) {
      setCounterInterval((val) => 250);
    }
    if (counter === points - 2) {
      setCounterInterval((val) => 400);
    }

    if (counter === points) {
      clearInterval(timer);
      setAnimateClass("animate__animated animate__jello");
    }

    return () => {
      clearInterval(timer);
    };
  }, [counter]);

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <p style={{ fontWeight: "700" }}> </p>
      <p style={{ fontWeight: "700" }}>
        {"   "} {counter}
      </p>
      <p style={{ fontWeight: "700" }}> % correct</p>
    </Wrapper>
  );
}

export default PercentagePoints;

const Wrapper = styled.div`
  height: 60px;
  width: 250px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;
