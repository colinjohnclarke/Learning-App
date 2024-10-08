import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import MainActionBtn from "./MainActionBtn";

function NativatetoDashBoard({ ...atributes }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Link style={{ textDecoration: "none" }} to={"/dashboard"}>
      <MainActionBtn
        style={{
          width: "350px",

          fontWeight: "500",
        }}
        darkThemeActive={darkThemeActive}
        type="button"
        {...atributes}
      >
        Go to Dashboard
      </MainActionBtn>
    </Link>
  );
}

export default NativatetoDashBoard;
