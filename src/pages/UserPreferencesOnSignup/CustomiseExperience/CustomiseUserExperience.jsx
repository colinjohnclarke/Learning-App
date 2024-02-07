import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { device } from "../../../styles/breakpoints";
import { AiOutlineSound } from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa";
import { LuFlashlight } from "react-icons/lu";
import { LuFlashlightOff } from "react-icons/lu";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";
import MainActionBtn from "../../../components/Buttons/MainActionBtn";
import { useNavigate } from "react-router-dom";

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
  // const [isDarkModeChecked, setDarkModeChecked] = useState(false);
  // const [isSoundOff, setIsSoundOff] = useState(false);

  // const menuRef = useRef(null);

  const navigate = useNavigate();

  const handleDarkModeCheckboxChange = () => {
    // setDarkModeChecked(!isDarkModeChecked);
    setDarkThemeActive((val) => !val);
  };

  const handleSoundOffCheckboxChange = () => {
    setSilentModeActive((val) => !val);
  };

  const handleClick = () => {
    setDisplayCustomiseUserExperience(false);
    setIsShoolandUserPreferencesCompleted((val) => true);
    // navigate("/dashboard");
  };

  const handleBackBtnClicked = () => {
    setDisplayCustomiseUserExperience(false);
    setDisplayStudentAndSchoolWrapper(true);
  };

  return (
    <ModalContent darkThemeActive={darkThemeActive}>
      <p> Select your preferred settings, you can always change later!</p>

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
      <BtnDiv>
        <MainActionBtn
          onClick={handleClick}
          darkThemeActive={darkThemeActive}
          style={{ width: "100%" }}
        >
          {" "}
          <p style={{ fontSize: "15px" }}>Save</p>
        </MainActionBtn>

        <MainActionBtn onClick={handleBackBtnClicked} style={{ width: "100%" }}>
          {" "}
          Previous
        </MainActionBtn>
      </BtnDiv>
    </ModalContent>
  );
}

export default CustomiseUserExperience;

const ModalContent = styled.div`
  max-width: 60%;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  @media ${device.tablet} {
    width: auto;
  }
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

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
    width: auto;
  }
`;

// color: ${(props) =>
//   props.darkThemeActive
//     ? ThemeStyles.lightThemePrimaryFrontColor
//     : ThemeStyles.darkThemePrimaryFontColor};

const P = styled.p`
  color: red;
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

  border-bottom: 1px solid ${ThemeStyles.highlightSecondaryColor};

  &:hover {
    transition: 0s;
    background-color: rgb(0, 240, 255, 0.2);
    border-radius: 5px;
  }

  p {
    font-size: 14px;
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
