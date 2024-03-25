import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

import { UserContext } from "../../App";

import { ThemeStyles } from "../../styles/ThemeStyles";

function ContinueBtn({ children, ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Btn darkThemeActive={darkThemeActive} type="button" {...atributes}>
      {children}
    </Btn>
  );
}

export default ContinueBtn;

const Btn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 60px;
  height: 50px;
  width: 350px;
  border-radius: 16px;
  background-color: rgba(0, 240, 245, 1);
  color: white;
  cursor: pointer;
  

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  transition: 0.3s;
  border: 2px solid rgba(0, 240, 240, 0.8);
  font-weight: 400;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 250, 250, 1);
    color: white;
  }

  @media ${device.tablet} {
    min-height: 50px;
  }
`;
