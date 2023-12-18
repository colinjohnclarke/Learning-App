import React from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";

function ContinueBtn({ children, ...atributes }) {
  return (
    <Btn type="button" {...atributes}>
      Continue
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
  border-radius: 5px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  box-shadow: 0px 0px 20px 4px rgba(174, 196, 216, 0.25);
  transition: 0.3s;

  border: 2px solid rgba(0, 240, 240, 0.8);
  color: rgba(0, 240, 240, 0.8);
  font-weight: 400;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
    color: white;
  }

  &:active {
    transform: translateY(3px);
    background-color: rgba(0, 240, 240, 1);
    box-shadow: none;
  }

  p {
    font-size: 15px;
  }

  @media ${device.tablet} {
    min-height: 50px;
  }
`;
