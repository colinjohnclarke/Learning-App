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
  height: 40px;
  width: 250px;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  // background-color: rgba(0, 200, 200, 0.8);
  border: 2px solid rgba(0, 200, 200, 0.8);
  color: rgba(0, 200, 200, 0.8);
  font-weight: 400;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 1);
    color: white;
  }

  &:active {
    transform: translateY(3px);
    background-color: rgba(0, 200, 200, 1);
    box-shadow: none;
  }

  p {
    font-size: 15px;
  }

  @media ${device.tablet} {
    height: 50px;
  }
`;
