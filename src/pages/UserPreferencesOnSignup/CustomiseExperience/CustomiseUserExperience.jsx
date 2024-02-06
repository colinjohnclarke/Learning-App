import React, { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { device } from "../../../styles/breakpoints";
import { AiOutlineSound } from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa";

function CustomiseUserExperience() {
  const { darkThemeActive, setDarkThemeActive } = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);

  // const menuRef = useRef(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setDarkThemeActive((val) => !val);
  };

  return (
    <ModalContent darkThemeActive={darkThemeActive}>
      Select your preferred settings, you can always change later!
      <Box>
        <p>Sound Effects</p>
        <AiOutlineSound />

        <Label class="switch">
          <Input type="checkbox" />
          <Span></Span>
        </Label>
      </Box>
      <Box>
        <p>Dark mode</p>
        <FaRegLightbulb />
        <Label class="switch">
          <Input
            checked={isChecked}
            onChange={handleCheckboxChange}
            type="checkbox"
          />
          <Span></Span>
        </Label>
      </Box>
    </ModalContent>
  );
}

export default CustomiseUserExperience;

const ModalContent = styled.div`
  width: 60%;
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

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  @media ${device.tablet} {
    width: auto;
  }
`;

const Box = styled.div`
  height: 50px;
  width: 100%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;git 
  margin-right: 20px;
  padding-left: 6px;
  padding-right: 6px;

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
