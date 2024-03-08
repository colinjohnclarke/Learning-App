import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import styled from "styled-components";
import DashboardHeader from "./DashboardHeader/DashboardHeader";
import CoursesDashBoard from "./CoursesDashBoard";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import SearchCourse from "../../components/Search/SearchCourse";
import "animate.css";
import { device } from "../../styles/breakpoints";
import DashboardWelcome from "./DashboardWelcome/DashboardWelcome";
import DashboardStreakXPProgressView from "../../components/DayStreak/DashboardStreakXPProgressView";
import NavigationBarMobile from "../../components/Navigation/NavigationBarMobile";
import { ThemeStyles } from "../../styles/ThemeStyles";
import DashboardHeadlineData from "./DashboardHeadlineData";

function Dashboard() {
  const { userData, darkThemeActive, setSelectedNav } = useContext(UserContext);

  useEffect(() => {
    setSelectedNav((prevState) => ({ ["Dashboard"]: "true" }));
  }, []);

  window.scrollTo(0, 0);

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      <DashboardHeader />
      <Padding>
        <Main>
          <DashboardWelcome />
          <DashboardHeadlineData />
          <DashboardStreakXPProgressView />
          <SearchCourse />
          <Padding></Padding>
          <CoursesDashBoard />
          <Padding></Padding>
          <LeaderBoard />
        </Main>
      </Padding>
      <NavigationBarMobile />
    </Wrapper>
  );
}

export default Dashboard;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Padding = styled.div`
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;

  @media ${device.desktop} {
    width: 100%;
  }
`;
const Main = styled.div`
  height: 100%;
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  // padding: 10px;
  @media ${device.tablet} {
    margin-top: 60px;
  }
`;
