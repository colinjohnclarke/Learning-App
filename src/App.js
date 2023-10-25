import React, { useEffect, useState } from "react";
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

function App() {
  const { isAuthenticated, user } = useAuth0();
  const { data } = useGetUserByEmailQuery(user?.email);
  console.log("🚀 ~ file: App.js:17 ~ App ~ data:", data);

  let createUserRequired = false;
  if (!data) {
    createUserRequired = true; // Remove the 'let' here to update the existing variable
  }
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();

  useEffect(() => {
    if (createUserRequired && isAuthenticated) {
      // Check 'createUserRequired'

      const createNewUser = async () => {
        try {
          const response = await createUser({
            firstName: user.family_name,
            email: user.email,
            emailVerified: user.email_verified,
            // password: user.password,
          });
          return response;
        } catch (error) {
          // Handle any error that occurs during user creation
          console.log("Error creating user:", error);
          return null; // Return null if there's an error
        }
      };

      const newlyCreatedUser = createNewUser();
      newlyCreatedUser.then((response) => {
        console.log("Response from createUser:", response);
        // Handle the response object here
      });
    }
  }, [createUserRequired, isAuthenticated, data]);

  return (
    <div>
      {!isAuthenticated ? (
        <Login></Login>
      ) : (
        <BrowserRouter>
          <Drawer />
          <Header></Header>
          <Routing />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
