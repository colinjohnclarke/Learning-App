import React, { useEffect, useState, useContext, createContext } from "react";
import "./App.css";
import Routing from "./routes/Routing";

import Login from "./pages/Login";
import { useAuth0 } from "@auth0/auth0-react";
import checkLocalStorageForThemePrefs from "./components/Data/LocalStorage/checkLocalStorageForThemePrefs";
import UserThemePrefsLocalStorage from "./components/Data/LocalStorage/UserThemePrefsLocalStorage";
import {
  useGetUserByEmailQuery,
  useCreateUserMutation,
} from "./redux/api/UserData/userDataSlice";
import UserPreferencesOnSignupModal from "./pages/GatherUserDataOnsignup/UserPreferencesOnSignupModal";
import Loader from "./components/Loader";

export const UserContext = createContext();

function App() {
  const { isAuthenticated, isLoading, user } = useAuth0();

  const [loginCompleted, setLoginCompleted] = useState(false);
  const [
    isSchoolandUserPreferencesCompleted,
    setIsShoolandUserPreferencesCompleted,
  ] = useState(false);

  const [darkThemeActive, setDarkThemeActive] = useState();
  const [silentModeActive, setSilentModeActive] = useState();
  const [userData, setUserData] = useState({});
  const [selectedNav, setSelectedNav] = useState({
    Dashboard: "true",
    Courses: "false",
    Profile: "false",
    Settings: "false",
    courseView: "false",
  });

  const userAuth0 = user;

  const [createUser] = useCreateUserMutation();

  // use email to fetch userData from mongoDB
  const { data } = useGetUserByEmailQuery(user?.email);

  console.log("🚀 ~ App ~ userData:", userData);

  let createUserRequired = false;

  if (!data) {
    createUserRequired = true; // Remove the 'let' here to update the existing variable
  }

  useEffect(() => {
    if (data) {
      setUserData(data);
      localStorage.setItem("userId", data.user._id);
    }
  }, [data]);

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

  let localStorageData = checkLocalStorageForThemePrefs();

  return (
    <UserContext.Provider value={userContextValues}>
      <UserThemePrefsLocalStorage
        setSilentModeActive={setSilentModeActive}
        setDarkThemeActive={setDarkThemeActive}
      />

      {isLoading && !isAuthenticated && <Loader />}
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
    </UserContext.Provider>
  );
}

export default App;
