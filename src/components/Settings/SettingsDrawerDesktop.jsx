import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import "animate.css";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import LogoutBtn from "../Login/LogoutBtn";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { CiLineHeight } from "react-icons/ci";
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
    // setDarkModeChecked(!isDarkModeChecked);
    setDarkThemeActive((val) => !val);
  };

  const handleSoundOffCheckboxChange = () => {
    setSilentModeActive((val) => !val);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setDarkThemeActive((val) => !val);
  };
  let position = "-100%";

  if (settingDrawerIsOpen) {
    position = "0%";
  }

  return (
    <Wrapper
      position={position}
      ref={menuRef}
      darkThemeActive={darkThemeActive}
    >
      <Outer
        onClick={() => {
          setSettingsDrawerIsOpen((val) => false);
        }}
      ></Outer>

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
            <Input type="checkbox" onChange={handleSoundOffCheckboxChange} />
            <Span></Span>
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
              fill={darkThemeActive ? "darkgrey" : "white"}
              stroke={"darkgrey"}
            />
          ) : (
            <LuFlashlightOff
              size={20}
              style={{ position: "relative", left: "8px" }}
              fill={darkThemeActive ? "" : "white"}
              stroke="white"
            />
          )}

          <Label class="switch">
            <Input onChange={handleDarkModeCheckboxChange} type="checkbox" />
            <Span></Span>
          </Label>
        </Box>
        <LogoutBtn />
      </Drawer>
    </Wrapper>
  );
}

export default SettingsDrawerDesktop;

const Outer = styled.div`
  // background-color: grey;
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: -20;
  top: 0;
  right: 0;
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
  transition: 0.3s;
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
  margin-left: 10px;
  margin-right: 20px;
  padding-left: 6px;
  padding-right: 6px;

  border-bottom: 1px solid ${ThemeStyles.highlightSecondaryColor};

  &:hover {
    transition: 0s;
    background-color: rgb(0, 240, 255, 0.2);
    border-radius: 5px;
  }
`;

const Label = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 22px;
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: rgb(0, 250, 250);
  }

  &:focus + span {
    box-shadow: 0 0 1px #2196f3;
  }

  &:checked + span::before {
    transform: translateX(26px);
  }
`;

const Span = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.2s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 15px;
    width: 15px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.2s;
    border-radius: 50%;
  }
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  // border: 1px solid;
  width: 100%;
  margin-top: 30px;
`;
