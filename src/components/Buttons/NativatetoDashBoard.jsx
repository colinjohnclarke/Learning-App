import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function NativatetoDashBoard({ ...atributes }) {
  return (
    <div>
      <NavLink to={"/dashboard"}>
        <Btn type="button" {...atributes}>
          Go to Dashboard
        </Btn>
      </NavLink>
    </div>
  );
}

export default NativatetoDashBoard;

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
  background-color: rgba(0, 200, 200, 0.8);
  color: white;
  font-weight: 400;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 1);
  }

  &:active {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 1);
  }

  p {
    font-size: 15px;
  }
`;
