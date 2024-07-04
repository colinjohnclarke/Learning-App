import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CourseBlockBreakown from "./CourseBlockBreakown";
import FetchCourseBreakdownFromSanity from "../FetchfromSanityFns/FetchCourseBreakdownFromSanity";
import DashboardHeader from "../../Dashboard/DashboardHeader/DashboardHeader";
import sanityClient from "../../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { device } from "../../../styles/breakpoints";
import AnimatedPercentageScore from "../../Dashboard/AnimatedPercentageScore/AnimatedPercentageScore";
import { IoChevronBack } from "react-icons/io5";
import SearchCourse from "../../../components/Search/SearchCourse";
import LeaderBoard from "../../Dashboard/LeaderBoard/LeaderBoard";
import AllLessonsinCourse from "./Caulations/AllLessonsinCourse";

import Loader from "../../../components/Loader";
import { VscDebugStart } from "react-icons/vsc";
import ContinueBtn from "../../../components/Buttons/ContinueBtn";
import ConfettiDashboard from "../../../components/AnimatedEffects/ConfettiDashboard";
import AnimatedSuccessIcon from "../../../assets/animations/AnimatedSuccessIcon";

import {
  useGetEnrolledCourseDataQuery,
  useGetAllEnrolledCoursesDataQuery,
  useAddEnrolledCourseMutation,
  useDeleteEnrolledCourse,
} from "../../../redux/api/UserData/enrolledCourseDataSlice";
import {
  useGetUserByEmailQuery,
  useCreateUserMutation,
} from "../../../redux/api/UserData/userDataSlice";
import NavigationBarMobile from "../../../components/Navigation/NavigationBarMobile";
import CourseUserData from "../CourseHeadlineUserData";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import FindNextLessonInCourse from "./Caulations/FindNextLessonInCourse";
import Border from "../../../components/Border";

