import React from "react";
import LoginBtn from "../components/Login/LoginBtn";
import LogoutBtn from "../components/Login/LogoutBtn";
import spslogo from "../assets/images/spslogo.png";

function Login() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(225deg, rgba(0, 200, 200, 0.2) 0%, rgba(0, 200, 200, 0.2) 20%, rgba(0, 200, 200, 0.2) 60%, rgba(39, 106, 245, 0.3) 100%)",
        height: "100vh",
        width: "100vw",
      }}
    >
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            // border: "1px solid",

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "45px",
            backgroundColor: "white",
            boxShadow: "0px 0px 20px #fff",
            borderRadius: "50%",
            boxShadow: "0px 0px 100px 80px white",
            marginBottom: "100px",
          }}
        >
          <h1 style={{ fontWeight: "500", color: "rgb(0, 240, 240)" }}>
            SPS online
          </h1>{" "}
          <img style={{ height: "230px" }} src={spslogo} alt="" />
        </div>
        <LoginBtn />
        <LogoutBtn />
      </div>
    </div>
  );
}

export default Login;
