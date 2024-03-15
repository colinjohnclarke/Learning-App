import React, { useContext } from "react";
import MainActionBtn from "./MainActionBtn";
import { GrPowerReset } from "react-icons/gr";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function ResetBtn({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <MainActionBtn
      style={{
        width: "45px",
        boxShadow: darkThemeActive
          ? ThemeStyles.lightThemeMainBoxShadow
          : ThemeStyles.darkThemeMainBoxShadow,
      }}
      type="button"
      {...atributes}
    >
      <GrPowerReset stroke="rgb(0,245, 245)" />
    </MainActionBtn>
  );
}

export default ResetBtn;
