import React from "react";
import MainActionBtn from "./MainActionBtn";
import { BiHelpCircle } from "react-icons/bi";

function HelpBtn({ ...atributes }) {
  return (
    <MainActionBtn {...atributes}>
      <BiHelpCircle />
    </MainActionBtn>
  );
}

export default HelpBtn;
