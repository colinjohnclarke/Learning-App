import React, { useContext } from "react";
import SelectSchool from "../UserPreferencesOnSignup/SelectSchool/SelectSchool";
import SelectYear from "../UserPreferencesOnSignup/SelectYear/SelectYear";
import SoundEffectsToggle from "./SoundEffectsToggle";
import DarkThemeToggle from "./DarkThemeToggle";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function Settings() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: "20px",
          marginRight: "20px",
          //   border: "1px solid",
        }}
      >
        <h2> Settings</h2>
      </div>
      <Row>
        <Box>
          <SelectSchool />
        </Box>

        <div style={{ height: "100px" }}></div>
        <Box>
          <SelectYear />
        </Box>
      </Row>
      <div style={{ height: "20px" }}></div>
      <Row>
        <Box>
          <LabelText darkThemeActive={darkThemeActive}> First Name</LabelText>
          <Input darkThemeActive={darkThemeActive}></Input>
        </Box>
        <Box>
          <LabelText darkThemeActive={darkThemeActive}> Last Name</LabelText>
          <Input darkThemeActive={darkThemeActive}></Input>
        </Box>
      </Row>

      <div style={{ marginLeft: "20px" }}>
        <SoundEffectsToggle /> <DarkThemeToggle />;
      </div>
    </Wrapper>
  );
}

export default Settings;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  //   border: 3px solid;

  @media ${device.tablet} {
    justify-content: space-around;
  }
`;

const Box = styled.div`
  width: 100%;

  @media ${device.tablet} {
    width: 45%;
  }

  @media ${device.tablet} {
  }
`;

const Name = styled.div`
  min-width: 300px;
  width: 98%;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  //   border: 2px solid red;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  padding-left: 5px;
  width: 100%;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
  border: none;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &::placeholder {
    font-size: 13px;
    font-weight: 400;
    fontstyle: italic;
    letter-spacing: 0px;
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
    margin-left: 10px;
  }

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const LabelText = styled.label`
  font-size: 13px;
  position: relative;
  right: 5px;
  background: transparent;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;
