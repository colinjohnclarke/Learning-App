import React, { useContext } from "react";
import { UserContext } from "../../App";
import styled from "styled-components";

function SlideShowNavBtn({ children, ...attributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Btn darkThemeActive={darkThemeActive} type="button" {...attributes}>
      {children}
      {/* <GrLinkNext style={{ width: "20px", transform: "rotate(180deg)" }} /> */}
    </Btn>
  );
}

export default SlideShowNavBtn;

const Btn = styled.button`
  position: absolute;
  z-index: 1;
  border: 0px;
  background-color: inherit;
  transition: 0.3s;
  &:active {
    transform: translateY(4px);
  }
`;
