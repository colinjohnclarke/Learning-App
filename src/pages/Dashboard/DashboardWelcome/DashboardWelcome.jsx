import React, { useContext } from "react";

import { UserContext } from "../../../App";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { device } from "../../../styles/breakpoints";

import Weekday from "./Weekday";

function DashboardWelcome() {
  const { userData, darkThemeActive } = useContext(UserContext);

  return (
    <Greeting darkThemeActive={darkThemeActive}>
      <Welcome>
        <h3 style={{ color: "white" }}>Welcome {userData?.user.firstName}</h3>
      </Welcome>
      <Weekday  />
    </Greeting>
  );
}

export default DashboardWelcome;

const Greeting = styled.div`
  height: 180px;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    225deg,
    rgba(0, 200, 200, 0.4) 0%,
    rgba(0, 200, 200, 0.7) 20%,
    rgba(0, 200, 200, 1) 60%,
    rgba(39, 106, 245, 0.7) 100%
  );
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  @media ${device.tablet} {
    height: 20vh;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  border-radius: 4px;
`;

const Welcome = styled.div`
  font-size: 20px;
  width: 100%;
  height: 3vh;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;
