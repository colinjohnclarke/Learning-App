import React from "react";
import { UserContext } from "../../App";
import { useContext } from "react";
import { ThemeStyles } from "../../styles/ThemeStyles";
import MainActionBtn from "../Buttons/MainActionBtn";

function InputForm({
  handleFormChange,
  textfieldLabel,
  handleFocusInput,
  handleSubmit,
  animate,
  selectedInputColor,
  spanStyle,
}) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <form
      data-testid="form"
      style={{
        fontFamily: "Montserrat",
      }}
      onSubmit={handleSubmit}
    >
      <div
        data-testid="focus"
        className={animate}
        onClick={() => {
          handleFocusInput();
        }}
        style={{
          position: "relative",
          backgroundColor: selectedInputColor,
          borderRadius: "5px",
        }}
      >
        <input
          style={{
            height: "30px",
            width: "200px",
            padding: "10px",

            backgroundColor: darkThemeActive
              ? ThemeStyles.lightThemePrimaryBackgroundColor
              : ThemeStyles.darkThemePrimaryBackgroundColor,

            color: darkThemeActive
              ? ThemeStyles.lightThemePrimaryFrontColor
              : ThemeStyles.darkThemePrimaryFontColor,
            border: "3.5px solid rgb(0, 240, 240, 0.5)",
            borderRadius: "5px",
            display: "flex",
            position: "relative",
            outline: "none",
            fontSize: "14px",
            transition: "0.2s",
          }}
          required="required"
          type="text"
          label={textfieldLabel}
          onChange={handleFormChange}
        />

        <label style={spanStyle}>{textfieldLabel}</label>
      </div>
      <div style={{ height: "20px", width: "20px" }}></div>

      <MainActionBtn
        style={{
          backgroundColor: "rgb(00, 245, 245)",
          color: "white",
          height: "55px",
          width: "90px",
        }}
        type="submit"
      >
        {" "}
        Check
      </MainActionBtn>
    </form>
  );
}

export default InputForm;
