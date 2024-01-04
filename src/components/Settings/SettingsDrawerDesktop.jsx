import React, { useContext, useState } from "react";
import styled from "styled-components";
import "animate.css";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import LogoutBtn from "../Login/LogoutBtn";
import { ThemeStyles } from "../../styles/ThemeStyles";

function SettingsDrawerDesktop({ controllers }) {
  const { settingDrawerIsOpen, setSettingsDrawerIsOpen } = controllers;
  const { userData, darkThemeActive, setDarkThemeActive } =
    useContext(UserContext);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setDarkThemeActive((val) => !val);
  };
  let animate = "animate__animated animate__fadeOutRightBig animate__faster";

  if (settingDrawerIsOpen) {
    animate = "animate__animated animate__fadeInRight animate__faster";
  }

  return (
    <Wrapper className={animate} darkThemeActive={darkThemeActive}>
      <div style={{ height: "50px" }}>
        <p style={{ fontweight: "600" }}>
          {userData?.user.firstName || userData?.user.email}
        </p>
      </div>

      <Box>
        <p>Sound Effects</p>
        <Label class="switch">
          <Input type="checkbox" />
          <Span></Span>
        </Label>
      </Box>
      <Box>
        <p>Dark mode</p>
        <Label class="switch">
          <Input
            checked={isChecked}
            onChange={handleCheckboxChange}
            type="checkbox"
          />
          <Span></Span>
        </Label>
      </Box>
      <LogoutBtn />
    </Wrapper>
  );
}

export default SettingsDrawerDesktop;

const Wrapper = styled.div`
  opacity: 1;
  width: 200px;
  position: absolute;
  z-index: 0;
  top: 0px;
  right: 0px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 10px;

  p {
    font-size: 14px;
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  @media ${device.tablet} {
    width: 200px;
    top: 0px;
    right: 0px;
    box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  }
`;

const Box = styled.div`
  height: 50px;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
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
