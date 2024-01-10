import React, { useContext } from "react";
import MainActionBtn from "./MainActionBtn";
import { BiHelpCircle } from "react-icons/bi";
import { UserContext } from "../../App";

import { ThemeStyles } from "../../styles/ThemeStyles";

function HelpBtn({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <MainActionBtn darkThemeActive={darkThemeActive} {...atributes}>
      <BiHelpCircle />
      <p style={{ paddingLeft: "8px" }}></p>
    </MainActionBtn>
  );
}

export default HelpBtn;
