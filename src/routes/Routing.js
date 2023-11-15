import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Testmath from "../pages/TestMath";
import Maths from "../pages/Maths";
import Biology from "../pages/Main";

function Routing() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main" element={<Main />} />
        {/* <Route path="/maths" element={<Testmath />}></Route> */}
        <Route path="/maths" element={<Maths />} />
        <Route path="/courses/biology" element={<Main />} />
      </Routes>
    </div>
  );
}

export default Routing;
