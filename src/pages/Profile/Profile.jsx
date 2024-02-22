import React, { useContext } from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { ThemeStyles } from "../../styles/ThemeStyles";

import { UserContext } from "../../App";
import NavigationBarMobile from "../../components/Navigation/NavigationBarMobile";

import Settings from "./Settings";

function Profile() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <DashboardHeader />
      <NavigationBarMobile />
      <Settings />
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: start;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;
