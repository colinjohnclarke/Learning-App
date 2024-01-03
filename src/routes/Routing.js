import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Dashboard from "../pages/Dashboard/Dashboard";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import Testmath from "../pages/TestMath";
import Maths from "../pages/Maths";
import Biology from "../pages/Main";
import Courses from "../pages/Courses/Courses";
import Settings from "../pages/Settings";
import Profile from "../pages/Dashboard/Profile";
import CourseDetailedView from "../pages/Courses/CourseDetailedView";

function Routing({ navState }) {
  const { selectedNav, setSelectedNav } = navState;

  return (
    <div>
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/main" element={<Main />} />
        {/* <Route path="/maths" element={<Testmath />}></Route> */}
        <Route path="/maths" element={<Maths />} />
        <Route
          navState={{ selectedNav, setSelectedNav }}
          path="/courses/:subject/:courseName/:blockName"
          element={<Main />}
        />

        <Route
          navState={{ selectedNav, setSelectedNav }}
          path="/courses/:subject/:courseName"
          element={<CourseDetailedView />}
        />
      </Routes>
    </div>
  );
}

export default Routing;
