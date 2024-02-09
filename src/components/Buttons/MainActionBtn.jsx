import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function MainActionBtn({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);

  return <Btn darkThemeActive type="button" {...atributes}></Btn>;
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

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
    rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
  p,
  div {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  &:hover {
    transform: translateY(-1px);
    color: white;
    background-color: rgba(0, 240, 240, 1);
    transition: 0.2s;

    p {
      color: ${(props) => (props.darkThemeActive ? "white" : "white")};
    }
  }

  * {
    font-size: 13px;
  }
`;
