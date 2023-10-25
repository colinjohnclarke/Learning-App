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
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <MainActionBtn onClick={() => loginWithRedirect()}>
          Sign in
        </MainActionBtn>
      </div>
    )
  );
};

export default LoginBtn;
