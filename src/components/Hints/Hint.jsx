import React, { useContext } from "react";
import styled from "styled-components";
import { BiHelpCircle } from "react-icons/bi";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import HelpBtn from "../Buttons/HelpBtn";

function Hint({ hint, helpBtnClickHandler, helpneeded }) {
  const { darkThemeActive } = useContext(UserContext);

  const hintStyle = {
    display: "flex",
    margin: "20px",
    padding: "20px",
    backgroundColor: darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor,

    boxShadow: darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow,
  };

  return (
    <>
      <HelpBtn
     
        style={helpneeded ? { display: "none" } : { display: "flex" }}
        onClick={helpBtnClickHandler}
      ></HelpBtn>
      <Wrapper
      data-testid='helpContent'

        style={helpneeded ? hintStyle : { display: "none" }}
        className={
          helpneeded
            ? "animate__animated animate__backInRight animate__fast"
            : ""
        }
      >
        <BiHelpCircle style={{ width: "70px" }} />
        {hint}
      </Wrapper>
    </>
  );
}

export default Hint;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  border-radius: 4px;
  width: 80%;
  max-width: 700px;
  padding: 10px;
`;
