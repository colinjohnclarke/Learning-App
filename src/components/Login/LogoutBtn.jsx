import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MainActionBtn from "../Buttons/MainActionBtn";

const LogoutBtn = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <MainActionBtn style={{ height: "30px" }} onClick={() => logout()}>
        {" "}
        Logout
      </MainActionBtn>
    )
  );
};

export default LogoutBtn;
