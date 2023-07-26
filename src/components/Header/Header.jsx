import React from "react";
import styled from "styled-components";
import ProgressBar from "../ProgressBar/ProgressBar";
import OpenDrawerBtn from "../Drawer/OpenDrawerBtn";
import Signup from "../Buttons/Signup";

function Header() {
  return (
    <Wrapper>
      <OpenDrawerBtn></OpenDrawerBtn>
      <ProgressBar></ProgressBar>
      <Signup></Signup>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  min-height: 50px;
  height: 5%;
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  position: fixed;
  z-index: 100;
`;
