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

import UserPreferencesOnSignupModal from "./pages/UserPreferencesOnSignup/UserPreferencesOnSignupModal";

export const UserContext = createContext();

function App() {
  const { isAuthenticated, user } = useAuth0();

  const [loginCompleted, setLoginCompleted] = useState(false);

  const [
    isSchoolandUserPreferencesCompleted,
    setIsShoolandUserPreferencesCompleted,
  ] = useState(false);

  const [selectedNav, setSelectedNav] = useState({
    Dashboard: "true",
    Courses: "false",
    Profile: "false",
    Settings: "false",
    courseView: "false",
  });

  const [darkThemeActive, setDarkThemeActive] = useState();
  console.log("🚀 ~ App ~ darkThemeActive:", darkThemeActive);
  const [silentModeActive, setSilentModeActive] = useState();

  const userAuth0 = user;

  // use email to fetch userData from mongoDB
  const { data } = useGetUserByEmailQuery(user?.email);

  let userData;

  if (data) {
    userData = data;
    console.log("🚀 ~ App ~ userData:", userData);
  }

  let createUserRequired = false;

  // if ! data returned then user doesnt exist in DB so need to create user
  if (!data) {
    createUserRequired = true; // Remove the 'let' here to update the existing variable
  }
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  useEffect(() => {
    if (isAuthenticated && data) {
      setLoginCompleted(true);
    }
  }, [isAuthenticated, data]);

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
        setLoginCompleted(true);
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
    silentModeActive,
    setSilentModeActive,
  };

  useEffect(() => {
    const silentModeActiveVal = localStorage.getItem("silentModeActive");

    setDarkThemeActive(silentModeActiveVal);

    const darkThemeActiveVal = localStorage.getItem("darkThemeActive");

    setDarkThemeActive(darkThemeActiveVal);
  }, []);

  return (
    <UserContext.Provider value={userContextValues}>
      <BrowserRouter>
        <div>
          {!isAuthenticated && <Login />}

          {loginCompleted && !isSchoolandUserPreferencesCompleted && (
            <UserPreferencesOnSignupModal
              setIsShoolandUserPreferencesCompleted={
                setIsShoolandUserPreferencesCompleted
              }
            />
          )}

          {loginCompleted && isSchoolandUserPreferencesCompleted && (
            <div>
              {" "}
              <Drawer />
              <Header></Header>
              <Routing />{" "}
            </div>
          )}
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
