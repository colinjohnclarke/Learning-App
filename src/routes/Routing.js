import React from "react";
import { Routes, Route } from "react-router-dom";
import Biology from "../pages/Biology";
import Dashboard from "../pages/Dashboard/Dashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Maths from "../pages/Maths";

function Routing() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<Biology />} />
        <Route path="login" element={<Login />} />
        <Route path="/Biology" element={<Biology />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/maths" element={<Maths />}></Route>
      </Routes>
    </div>
  );
}

export default Routing;
