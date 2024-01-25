import React, { useContext } from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import NavigationBarMobile from "../../components/Navigation/NavigationBarMobile";

function Profile() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <DashboardHeader />
      <NavigationBarMobile />
    </Wrapper>
  );
}

export default Profile;

const Wrapper = styled.div``;
