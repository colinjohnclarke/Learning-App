import React, { useContext, useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import "animate.css";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import LogoutBtn from "../Login/LogoutBtn";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { LuFlashlight } from "react-icons/lu";
import { LuFlashlightOff } from "react-icons/lu";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";

function SettingsDrawerDesktop({ controllers }) {
  const { settingDrawerIsOpen, setSettingsDrawerIsOpen } = controllers;

  const {
    userData,
    userAuth0,
    darkThemeActive,
    setDarkThemeActive,
    silentModeActive,
    setSilentModeActive,
  } = useContext(UserContext);

  const menuRef = useRef(null);

  const handleDarkModeCheckboxChange = () => {
    const newVal = !darkThemeActive;
    setDarkThemeActive((val) => newVal);

    localStorage.setItem("darkThemeActive", newVal);
  };

  const handleSoundOffCheckboxChange = () => {
    const newVal = !silentModeActive;
    setSilentModeActive((val) => newVal);
    localStorage.setItem("silentModeActive", newVal);
  };

  let position = "-100%";

  if (settingDrawerIsOpen) {
    position = "0%";
  }

  return (
    <div>
      <Outer
        isOpen={settingDrawerIsOpen}
        onClick={() => setSettingsDrawerIsOpen(false)}
      >
        {/* Your content here */}
      </Outer>

      <Wrapper
        position={position}
        ref={menuRef}
        darkThemeActive={darkThemeActive}
      >
        <Drawer darkThemeActive={darkThemeActive}>
          <div style={{ height: "50px" }}></div>
          <div style={{ height: "50px" }}>
            <p style={{ fontweight: "600" }}>
              {userData?.user.firstName ||
                userAuth0?.name ||
                userAuth0.family_name ||
                userAuth0.email}
            </p>
          </div>
          <Box>
            <p
              style={{
                color: darkThemeActive
                  ? ThemeStyles.lightThemePrimaryFrontColor
                  : ThemeStyles.darkThemePrimaryFontColor,
              }}
            >
              Sound Effects
            </p>

            {silentModeActive ? (
              <HiOutlineSpeakerXMark
                size={20}
                fill={darkThemeActive ? "darkgrey" : "white"}
                stroke={darkThemeActive ? "darkgrey" : "white"}
              />
            ) : (
              <HiOutlineSpeakerWave
                size={20}
                fill={darkThemeActive ? "darkgrey" : "white"}
                stroke={darkThemeActive ? "darkgrey" : "white"}
              />
            )}

            <Label class="switch">
              <SilentModeInput
                silentModeActive={silentModeActive}
                // checked={silentModeActive}
                type="checkbox"
                onClick={handleSoundOffCheckboxChange}
              />
              <SilentModeSpan silentModeActive={silentModeActive}>
                {" "}
                <LightInnerSpan
                  silentModeActive={silentModeActive}
                ></LightInnerSpan>
              </SilentModeSpan>
            </Label>
          </Box>
          <Box>
            <p
              style={{
                color: darkThemeActive
                  ? ThemeStyles.lightThemePrimaryFrontColor
                  : ThemeStyles.darkThemePrimaryFontColor,
              }}
            >
              Dark Mode
            </p>

            {darkThemeActive ? (
              <LuFlashlight
                size={20}
                style={{ position: "relative", left: "8px" }}
                fill={"darkgrey"}
                stroke={"darkgrey"}
              />
            ) : (
              <LuFlashlightOff
                size={20}
                style={{ position: "relative", left: "8px" }}
                fill={darkThemeActive ? "white" : "white"}
                stroke="white"
              />
            )}

            <Label>
              <DarkThemeInput
                darkThemeActive={darkThemeActive}
                onClick={handleDarkModeCheckboxChange}
                type="checkbox"
              />
              <DarkThemeSpan darkThemeActive={darkThemeActive}>
                {" "}
                <DarkInnerSpan
                  darkThemeActive={darkThemeActive}
                ></DarkInnerSpan>{" "}
              </DarkThemeSpan>
            </Label>
          </Box>
          <LogoutBtn />
        </Drawer>
      </Wrapper>
    </div>
  );
}

export default SettingsDrawerDesktop;

const Outer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: -20;
  top: 0;
  right: 0;
  transition: 0.15s;
  opacity: 0;
  pointer-events: none;

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

const Drawer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 15px;
  margin-right: 10px;
  transition: 0s;

  @media ${device.tablet} {
    margin-right: 40px;
  }

  p {
    font-size: 14px;
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const Wrapper = styled.div`
  width: 200px;
  position: absolute;
  z-index: 0;
  transition: 0.15s;
  top: 0px;
  right: ${(props) => props.position};
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: start;
`;

const Box = styled.div`
  height: 50px;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    transition: 0s;
    background-color: rgb(0, 240, 255, 0.2);
    border-radius: 5px;
  }

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 22px;
`;

const SilentModeInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const DarkThemeInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

const DarkThemeSpan = styled.span`
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.2s;
  border-radius: 34px;
  background-color: ${(props) =>
    props.darkThemeActive ? "lightgrey" : "rgb(0,245, 245)"};
`;

const SilentModeSpan = styled.span`
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.2s;
  border-radius: 34px;
  background-color: ${(props) =>
    props.silentModeActive ? "rgb(0,245, 245)" : "lightgrey"};
`;

const DarkInnerSpan = styled.span`
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: ${(props) => (props.darkThemeActive ? "4px" : "30px")};
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.2s;
  border-radius: 50%;
`;

const LightInnerSpan = styled.span`
  position: absolute;
  content: "";
  height: 15px;
  width: 15px;
  left: ${(props) => (props.silentModeActive ? "30px" : "4px")};
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.2s;
  border-radius: 50%;
`;
