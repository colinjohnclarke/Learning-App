import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function MainActionBtn({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  console.log("🚀 ~ MainActionBtn ~ darkThemeActive:", darkThemeActive);

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
  margin: 10px;
  height: 40px;
  width: 100px;
  border-radius: 5px;
  background-color: white;

  border: 2px solid rgba(0, 240, 240, 1);

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
    color: white;
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
    color: white;
  }
  p {
    font-size: 12px;
  }
`;
