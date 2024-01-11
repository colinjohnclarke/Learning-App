import React, { useContext } from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";

function Profile() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <DashboardHeader />
      Profile
      <div
        style={{ height: "100px", width: "100px", border: "3px solid" }}
      ></div>
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  background-color: red;
`;
