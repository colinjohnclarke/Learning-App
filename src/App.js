import React, { useEffect, useState, useContext, createContext } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import Drawer from "./components/Drawer/Drawer";
import Login from "./pages/Login";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetUserByEmailQuery,
  useCreateUserMutation,
} from "./features/api/UserData/userDataSlice";
import NavigationBarMobile from "./components/Navigation/NavigationBarMobile";
import AnimatedPercentageScore from "./pages/Dashboard/AnimatedPercentageScore";
import spslogo from "./assets/images/spslogo.png";
import styled from "styled-components";
import { device } from "./styles/breakpoints";
import { GiCorkHat } from "react-icons/gi";

export const UserContext = createContext();

function App() {
  const { isAuthenticated, user } = useAuth0();

  const userAuth0 = user;

  const { data } = useGetUserByEmailQuery(user?.email);

  let userData;

  if (data) {
    userData = data;
    console.log("🚀 ~ App ~ userData:", userData);
  }

  // const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  let createUserRequired = false;
  if (!data) {
    createUserRequired = true; // Remove the 'let' here to update the existing variable
  }
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  const [selectedNav, setSelectedNav] = useState({
    Dashboard: "true",
    Courses: "false",
    Profile: "false",
    Settings: "false",
    courseView: "false",
  });

  const [darkThemeActive, setDarkThemeActive] = useState(true);
  const [silentModeActive, setSilentModeActive] = useState(true);

  // useEffect(() => {
  //   const getUserMetadata = async () => {
  //     const domain = process.env.REACT_APP_AUTH0_DOMAIN;

  //     try {
  //       const accessToken = await getAccessTokenSilently({
  //         authorizationParams: {
  //           audience: `https://${domain}/api/v2/`,
  //           scope: "read:current_user",
  //         },
  //       });

  //       const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

  //       const metadataResponse = await fetch(userDetailsByIdUrl, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       });

  //       const { user_metadata } = await metadataResponse.json();

  //       setUserMetadata(user_metadata);
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   };

  //   getUserMetadata();
  // }, [getAccessTokenSilently, user?.sub]);

  useEffect(() => {
    if (createUserRequired && isAuthenticated) {
      // Check 'createUserRequired'

      const createNewUser = async () => {
        try {
          const response = await createUser({
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            emailVerified: user.email_verified,
            // password: user.password,
          });
          return response;
        } catch (error) {
          return null; // Return null if there's an error
        }
      };

      const newlyCreatedUser = createNewUser();
      newlyCreatedUser.then((response) => {
        // Handle the response object here
      });
    }
  }, [createUserRequired, isAuthenticated, data]);

  const userContextValues = {
    userData,
    darkThemeActive,
    setDarkThemeActive,
    userAuth0,
    selectedNav,
    setSelectedNav,
  };

  return (
    <UserContext.Provider value={userContextValues}>
      <div>
        {!isAuthenticated ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {" "}
            <h1 style={{ fontWeight: "500", color: "rgb(0, 240, 240)" }}>
              SPS online
            </h1>
            <img style={{ height: "230px" }} src={spslogo} alt="" />
            <Login></Login>
          </div>
        ) : (
          <BrowserRouter>
            <Drawer />
            <Header></Header>
            <Routing />
          </BrowserRouter>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
