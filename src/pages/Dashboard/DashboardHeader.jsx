import React, { useContext } from "react";
import styled from "styled-components";
import OpenDrawerBtn from "../../components/Drawer/OpenDrawerBtn";

import { device } from "../../styles/breakpoints";
import spslogo from "../../assets/images/spslogo.png";
import { UserContext } from "../../App";
import NavigationBarDesktop from "../../components/Navigation/NavigationBarDesktop";
import { ThemeStyles } from "../../styles/ThemeStyles";
import SettingsBtnHeaderBar from "../../components/Settings/SettingsBtnHeaderBar/SettingsBtnHeaderBar";

import UserProgressData from "./UserProgressData";

function DashboardHeader() {
  const { darkThemeActive } = useContext(UserContext);
  // const { user } = useAuth0();

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <OpenDrawerBtn />

      <Logo
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // position: "absolute",
        }}
      >
        {" "}
        <p style={{ fontWeight: "500", color: "rgb(0, 230, 230)" }}>
          SPS online
        </p>
        {/* <img style={{ height: "40px" }} src={spslogo} alt="" /> */}
      </Logo>

      {/* <LogoutBtn> Logout</LogoutBtn> */}

      <NavigationBarDesktop />

      <Data style={{ position: "relative" }}>
        {" "}
        <UserProgressData />
      </Data>

      <SettingsBtnHeaderBar />

      {/* <Signup /> */}
    </Wrapper>
  );
}

export default DashboardHeader;

const Wrapper = styled.div`
  height: 50px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
  width: 100vw;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;

  position: fixed;
  top: 0px;
  z-index: 100;

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  @media ${device.tablet} {
    height: 60px;
  }
`;

const Data = styled.div`
  display: none;
  @media ${device.mobileM} {
    display: flex;
    position: relative;
    left: 20%;
  }

  @media ${device.mobileM} {
    display: flex;
    position: relative;
    left: 25%;
  }

  @media ${device.tablet} {
    display: flex;
    position: relative;
    left: 30%;
  }
`;

const Logo = styled.div`
  position: absolute;
  right: 45%;

  @media ${device.tablet} {
    right: 47%;
  }

  @media ${device.laptopL} {
    right: 50%;
  }
`;
