import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FetchBlocksfromSanity from "./FetchBlocksFromSanity";
import CourseBlockBreakown from "./CourseBlockBreakown";
import DashboardHeader from "../Dashboard/DashboardHeader/DashboardHeader";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { device } from "../../styles/breakpoints";
import AnimatedPercentageScore from "../Dashboard/AnimatedPercentageScore";
import { IoChevronBack } from "react-icons/io5";
import SearchCourse from "../../components/Search/SearchCourse";
import LeaderBoard from "../Dashboard/LeaderBoard/LeaderBoard";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import Loader from "../../components/Loader";
import { VscDebugStart } from "react-icons/vsc";
import ContinueBtn from "../../components/Buttons/ContinueBtn";
import ConfettiDashboard from "../../components/AnimatedEffects/ConfettiDashboard";
import AnimatedSuccessIcon from "../../assets/animations/AnimatedSuccessIcon";

import {
  useGetEnrolledCourseDataQuery,
  useGetAllEnrolledCoursesDataQuery,
  useAddEnrolledCourseMutation,
  useDeleteEnrolledCourse,
} from "../../features/api/UserData/enrolledCourseDataSlice";
import {
  useGetUserByEmailQuery,
  useCreateUserMutation,
} from "../../features/api/UserData/userDataSlice";
import NavigationBarMobile from "../../components/Navigation/NavigationBarMobile";
import CourseUserData from "./CourseHeadlineUserData";

import { ThemeStyles } from "../../styles/ThemeStyles";

import { UserContext } from "../../App";

function CourseDetailedView() {
  const { isAuthenticated, user } = useAuth0();
  const [breakdownDisplayed, setBreakdownIsDisplayed] = useState(true);
  const { subject, courseName } = useParams();
  const [buttonContent, setButtonContent] = useState("Start Learning");
  const navigate = useNavigate();
  const [addCourseBtnClicked, setAddCourseBtnClicked] = useState(false);
  const [addEnrolledCourse] = useAddEnrolledCourseMutation();
  const course = FetchBlocksfromSanity();
  const [width, setWidth] = useState(window.innerWidth);
  const builder = imageUrlBuilder(sanityClient);
  const { userData, darkThemeActive } = useContext(UserContext);

  const { data, refetch } = useGetUserByEmailQuery(user?.email);

  const id = userData?.user._id;

  const courseObj = userData?.user.enrolledCourses.find(
    (course) => course.courseName === courseName
  );

  const courseId = courseObj?._id;

  useEffect(() => {
    const addCourse = async () => {
      const course = { subject, courseName, id, courseId };

      try {
        const result = await addEnrolledCourse(course)
          .then((result) => {
            console.log("🚀 ~ ~ result:", result);
          })
          .catch((error) => {
            console.log("🔥 An error occurred:", error);
          });

        refetch();
        // setUserData(result);
        setButtonContent((val) => "Start...");
      } catch (error) {
        console.log(error);
      }
    };

    if (addCourseBtnClicked) {
      addCourse();
    }
  }, [addCourseBtnClicked]);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const blocks = course
    .filter((course) => {
      return course.courseName === courseName;
    })
    .sort((a, b) => {
      return a.blockPositioninCourse - b.blockPositioninCourse;
    });

  // find which blocks user has completed and update continue button to start next block
  const blocksCompleted = userData?.user.blocksCompleted;

  const completedBlocks = blocksCompleted?.filter((block) => {
    return block.courseName === courseName;
  });

  const blocksRemaining = blocks?.filter((block) => {
    return !completedBlocks.some((obj2) => obj2.blockName === block.blockName);
  });

  const CoursePercentageCompletion =
    (completedBlocks.length / blocks.length) * 100;

  function handleResize() {
    setWidth((width) => window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Call handleResize initially

    if (width < 900) {
      setBreakdownIsDisplayed((val) => false);
    } else if (width > 900) {
      setBreakdownIsDisplayed((val) => true);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  let headerBannerContent;

  if (!completedBlocks.length && blocksRemaining.length) {
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
                `/courses/${subject}/${courseName}/${blocks[0].blockName}`
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
  } else if (blocksRemaining.length && blocksCompleted.length) {
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
            Next Section:
          </p>
          <p
            style={{
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {" "}
            {blocksRemaining[0]?.blockName}
          </p>
        </div>

        <ContinueBtn
          onClick={() => {
            navigate(
              `/courses/${subject}/${courseName}/${blocksRemaining[0].blockName}`
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
  } else if (!blocksRemaining.length && blocksCompleted.length) {
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
              <div style={{ padding: "20px", color: "white" }}>
                {subject} : {courseName}
                <div style={{ height: "20px" }}></div>
                <AnimatedPercentageScore
                  color="rgb(0, 245, 245)"
                  percentage={CoursePercentageCompletion || 0}
                  fontColor=""
                />
              </div>
            </HeaderContent>

            <CourseUserData
              courseName={courseName}
              subject={subject}
              data={data}
            />

            <div style={{ height: "10px" }}></div>
            <NextSection darkThemeActive={darkThemeActive}>
              {" "}
              {headerBannerContent}
            </NextSection>
          </Header>

          <div style={{ height: "60px" }}></div>
          <CourseBlockBreakown
            controllers={{ breakdownDisplayed, setBreakdownIsDisplayed }}
            completedBlocks={completedBlocks}
            blocksRemaining={blocksRemaining}
            data={blocks}
          ></CourseBlockBreakown>

          <div style={{ height: "60px" }}></div>
        </Wrapper>
        <div style={{ height: "10px" }}></div>
        <SearchCourse />
        <div style={{ height: "20px" }}></div>
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
  border-radius: 5px;

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
  border-radius: 5px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const Main = styled.div`
  height: 100vh;
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
  border-radius: 5px;
  width: 100%; 
  @media ${device.laptop} {
    marginTop: 60px
  }

`;
