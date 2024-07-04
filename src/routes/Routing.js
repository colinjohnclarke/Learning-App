import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import IncorrectAnswersMain from "../pages/Main/IncorrectAnswers/IncorrectAnswersMain";
const Main = lazy(() => import("../pages/Main/Main"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Courses = lazy(() => import("../pages/Courses/Courses"));
const Settings = lazy(() => import("../pages/Settings"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const CourseDetailedView = lazy(() =>
  import("../pages/Courses/CourseDetails/CourseDetailedView")
);

function Routing({ navState }) {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/courses/:subject/:courseName/:courseCode/:lessonName"
          element={<Main />}
        />
        <Route
          path="/courses/:subject/:courseName/:courseCode/:lessonName/incorrectAnswers"
          element={<IncorrectAnswersMain />}
        />

        {/* to={`course/${params.subject}/${params.coursName}/${params.courseCode}/${lesson.name}`} */}
        <Route
          path="/courses/:subject/:courseName/:courseCode"
          element={<CourseDetailedView />}
        />
      </Routes>
    </Suspense>
  );
}

export default Routing;
