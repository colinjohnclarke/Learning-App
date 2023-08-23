import React from "react";
import styled from "styled-components";
import OpenDrawerBtn from "../../components/Drawer/OpenDrawerBtn";
import Signup from "../../components/Buttons/Signup";

function DashboardHeader() {
  return (
    <Wrapper>
      <OpenDrawerBtn />
      <Signup />
    </Wrapper>
  );
}

export default DashboardHeader;

const Wrapper = styled.div`
  min-height: 50px;
  width: 100%;
  height: 5%;
  background-color: white;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);

  position: fixed;
  z-index: 100;
`;
