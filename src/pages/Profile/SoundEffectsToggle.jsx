import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { HiOutlineSpeakerXMark } from "react-icons/hi2";

function SoundEffectsToggle() {
  const { darkThemeActive, silentModeActive, setSilentModeActive } =
    useContext(UserContext);

  const handleSoundOffCheckboxChange = (e) => {
    e.preventDefault();
    const newValue = !silentModeActive;
    setSilentModeActive(newValue);
  };

  return (
    <Box>
      <p
        style={{
          color: darkThemeActive
            ? ThemeStyles.lightThemePrimaryFrontColor
            : ThemeStyles.darkThemePrimaryFontColor,
          fontSize: "14px",
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
          <LightInnerSpan silentModeActive={silentModeActive}></LightInnerSpan>
        </SilentModeSpan>
      </Label>
    </Box>
  );
}

export default SoundEffectsToggle;

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
    border-radius: 16px;
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
