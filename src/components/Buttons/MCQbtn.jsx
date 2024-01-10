import React, { useContext } from "react";
import { UserContext } from "../../App";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";

function MCQbtn({ children, ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Btn darkThemeActive={darkThemeActive} type="button" {...atributes}>
      {children}
    </Btn>
  );
}

export default MCQbtn;

const Btn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 10px;
  height: 40px;
  width: 250px;
  border-radius: 5px;
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
    // background-color: rgba(0, 200, 200, 0.29);
  }

  &:active {
    transform: translateY(-2px);
    // background-color: rgba(0, 240, 240, 0.29);
  }

  p {
    font-size: 15px;
  }
`;
