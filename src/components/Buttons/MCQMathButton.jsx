import React from "react";
import styled from "styled-components";

function MCQMathButton({ ...atributes }) {
  return <Btn type="button" {...atributes}></Btn>;
}

export default MCQMathButton;

const Btn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 10px;
  border-radius: 5px;
  background-color: white;
  box-shadow: rgba(0, 200, 200, 0.5) 0px 0px 5px 0px;
  transition: 0.3s;
  min-width: 250px;
  min-height: 70px;

  &:hover {
    transform: translateY(-2px);
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
