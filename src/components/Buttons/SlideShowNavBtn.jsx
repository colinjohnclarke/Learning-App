import React from "react";
import styled from "styled-components";

function SlideShowNavBtn({ children, ...attributes }) {
  return (
    <Btn type="button" {...attributes}>
      {children}
    </Btn>
  );
}

export default SlideShowNavBtn;

const Btn = styled.button`
  position: absolute;
  z-index: 1;
  width: 30px;
  height: 100px;
  border-radius: 10px;
  border: 0px solid;
  box-shadow: rgba(0, 0, 0, 0.1) 2px 4px 1px;
  background-color: rgb(0, 240, 240, 0.3);
  box-shadow: -6px -6px -10px -1px rgba(255, 255, 255, 0.7);
  box-shadow: 6px 6px 10px 1px rgba(0, 0, 0, 0.15);
  border-top: 1.4px white solid;
  box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, 0.15),
    inset -3px -1px 3px -1px rgba(255, 255, 255, 0.7),
    -0.5px -0.5px 0px rgba(255, 255, 255, 1);
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
      rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
    transition: 0.3s;
  }

  &:active {
    transform: translateY(2px);
    transition: 0.3s;
  }
`;
