import React from "react";
import styled from "styled-components";

function MCQbtn({ children, ...atributes }) {
  console.log("children", children);

  return <Btn></Btn>;
}

export default MCQbtn;

const Btn = styled.button`
  border: none;
  margin: 10px;
  width: 300px;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.29);
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.29);
  }

  p {
    font-size: 15px;
  }
`;
