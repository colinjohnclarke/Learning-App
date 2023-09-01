import React from "react";
import styled from "styled-components";

function MainActionBtn({ ...atributes }) {
  return <Btn type="button" {...atributes}></Btn>;
}

export default MainActionBtn;

const Btn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 10px;
  height: 40px;
  width: 100px;
  border-radius: 4px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  border: 2px solid rgba(0, 200, 200, 1);
  color: rgba(0, 200, 200, 1);

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 1);
    color: white;
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 1);
    color: white;
  }
  p {
    font-size: 12px;
  }
`;
