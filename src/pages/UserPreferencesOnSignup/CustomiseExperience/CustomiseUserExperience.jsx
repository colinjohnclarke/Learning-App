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

function CustomiseUserExperience({
  setDisplayCustomiseUserExperience,
  setIsShoolandUserPreferencesCompleted,
  setDisplayStudentAndSchoolWrapper,
}) {
  const {
    darkThemeActive,
    setDarkThemeActive,
    silentModeActive,
    setSilentModeActive,
  } = useContext(UserContext);

  const [uodate, setUpdate] = useState(false);
  console.log("🚀 ~ darkThemeActive:", darkThemeActive);

  useEffect(() => {
    setUpdate(!uodate);
  }, []);

  const handleDarkModeCheckboxChange = (e) => {
    e.preventDefault();
    const newVal = !darkThemeActive;
    setDarkThemeActive(newVal);
    localStorage.setItem("darkThemeActive", newVal);
  };

  const handleSoundOffCheckboxChange = (e) => {
    e.preventDefault();
    const newValue = !silentModeActive;
    setSilentModeActive(newValue);
    localStorage.setItem("silentModeActive", newValue);
  };

  const handleClick = () => {
    setDisplayCustomiseUserExperience(false);
    setIsShoolandUserPreferencesCompleted((val) => true);
  };

  const handleBackBtnClicked = () => {
    setDisplayCustomiseUserExperience(false);
    setDisplayStudentAndSchoolWrapper(true);
  };

  return (
    <ModalContent darkThemeActive={darkThemeActive}>
      <h2>Preferences</h2>
      <p> You can always change later!</p>
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
          onClick={handleClick}
          darkThemeActive={darkThemeActive}
          style={{ width: "100%" }}
        >
          {" "}
          <p style={{ fontSize: "15px" }}>Save</p>
        </MainActionBtn>
      </BtnDiv>
    </ModalContent>
  );
}

export default CustomiseUserExperience;

const ModalContent = styled.div`
  height: 300px;
  width: 60%;
  max-width: 500px;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  @media ${device.tablet} {
    width: 300px;
  }

  p,
  h2 {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
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
