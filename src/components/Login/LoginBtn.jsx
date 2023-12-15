import React from "react";
import MainActionBtn from "../Buttons/MainActionBtn";
import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <MainActionBtn
          style={{ width: "350px", height: "50px" }}
          onClick={() => loginWithRedirect()}
        >
          Sign in
        </MainActionBtn>
      </div>
    )
  );
};

export default LoginBtn;
