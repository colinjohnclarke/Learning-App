import { useAuth0 } from "@auth0/auth0-react";
import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";

const LogoutBtn = () => {
  const { darkThemeActive } = useContext(UserContext);
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Btn darkThemeActive={darkThemeActive} onClick={() => logout()}>
        {" "}
        Logout
      </Btn>
    )
  );
};

export default LogoutBtn;

const Btn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
  width: 200px;
  height: 50px;
  border-radius: 16px;
  border: 1px solid rgb(0, 245, 245);

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  &:hover {
    transform: translateY(-2px);
    transition: 0.2s;
    background-color: rgba(0, 245, 245);
    color: white;
  }

  &:active {
    transform: translateY(-2px);
    // background-color: rgba(0, 245, 245, 0.29);
  }

  p {
    font-size: 15px;
  }
`;
