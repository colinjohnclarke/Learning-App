import React from "react";
import MainActionBtn from "./MainActionBtn";
import { BiHelpCircle } from "react-icons/bi";

function HelpBtn({ ...atributes }) {
  return (
    <MainActionBtn {...atributes}>
      <BiHelpCircle />
      <p style={{ paddingLeft: "8px" }}>Get Help</p>
    </MainActionBtn>
  );
}

export default HelpBtn;
