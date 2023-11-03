import React from "react";
import styled from "styled-components";
import OpenDrawerBtn from "../../components/Drawer/OpenDrawerBtn";
import Signup from "../../components/Buttons/Signup";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutBtn from "../../components/Login/LogoutBtn";

function DashboardHeader() {
  // const { user } = useAuth0();



  return (
    <Wrapper>
      <OpenDrawerBtn />
      <LogoutBtn> Logout</LogoutBtn>
      {/* <Signup /> */}
    </Wrapper>
  );
}

export default DashboardHeader;

const Wrapper = styled.div`
  max-height: 40px;
  min-height: 30px;
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