function CourseDetailedView() {
  const { user } = useAuth0();
  const [breakdownDisplayed, setBreakdownIsDisplayed] = useState(true);
  const { subject, courseName, courseCode } = useParams();
  const [buttonContent, setButtonContent] = useState("Start Learning");
  const navigate = useNavigate();
  const [addCourseBtnClicked, setAddCourseBtnClicked] = useState(false);
  const [addEnrolledCourse] = useAddEnrolledCourseMutation();
  const builder = imageUrlBuilder(sanityClient);
  const { userData, darkThemeActive } = useContext(UserContext);

  const { data, refetch } = useGetUserByEmailQuery(user?.email);

  useEffect(() => {
    refetch();
  }, []);

  const id = userData?.user._id;
  const course = FetchCourseBreakdownFromSanity(courseName, courseCode);
  const courseObj = userData?.user.enrolledCourses.find(
    (course) => course.courseName === courseName
  );
  const courseId = courseObj?._id;
  const LessonsinCourse = AllLessonsinCourse(course);

  window.scrollTo(0, 0);

  useEffect(() => {
    const addCourse = async () => {
      const course = { subject, courseName, id, courseId };

      try {
        const result = await addEnrolledCourse(course)
          .then((result) => {})
          .catch((error) => {});

        refetch();
        setButtonContent((val) => "Start...");
      } catch (error) {
        console.log(error);
      }
    };
    if (addCourseBtnClicked) {
      addCourse();
    }
  }, [addCourseBtnClicked]);

  const completedLessons = userData?.user.blocksCompleted?.filter((course) => {
    return course.courseName === courseName;
  });

  const { nextLesson, courseCompleted } = FindNextLessonInCourse({
    LessonsinCourse,
    completedLessons,
  });

  const coursePercentageCompletion =
    ((completedLessons.length - 1) / LessonsinCourse.length) * 100;

  let headerBannerContent;
  if (!completedLessons.length) {
    headerBannerContent = (
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2
          style={{
            fontWeight: "400",
            fontSize: "1.2rem",
          }}
        >
          Not started
        </h2>
        {!addCourseBtnClicked ? (
          <ContinueBtn
            onClick={() => {
              setAddCourseBtnClicked((val) => true);
            }}
            style={{
              width: "200px",
            }}
          >
            {buttonContent}
            <VscDebugStart size={30} fill={"white"} />
          </ContinueBtn>
        ) : (
          <ContinueBtn
            onClick={() => {
              navigate(
                `/courses/${subject}/${courseName}/${courseCode}/${nextLesson}`
              );
            }}
            style={{
              width: "200px",
            }}
          >
            {buttonContent}
            <VscDebugStart size={30} fill={"white"} />
          </ContinueBtn>
        )}
      </div>
    );
  } else if (!courseCompleted && completedLessons.length) {
    headerBannerContent = (
      <div
        style={{
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div>
          <p
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            Next Lesson up:
          </p>
          <p
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {" "}
            {nextLesson}
          </p>
        </div>

        <ContinueBtn
          onClick={() => {
            navigate(
              `/courses/${subject}/${courseName}/${courseCode}/${nextLesson}`
            );
          }}
          style={{
            alignItems: "center",
          }}
        >
          Continue!
          {/* <VscDebugStart size={30} fill={"white"} /> */}
        </ContinueBtn>
      </div>
    );
  } else if (courseCompleted) {
    headerBannerContent = (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ConfettiDashboard></ConfettiDashboard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            height: "150px",
            borderRadius: "5px",
            position: "relative",
          }}
        >
          <h1
            style={{
              fontWeight: "500",
              color: "rgb(0,250, 250)",
              padding: "20px",
            }}
          >
            Completed{" "}
          </h1>
          <AnimatedSuccessIcon />
        </div>
      </div>
    );
  }

  return !data ? (
    <Loader />
  ) : (
    <Main darkThemeActive={darkThemeActive}>
      <DashboardHeader></DashboardHeader>

      <div
        style={{
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "98%",
        }}
      >
        <Wrapper>
          <Header darkThemeActive={darkThemeActive}>
            <HeaderContent>
              <div
                style={{
                  padding: "20px",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {subject} : {courseName}
                <div style={{ height: "20px" }}></div>
                <AnimatedPercentageScore
                  color="rgb(0, 245, 245)"
                  percentage={coursePercentageCompletion || 0}
                  fontColor=""
                  size="large"
                />
              </div>
            </HeaderContent>

            <CourseUserData
              courseName={courseName}
              subject={subject}
              data={data}
            />

            <div style={{ height: "10px" }}></div>
            <Border>
              <NextSection darkThemeActive={darkThemeActive}>
                {headerBannerContent}
              </NextSection>
            </Border>
          </Header>
          <CourseBlockBreakown
            controllers={{ breakdownDisplayed, setBreakdownIsDisplayed }}
            completedLessons={completedLessons}
            topics={course[0]?.topics}
          ></CourseBlockBreakown>
        </Wrapper>
        <div style={{ height: "10px" }}></div>
        <SearchCourse />
        <div style={{ height: "40px" }}></div>
        <LeaderBoard />
      </div>
      <NavigationBarMobile />
    </Main>
  );
}

export default CourseDetailedView;

const HeaderContent = styled.h1`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  background: linear-gradient(
    225deg,
    rgba(0, 200, 200, 0.4) 0%,
    rgba(0, 200, 200, 0.7) 20%,
    rgba(0, 200, 200, 1) 60%,
    rgba(39, 106, 245, 0.7) 100%
  );
  border-radius: 16px;

  width: 100%;

  font-size: 20px;
  font-weight: 400;

  @media ${device.tablet} {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding-top: 60px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  width: 100%;

  @media ${device.laptop} {
    margintop: 80px;
  }
`;

const NextSection = styled.div`
  width: 100%;
  border-radius: 16px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Main = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Header = styled.div`

  position: relative: 
  // width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: 0.3s;
  border-radius: 16px;
  width: 100%; 
  @media ${device.laptop} {
    marginTop: 60px
  }

`;
