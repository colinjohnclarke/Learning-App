import React, { useContext } from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import NavigationBarMobile from "../../components/Navigation/NavigationBarMobile";
import SelectSchool from "../UserPreferencesOnSignup/SelectSchool/SelectSchool";
import SelectYear from "../UserPreferencesOnSignup/SelectYear/SelectYear";
import SoundEffectsToggle from "./SoundEffectsToggle";
import DarkThemeToggle from "./DarkThemeToggle";
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
