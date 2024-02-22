import React, { useEffect, useState, useContext, createContext } from "react";
import "./App.css";
import Routing from "./routes/Routing";
import { BrowserRouter } from "react-router-dom";


import Login from "./pages/Login";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useGetUserByEmailQuery,
  useCreateUserMutation,
} from "./features/api/UserData/userDataSlice";

import UserPreferencesOnSignupModal from "./pages/GatherUserDataOnsignup/UserPreferencesOnSignupModal";

export const UserContext = createContext();

function App() {
  const { isAuthenticated, user } = useAuth0();
  const [loginCompleted, setLoginCompleted] = useState(false);
  const userAuth0 = user;

  // use email to fetch userData from mongoDB
  const { data } = useGetUserByEmailQuery(user?.email);

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
  const [silentModeActive, setSilentModeActive] = useState();
  const [userData, setUserData] = useState({});

  console.log("🚀 ~ App ~ userData:", userData);

  useEffect(() => {
    const storedDarkThemeActive = localStorage.getItem("darkThemeActive");
    const storedSilentModeActive = localStorage.getItem("silentModeActive");

    if (storedDarkThemeActive === "true") {
      setDarkThemeActive(true);
    } else {
      setDarkThemeActive(false);
    }

    if (storedSilentModeActive === "true") {
      setSilentModeActive(true);
    } else {
      setSilentModeActive(false);
    }
  }, []);

  let createUserRequired = false;

  useEffect(() => {
    if (data) {
      setUserData(data);
      localStorage.setItem("userId", data.user._id);
    }

    // if ! data returned then user doesnt exist in DB so need to create user
    if (!data) {
      createUserRequired = true; // Remove the 'let' here to update the existing variable
    }
  }, [data]);

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
    setUserData,
    userData,
    darkThemeActive,
    setDarkThemeActive,
    userAuth0,
    selectedNav,
    setSelectedNav,
    silentModeActive,
    setSilentModeActive,
  };

  let localStorageData;
  if (
    localStorage.getItem("darkThemeActive") === null ||
    localStorage.getItem("silentModeActive") === null
  ) {
    localStorageData = false;
    console.log("Key does not exist!");
  } else if (
    localStorage.getItem("darkThemeActive") !== null &&
    localStorage.getItem("silentModeActive") !== null
  ) {
    localStorageData = true;
    console.log("Key exists!");
  }

  console.log("loginCompleted", loginCompleted);

  console.log("localStorageData", localStorageData);

  console.log("data", data);
  return (
    <UserContext.Provider value={userContextValues}>
      <BrowserRouter>
        {!isAuthenticated && <Login />}

        {loginCompleted &&
          !localStorageData &&
          !isSchoolandUserPreferencesCompleted && (
            <UserPreferencesOnSignupModal
              setIsShoolandUserPreferencesCompleted={
                setIsShoolandUserPreferencesCompleted
              }
            />
          )}

        {loginCompleted && localStorageData && data && (
          <div>
            {" "}
        
           
            <Routing />{" "}
          </div>
        )}
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
