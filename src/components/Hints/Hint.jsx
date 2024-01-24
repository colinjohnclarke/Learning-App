import React from "react";
import { BiHelpCircle } from "react-icons/bi";
import { useContext } from "react";
import { UserContext } from "../../App";

function Hint({ hint }) {
  const { darkThemeActive } = useContext(UserContext);

  const hintStyle = {
    display: "flex",
    backgroundColor: darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor,

    boxShadow: darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow,
  };

  return (
    <Hint style={hintStyle}>
      <BiHelpCircle style={{ width: "70px" }} />
      <p>{hint}</p>
    </Hint>
  );
}

export default Hint;
