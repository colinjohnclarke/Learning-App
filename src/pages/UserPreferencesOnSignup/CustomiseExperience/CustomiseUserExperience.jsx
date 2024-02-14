import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { device } from "../../../styles/breakpoints";
import { LuFlashlight } from "react-icons/lu";
import { LuFlashlightOff } from "react-icons/lu";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import MainActionBtn from "../../../components/Buttons/MainActionBtn";
import { CiSettings } from "react-icons/ci";
import SoundEffectsToggle from "../../Profile/SoundEffectsToggle";
import DarkThemeToggle from "../../Profile/DarkThemeToggle";

function CustomiseUserExperience({
  setDisplayCustomiseUserExperience,
  setIsShoolandUserPreferencesCompleted,
  setDisplayStudentAndSchoolWrapper,
}) {
  const { darkThemeActive, silentModeActive } = useContext(UserContext);

  const handleSaveBtnClicked = (e) => {
    e.preventDefault();
    setDisplayCustomiseUserExperience(false);
    setIsShoolandUserPreferencesCompleted(true);

    const silentModeActiveVal = silentModeActive;
    const darkThemeActiveVal = darkThemeActive;

    if (
      localStorage.getItem("silentModeActive") === undefined ||
      localStorage.getItem("silentModeActive") === null
    ) {
      localStorage.setItem("silentModeActive", false);
    }

    if (
      localStorage.getItem("darkThemeActive") === undefined ||
      localStorage.getItem("darkThemeActive") === null
    ) {
      localStorage.setItem("darkThemeActive", true);
    } else if (
      localStorage.getItem("silentModeActive") === "true" ||
      localStorage.getItem("silentModeActive") === "false"
    ) {
      localStorage.setItem("silentModeActive", silentModeActiveVal);
    } else if (
      localStorage.getItem("darkThemeActive") === "true" ||
      localStorage.getItem("darkThemeActive") === "false"
    ) {
      localStorage.setItem("darkThemeActive", darkThemeActiveVal);
    }
  };

  const handleBackBtnClicked = (e) => {
    e.preventDefault();
    setDisplayCustomiseUserExperience(false);
    setDisplayStudentAndSchoolWrapper(true);
  };

  return (
    <ModalContent darkThemeActive={darkThemeActive}>
      <h2>Settings</h2>

      <CiSettings size={40} fill={darkThemeActive ? "" : "white"} />
      <SoundEffectsToggle />
      <DarkThemeToggle />

      <BtnDiv>
        <MainActionBtn
          darkThemeActive={darkThemeActive}
          onClick={handleBackBtnClicked}
          style={{ width: "100%" }}
        >
          {" "}
          <p style={{ fontSize: "15px" }}>Previous</p>
        </MainActionBtn>
        <MainActionBtn
          onClick={(e) => {
            handleSaveBtnClicked(e);
          }}
          darkThemeActive={darkThemeActive}
          style={{ width: "100%" }}
        >
          {" "}
          <p style={{ fontSize: "15px" }}>Save</p>
        </MainActionBtn>
      </BtnDiv>

      <div style={{ height: "40px" }}></div>
      <p style={{ fontSize: "13px" }}>
        {" "}
        You can always change these later in settings!
      </p>
    </ModalContent>
  );
}

export default CustomiseUserExperience;

const ModalContent = styled.div`
  width: 100%;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-direction: row;
  // border: 1px solid;
  width: 100%;
  margin-top: 30px;
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
    props.silentModeActive ? "lightgrey)" : "rgb(0,245, 245)"};
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
  left: ${(props) => (props.silentModeActive ? "4px" : "30px")};
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.2s;
  border-radius: 50%;
`;
