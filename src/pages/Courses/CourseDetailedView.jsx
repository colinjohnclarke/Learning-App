import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import CourseBlockBreakown from "./CourseBlockBreakown";
import DashboardHeader from "../Dashboard/DashboardHeader";
import completedAnimation from "../../assets/images/completedAnimation.gif";

import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { device } from "../../styles/breakpoints";
import AllTimeLearningTimeBox from "../Dashboard/Scores/AllTimeLearningTimeBox";
import AllTimeQuestionsAnsweredBox from "../Dashboard/Scores/AllTimeQuestionsAnsweredBox";
import AllTimeXPBox from "../Dashboard/Scores/AllTimeXPBox";
import AnimatedPercentageScore from "../Dashboard/AnimatedPercentageScore";
import { IoChevronBack } from "react-icons/io5";
import SearchCourse from "../../components/Search/SearchCourse";
import LeaderBoard from "../Dashboard/LeaderBoard/LeaderBoard";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import {
  useGetEnrolledCourseDataQuery,
  useGetAllEnrolledCoursesDataQuery,
  useAddEnrolledCourseMutation,
  useDeleteEnrolledCourse,
} from "../../features/api/UserData/enrolledCourseDataSlice";
import CourseBlockBreakdownMobile from "./CourseBlockBreakdownMobile";
import { ThemeStyles } from "../../styles/ThemeStyles";

import { UserContext } from "../../App";

function CourseDetailedView() {
  const [breakdownDisplayed, setBreakdownIsDisplayed] = useState(true);
  const { subject, courseName } = useParams();
  const [buttonContent, setButtonContent] = useState("Start Learning");
  const navigate = useNavigate();
  const [addCourseBtnClicked, setAddCourseBtnClicked] = useState(false);
  const [addEnrolledCourse] = useAddEnrolledCourseMutation();
  const course = FetchCoursefromSanity();
  const [width, setWidth] = useState(window.innerWidth);
  const builder = imageUrlBuilder(sanityClient);
  const { userData, darkThemeActive } = useContext(UserContext);

  const id = userData?.user._id;

  // get the course overview data from mongodb for animated user data display
  const { data } = useGetEnrolledCourseDataQuery({ courseName, id });
  const courseDetails = data?.courseData;

  useEffect(() => {
    const addCourse = async () => {
      const course = { subject, courseName, id };
      try {
        const buttonContent = await addEnrolledCourse(course);
        setButtonContent((val) => "Start...");
      } catch (error) {
        console.log(error);
      }
    };

    if (addCourseBtnClicked) {
      console.log("addCourseBtnClicked", addCourseBtnClicked);
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
    return block.courseName === courseName && block.Subject === subject;
  });

  const blocksRemaining = blocks?.filter((block) => {
    return !completedBlocks.some((obj2) => obj2.blockName === block.blockName);
  });

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

  if (blocksRemaining.length && blocksCompleted.length) {
    headerBannerContent = (
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h3
            style={{
              fontWeight: "500",
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            Next Section: {blocksRemaining[0]?.blockName}
          </h3>
          <MainActionBtn
            onClick={() => {
              navigate(
                `/courses/${subject}/${courseName}/${blocksRemaining[0].blockName}`
              );
            }}
            style={{
              height: "50px",
              width: "60%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                color: "rgb(0, 250, 250)",
              }}
            >
              Continue!
            </p>
          </MainActionBtn>
        </div>
        <AnimatedPercentageScore
          color="rgb(39, 106, 245, 1)"
          percentage={data?.courseData?.percentageProgress || 0}
          fontColor=""
        />
      </div>
    );
  } else if (blocksRemaining.length === 0) {
    headerBannerContent = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          boxShadow: "0px 0px 30px 4px rgba(174, 196, 216, 0.25)",
        }}
      >
        <h1 style={{ color: "white" }}>completed!!</h1>
        <img
          style={{ height: "200px", width: "200px", borderRadius: "5px" }}
          src={completedAnimation}
          alt=""
        />
      </div>
    );
  } else {
    headerBannerContent = (
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <h2
          style={{
            color: "white",
            fontWeight: "400",
            fontSize: "1.2rem",
          }}
        >
          Not started yet!
        </h2>
        {!addCourseBtnClicked ? (
          <MainActionBtn
            onClick={() => {
              setAddCourseBtnClicked((val) => true);
            }}
            style={{ width: "200px" }}
          >
            {buttonContent}
          </MainActionBtn>
        ) : (
          <MainActionBtn
            onClick={() => {
              navigate(
                `/courses/${subject}/${courseName}/${blocks[0].blockName}`
              );
            }}
            style={{ width: "200px" }}
          >
            {buttonContent}
          </MainActionBtn>
        )}
      </div>
    );
  }

  return (
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
          <SidePanel
            className=""
            style={breakdownDisplayed ? panelStyleOpen : panelStyleClosed}
          >
            <Button
              onClick={() => setBreakdownIsDisplayed((val) => !val)}
              style={
                breakdownDisplayed ? buttonPositionOpen : buttonPositionClosed
              }
            >
              <IoChevronBack size={20} />
            </Button>

            <CourseBlockBreakown
              controllers={{ breakdownDisplayed, setBreakdownIsDisplayed }}
              completedBlocks={completedBlocks}
              blocksRemaining={blocksRemaining}
              data={blocks}
            ></CourseBlockBreakown>
          </SidePanel>
          <Header>
            <PanelBuffer
              style={breakdownDisplayed ? bufferPannelOpen : bufferPannelClosed}
            ></PanelBuffer>

            <HeaderContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2
                  style={{
                    fontWeight: "500",
                    fontSize: "1.4rem",
                    color: "white",
                  }}
                >
                  {subject} : {courseName}
                </h2>

                {headerBannerContent}
              </div>

              <UserdataWrapper>
                <Box>
                  <AllTimeLearningTimeBox
                    data={data?.courseData?.XPForCurrentCourse || 0}
                  />
                </Box>
                {/* <Box>
                  {" "}
                  <AllTimeQuestionsAnsweredBox data={data.courseData} />
                </Box> */}
                <Box>
                  {" "}
                  <AllTimeXPBox
                    data={data?.courseData?.timeElapsedForCurrentCourse || 0}
                  />
                </Box>
              </UserdataWrapper>
            </HeaderContent>
          </Header>
        </Wrapper>
        <div style={{ height: "10px" }}></div>
        <SearchCourse />
        <CourseBlockBreakdownMobile
          controllers={{ breakdownDisplayed, setBreakdownIsDisplayed }}
          completedBlocks={completedBlocks}
          blocksRemaining={blocksRemaining}
          data={blocks}
        />

        <LeaderBoard />
      </div>
    </Main>
  );
}

