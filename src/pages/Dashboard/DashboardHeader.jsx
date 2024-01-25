import React, { useContext } from "react";
import styled from "styled-components";
import OpenDrawerBtn from "../../components/Drawer/OpenDrawerBtn";

import { device } from "../../styles/breakpoints";
import spslogo from "../../assets/images/spslogo.png";
import { UserContext } from "../../App";
import NavigationBarDesktop from "../../components/Navigation/NavigationBarDesktop";
import { ThemeStyles } from "../../styles/ThemeStyles";
import SettingsBtnHeaderBar from "../../components/Settings/SettingsBtnHeaderBar/SettingsBtnHeaderBar";
import FlameDayStreak from "../../components/DayStreak/FlameDayStreak";

function DashboardHeader() {
  const { darkThemeActive } = useContext(UserContext);
  // const { user } = useAuth0();

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
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

      <NavigationBarDesktop />
    
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
