import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";

function InputField({ text, setStateFN, icon, placeholder }) {
  const { darkThemeActive } = useContext(UserContext);

  const handleChange = (e) => {
    setStateFN(e.target.value);
  };
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginLeft: "5px",
          marginBottom: "10px",
        }}
      >
        <LabelText darkThemeActive={darkThemeActive}> {text}</LabelText>
        {icon}
      </div>

      <Input
        placeholder={placeholder}
        onChange={handleChange}
        type="text"
        darkThemeActive={darkThemeActive}
      ></Input>
    </div>
  );
}

export default InputField;

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
  font-size: 14px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &::placeholder {
    font-size: 10px;
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

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;
