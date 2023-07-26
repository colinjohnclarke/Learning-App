import React from "react";
import { Routes, Route } from "react-router-dom";
import Biology from "../pages/Biology";
import Dashboard from "../pages/Dashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";

function Routing() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="/Biology" element={<Biology />} />
      </Routes>
    </div>
  );
}

export default Routing;
