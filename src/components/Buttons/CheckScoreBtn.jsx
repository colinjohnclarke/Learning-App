import React from "react";
import styled, { keyframes } from "styled-components";
import { device } from "../../styles/breakpoints";

function CheckScoreBtn({ ...atributes }) {
  return (
    <Wrapper type="button" {...atributes}>
      <p style={{ fontWeight: "500", color: "white" }}>Check the Score!</p>
    </Wrapper>
  );
}

export default CheckScoreBtn;

const rotate = keyframes`
  0%   { transform: scale(1,1)      translateY(0);  }
  3.3%  { transform: scale(1.1,.9)   translateY(0); }
  10%  { transform: scale(.9,1.1)   translateY(-20px); }
  16.6%  { transform: scale(1.05,.95) translateY(0); }
  19%  { transform: scale(1,1)      translateY(-3px); }
  24%  { transform: scale(1,1)      translateY(0); }
  33% { transform: scale(1,1)      translateY(0); }
  50%{ background-color: rgba(0,240,240,1) }
  100%{  background-color: rgba(39, 106, 245, 1)}
`;

const Wrapper = styled.button`
  animation: ${rotate} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 60px;
  margin: 60px;
  height: 50px;
  width: 350px;
  border-radius: 5px;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 1px;
  background-color: rgba(39, 106, 245, 1);
  box-shadow: -6px -6px -10px -1px rgba(255, 255, 255, 0.7);
  box-shadow: 6px 6px 10px 1px rgba(0, 0, 0, 0.15);
  border-top: 1.4px white solid;
  box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, 0.15),
    inset -3px -1px 3px -1px rgba(255, 255, 255, 0.7),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  transition: 0.3s;
  margin: 70px;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 245, 245, 1);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    transition: 0.3s;
  }

  &:active {
    transform: translateY(2px);
    transition: 0.3s;
  }

  @media ${device.tablet} {
    height: 50px;
  }
`;
