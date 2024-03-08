import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
const Main = lazy(() => import("../pages/Main/Main"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Courses = lazy(() => import("../pages/Courses/Courses"));
const Settings = lazy(() => import("../pages/Settings"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const CourseDetailedView = lazy(() =>
  import("../pages/Courses/CourseDetailedView")
);

function Routing({ navState }) {
  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route
            path="/courses/:subject/:courseName/:blockName"
            element={<Main />}
          />
          <Route
            path="/courses/:subject/:courseName"
            element={<CourseDetailedView />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default Routing;
