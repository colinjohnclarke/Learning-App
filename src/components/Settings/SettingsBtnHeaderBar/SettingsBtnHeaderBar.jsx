import React, { useState, useContext } from "react";
import styled from "styled-components";
import { IoIosArrowDropdown } from "react-icons/io";
import SettingsDrawerDesktop from "../SettingsDrawerDesktop";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";

function SettingsBtnHeaderBar() {
  const [settingDrawerIsOpen, setSettingsDrawerIsOpen] = useState(false);
  const { darkThemeActive } = useContext(UserContext);

  return (
    <Main>
      <Wrapper
        darkThemeActive={darkThemeActive}
        onClick={() => setSettingsDrawerIsOpen((val) => !val)}
      >
        <IoIosArrowDropdown
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
  z-index: 200;
  padding: 3px;
  margin: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? `${ThemeStyles.lightThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 2px 2px`
      : `${ThemeStyles.darkThemeMainBoxShadow},  0px 3px 5px 4px`};

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
`;

const Main = styled.div`
  transition: 0s all;
`;
