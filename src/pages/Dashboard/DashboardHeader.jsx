import React, { useContext } from "react";
import styled from "styled-components";
import OpenDrawerBtn from "../../components/Drawer/OpenDrawerBtn";
import Signup from "../../components/Buttons/Signup";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutBtn from "../../components/Login/LogoutBtn";
import { device } from "../../styles/breakpoints";
import spslogo from "../../assets/images/spslogo.png";
import { UserContext } from "../../App";
import NavigationBarDesktop from "../../components/Navigation/NavigationBarDesktop";

function DashboardHeader() {
  // const { user } = useAuth0();

  return (
    <Wrapper>
      <OpenDrawerBtn />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <p style={{ fontWeight: "500", color: "rgb(0, 230, 230)" }}>
          SPS online
        </p>
        <img style={{ height: "40px" }} src={spslogo} alt="" />
      </div>

      {/* <LogoutBtn> Logout</LogoutBtn> */}
      <div></div>
      <NavigationBarDesktop />
      {/* <Signup /> */}
    </Wrapper>
  );
}

export default DashboardHeader;

const Wrapper = styled.div`
  height: 50px;
  background-color: white;
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0px;
  z-index: 100;

  box-shadow: 0px -4px 4px -5px rgba(0, 0, 0, 0.75);

  @media ${device.tablet} {
    height: 60px;
  }
`;
