import React from "react";
import MainActionBtn from "./MainActionBtn";
import { GrPowerReset } from "react-icons/gr";

function ResetBtn({ ...atributes }) {
  return (
    <MainActionBtn type="button" {...atributes}>
      <GrPowerReset />
    </MainActionBtn>
  );
}

export default ResetBtn;
