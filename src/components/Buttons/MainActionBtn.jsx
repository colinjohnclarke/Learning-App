import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function MainActionBtn({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);

  return (
    <Btn darkThemeActive={darkThemeActive} type="button" {...atributes}></Btn>
  );
}

export default MainActionBtn;

const Btn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 7px;
  min-height: 50px;
  // min-width: 350px;
  // max-width: 350px;
  border-radius: 5px;
  border: 2px solid rgba(0, 240, 240, 1);

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
  &:hover {
    transform: translateY(-1px);
    color: white;
    transition: 0.2s;
  }

  &:active {
    transform: translateY(1px);
    background-color: rgba(0, 240, 240, 1);
    color: white;
  }
  * {
    font-size: 13px;
  }
`;
