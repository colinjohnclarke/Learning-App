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

export const UserContext = createContext();

function App() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();

  const { data } = useGetUserByEmailQuery(user?.email);

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
  });

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

  return (
    <div>
      {!isAuthenticated ? (
        <Login></Login>
      ) : (
        // <h1>djshj</h1>
        <BrowserRouter>
          <Drawer />
          <Header></Header>
          <UserContext.Provider value={data}>
            <Routing navState={{ selectedNav, setSelectedNav }} />
            <NavigationBarMobile navState={{ selectedNav, setSelectedNav }} />
          </UserContext.Provider>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
