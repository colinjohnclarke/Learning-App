import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Testmath from "../pages/TestMath";
import Maths from "../pages/Maths";

function Routing() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/maths" element={<Testmath />}></Route> */}
        <Route path="/maths" element={<Maths />} />
      </Routes>
    </div>
  );
}

export default Routing;