export default CourseDetailedView;

const buttonPositionOpen = {
  position: "relative",
  top: "0px",
  right: "24px",
  justifyContent: "center",
};

const buttonPositionClosed = {
  position: "relative",
  top: "0px",
  right: "28px",
  zIndex: "200",
  justifyContent: "start",
  transform: "rotate(180deg)",
};

const panelStyleClosed = {
  position: "absolute",
  left: "-380px",
  transition: "0.3s",
  zIndex: "20",
};

const panelStyleOpen = {
  position: "absolute",
  left: "0px",
  transition: "0.3s",
  zIndex: "20",
};

const bufferPannelOpen = {
  position: "relative",
  left: "0px",
  transition: "0.3s",
  width: "600px",
};
const bufferPannelClosed = {
  position: "absolute",
  left: "-390px",
  transition: "0.3s",
  width: "400px",
  display: "none",
};

const SidePanel = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  width: 520px;
  max-width: 520px;
  justify-content: start;
  align-items: center;
  transition: 0.3s;
  // border: 1px solid green;
`;

const PanelBuffer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 100%;
  width: 520px;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  // margin: 20px;
  z-index: 10;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: 0.3s;
  background: linear-gradient(
    -225deg,
    rgb(115, 46, 255, 0.6) 0%,
    rgba(0, 200, 200, 0.7) 70%,
    rgba(0, 200, 200, 0.6) 80%,
    rgba(39, 106, 245, 0.5) 100%
  );
  border-radius: 5px;

  width: 100%;
  padding-bottom: 10px;

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

const Main = styled.div`
  height: 100%;
  width: 100%;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};
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
  // // margin: 8px;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  marginTop: 5px;
 


  @media ${device.laptop} {
    marginTop: 80px
  }



`;

const Box = styled.div`
  height: 100%;
  width: 100%;

  margin: 3px;
  max-width: 200px;
  // padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
`;

const UserdataWrapper = styled.div`
  // padding-top: 10px;
  width: 96%;
  height: 70px;
  // padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
  // margin: 10px;
  // max-width: 500px;

  @media ${device.tablet} {
    // width: 50%;
    // transition: 0s;
  }
`;

const Button = styled.button`
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: end;
  align-items: center;
  z-index: 20;
  border: none;
  background: linear-gradient(
    225deg,
    rgba(0, 200, 200, 1) 0%,

    rgba(39, 106, 245, 1) 100%
  );
  box-shadow: 0px 0px 20px 4px rgba(174, 196, 216, 0.85);

  &:hover {
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
    background-color: rgb(39, 106, 245, 0.05);
  }

  &:active {
    transform: translateY(3px);
    background-color: rgba(0, 240, 240, 1);
    box-shadow: none;
  }
  display: none;

  @media ${device.tablet} {
    display: flex;
  }
`;
