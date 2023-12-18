import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";

function NativatetoDashBoard({ ...atributes }) {
  return (
    <div>
      <Link style={{ textDecoration: "none" }} to={"/dashboard"}>
        <Btn type="button" {...atributes}>
          Go to Dashboard
        </Btn>
      </Link>
    </div>
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
  background-color: white;
  border: 2px solid rgba(0, 240, 240, 0.8);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  transition: 0.3s;
  background-color: white;
  color: rgba(0, 240, 240, 0.8);
  font-weight: 400;

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
