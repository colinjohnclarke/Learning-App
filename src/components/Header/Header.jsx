import React, { useContext } from "react";
import styled from "styled-components";
import ProgressBar from "../ProgressBar/ProgressBar";
import { device } from "../../styles/breakpoints";
import SettingsBtnHeaderBar from "../Settings/SettingsBtnHeaderBar/SettingsBtnHeaderBar";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import ExitCurrentCourseBtn from "./ExitCurrentCourseBtn";

function Header() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      {/* <OpenDrawerBtn></OpenDrawerBtn> */}
      <ExitCurrentCourseBtn />
      <ProgressBar></ProgressBar>
      <SettingsBtnHeaderBar />
    </Wrapper>
  );
}

export default Header;

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
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
  position: fixed;
  z-index: 100;

  @media ${device.tablet} {
    height: 60px;
  }
`;
