import React, { useContext } from "react";
import MainActionBtn from "./MainActionBtn";
import { BiHelpCircle } from "react-icons/bi";
import { UserContext } from "../../App";
import styled from "styled-components";

import { ThemeStyles } from "../../styles/ThemeStyles";

function HelpBtn({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Btn darkThemeActive={darkThemeActive} {...atributes}>
      <BiHelpCircle size={20} fill={"rgb(00, 240, 240)"} />
    </Btn>
  );
}

export default HelpBtn;

const Btn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 7px;
  width: 50px;
  height: 50px;
  border: 1px solid rgb(0, 245, 245);
  border-radius: 50%;
  background-color: white;

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
    transition: 0.3s;
  }

  &:active {
    transform: translateY(-2px);
    // background-color: rgba(0, 245, 245, 0.29);
  }

  p {
    font-size: 15px;
  }
`;
