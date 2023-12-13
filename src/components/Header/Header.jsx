import React from "react";
import styled from "styled-components";
import ProgressBar from "../ProgressBar/ProgressBar";
import OpenDrawerBtn from "../Drawer/OpenDrawerBtn";
import Signup from "../Buttons/Signup";
import LogoutBtn from "../Login/LogoutBtn";
import { device } from "../../styles/breakpoints";

function Header() {
  return (
    <Wrapper>
      <OpenDrawerBtn></OpenDrawerBtn>
      <ProgressBar></ProgressBar>
      {/* <Signup></Signup> */}
      <LogoutBtn></LogoutBtn>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  height: 50px;
  background-color: white;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  position: fixed;
  z-index: 100;

  @media ${device.tablet} {
    height: 60px;
  }
`;
