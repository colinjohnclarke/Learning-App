import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { LuFlashlight } from "react-icons/lu";
import { LuFlashlightOff } from "react-icons/lu";

function DarkThemeToggle() {
  const { darkThemeActive, setDarkThemeActive } = useContext(UserContext);

  const handleDarkModeCheckboxChange = (e) => {
    e.preventDefault();
    const newVal = !darkThemeActive;
    setDarkThemeActive(newVal);
  };
  return (
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
          <DarkInnerSpan darkThemeActive={darkThemeActive}></DarkInnerSpan>{" "}
        </DarkThemeSpan>
      </Label>
    </Box>
  );
}

export default DarkThemeToggle;

const Box = styled.div`
  height: 50px;
  width: 300px;
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
