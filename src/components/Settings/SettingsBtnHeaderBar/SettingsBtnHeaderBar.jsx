import React, { useState, useContext } from "react";
import styled from "styled-components";
import { IoIosArrowDropdown } from "react-icons/io";
import SettingsDrawerDesktop from "../SettingsDrawerDesktop";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { CiSettings } from "react-icons/ci";
import { device } from "../../../styles/breakpoints";

function SettingsBtnHeaderBar() {
  const [settingDrawerIsOpen, setSettingsDrawerIsOpen] = useState(false);
  const { darkThemeActive } = useContext(UserContext);

  return (
    <Main>
      <Wrapper
        darkThemeActive={darkThemeActive}
        onClick={() => setSettingsDrawerIsOpen((val) => !val)}
      >
        <CiSettings
          size={24}
          fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
        />
      </Wrapper>
      <SettingsDrawerDesktop
        controllers={{ settingDrawerIsOpen, setSettingsDrawerIsOpen }}
      />
    </Main>
  );
}

export default SettingsBtnHeaderBar;

const Wrapper = styled.button`
  height: 30px;
  width: 30px;
  position: relative;
  z-index: 300;
  padding: 3px;

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 10px;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? `${ThemeStyles.lightThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 2px 2px`
      : `${ThemeStyles.darkThemeMainBoxShadow}`};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &:hover {
    background-color: rgb(39, 106, 245, 0.05);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }

  @media ${device.tablet} {
    margin-right: 25px;
  }
`;

const Main = styled.div``;
