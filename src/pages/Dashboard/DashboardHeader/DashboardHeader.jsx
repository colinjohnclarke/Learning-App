import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../../styles/breakpoints";
import { UserContext } from "../../../App";
import NavigationBarDesktop from "../../../components/Navigation/NavigationBarDesktop";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import SettingsBtnHeaderBar from "../../../components/Settings/SettingsBtnHeaderBar/SettingsBtnHeaderBar";

import UserProgressData from "../UserProgressData/UserProgressData";

function DashboardHeader() {
  const { darkThemeActive } = useContext(UserContext);

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <div style={{ width: "30px" }}></div>
      <Logo
        data-testid="logo"
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
      </Logo>

      <NavigationBarDesktop />

      <Data style={{ position: "relative" }}>
        <UserProgressData />{" "}
      </Data>

      <SettingsBtnHeaderBar />
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

  position: fixed;
  top: 0px;
  z-index: 100;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

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
