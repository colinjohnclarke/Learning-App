import React, { useContext } from "react";

import { UserContext } from "../../../App";
import styled from "styled-components";
import {
  lightThemePrimaryFrontColor,
  ThemeStyles,
} from "../../../styles/ThemeStyles";
import { device } from "../../../styles/breakpoints";

import Weekday from "./Weekday";
import Border from "../../../components/Border";

function DashboardWelcome() {
  const { userData, darkThemeActive } = useContext(UserContext);

  return (
    <Border
      style={{ height: "180px", margin: "20px" }}
      darkThemeActive={darkThemeActive}
    >
      <Greeting darkThemeActive={darkThemeActive}>
        <Welcome>
          <h3
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            Welcome {userData?.user.firstName}
          </h3>
        </Welcome>
        <Weekday />
      </Greeting>
    </Border>
  );
}

export default DashboardWelcome;

const Greeting = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.darkThemeActive
      ? "white"
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  background-image: ${(props) =>
    props.darkThemeActive ? "white" : ThemeStyles.darkthemeShadowBorder};

  // @media ${device.tablet} {
  //   height: 20vh;
  //   margin-top: 10px;
  //   margin-bottom: 10px;
  // }

  border-radius: 16px;
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
  // background-image: tranparent;
`;
