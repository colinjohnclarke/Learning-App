import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AnimateCountFunction from "../../functions/AnimateCountFunction";
import { UserContext } from "../../../App";

import { ThemeStyles } from "../../../styles/ThemeStyles";

function BlockQuestionsCorrect() {
  const { darkThemeActive } = useContext(UserContext);
  let userScore = useSelector(
    (state) => state.currentblockprogressdata.userScore
  );

  // function to send the X points to be stored in DB

  const { counter } = AnimateCountFunction(userScore);

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <p style={{ fontWeight: "700" }}> </p>
      <p style={{ fontWeight: "700" }}> {counter} questions attempted</p>
    </Wrapper>
  );
}

export default BlockQuestionsCorrect;

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

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;
