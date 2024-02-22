import React, { useContext } from "react";
import LoginBtn from "../components/Login/LoginBtn";
import LogoutBtn from "../components/Login/LogoutBtn";
import spslogo from "../assets/images/spslogo.svg";
import { UserContext } from "../App";

function Login() {
  const { darkThemeActive } = useContext(UserContext);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: darkThemeActive
          ? `linear-gradient(
            225deg,
            rgba(0, 100, 200, 0.3) 0%,
            rgba(0, 200, 200, 0.3) 30%,
            rgba(0, 240, 240, 0.3) 60%,
            rgba(39, 106, 245, 0.3) 100%
          )`
          : `linear-gradient(225deg, rgb(58,80,107) 0%, #1c2541 50%, #0b132b 100%)`,

        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "300px",
          width: "60%",
          maxWidth: "500px",
          position: "relative",
          padding: "60px",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
           
          }}
        >
          <h1 style={{ fontWeight: "500", color: "rgb(0, 240, 240)" }}>
            SPS online
          </h1>{" "}
          <img style={{ height: "230px",  marginBottom: '40px' }} src={spslogo} alt="" />
        </div>
        
        <LoginBtn darkThemeActive={darkThemeActive} />
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Login;
