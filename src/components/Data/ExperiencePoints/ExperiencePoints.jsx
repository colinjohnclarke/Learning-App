import React, { useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "animate.css";
import AnimateCountFunction from "../../functions/AnimateCountFunction";
import { correctstyle } from "../../../styles/colors";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";

function ExperiencePoints() {
  const percentageScore = useSelector(
    (state) => state.currentblockprogressdata.percentageScore
  );
  const { darkThemeActive } = useContext(UserContext);

  const { counter, animateclass } = AnimateCountFunction(percentageScore);

  return (
    <Wrapper
      darkThemeActive={darkThemeActive}
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
  width: 350px;
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
`;
