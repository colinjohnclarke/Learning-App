import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";

function NativatetoDashBoard({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Link style={{ textDecoration: "none" }} to={"/dashboard"}>
      <Btn darkThemeActive={darkThemeActive} type="button" {...atributes}>
        Go to Dashboard
      </Btn>
    </Link>
  );
}

export default NativatetoDashBoard;

const Btn = styled.button`
  position: relative;
  z-index: 400;
  bottom: 150px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 60px;
  height: 50px;
  width: 350px;
  border-radius: 5px;
  border: 2px solid rgba(0, 240, 240, 0.8);

  transition: 0.3s;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
  font-weight: 400;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 1);
    color: white;
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
  }

  p {
    font-size: 15px;
  }

  @media ${device.tablet} {
    height: 50px;
  }
`;
