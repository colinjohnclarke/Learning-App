import React, { useContext } from "react";

import { UserContext } from "../../App";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { useAuth0 } from "@auth0/auth0-react";
import Weekday from "../../components/Weekday";

function DashboardWelcome() {
  const { userData, darkThemeActive } = useContext(UserContext);

  const user = useAuth0();
  console.log("🚀 ~ DashboardWelcome ~ user:", user);

  return (
    <Greeting darkThemeActive={darkThemeActive}>
      <Welcome>
        <h3 style={{ color: "white" }}>
          Welcome {userData?.user.firstName || user.user.given_name}
        </h3>

        <img
          referrerpolicy="no-referrer"
          style={{
            height: "60px",
            width: "60px",
            borderRadius: "20px",
            objectFit: "fill",
            margin: "10px",
            // border: "2px solid",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          }}
          alt="User Avatar"
          src={user?.user.picture}
        />
      </Welcome>
      <Weekday />
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
