import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import CourseBlockBreakown from "./CourseBlockBreakown";
import DashboardHeader from "../Dashboard/DashboardHeader";

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

function CourseDetailedView() {
  const [breakdownDisplayed, setBreakdownIsDisplayed] = useState(true);
  const { subject, courseName } = useParams();

  const [width, setWidth] = useState(window.innerWidth);
  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const course = FetchCoursefromSanity();

  // const img = (
  //   <img
  //     alt=""
  //     style={{
  //       height: "100px",
  //       width: "100px",
  //     }}
  //     src={imgurlFor(item.coverImage.asset._ref)}
  //   />
  // );

  const blocks = course.filter((course) => {
    return course.courseName === courseName;
  });

  const courseStarted = false;

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

  return (
    <Main>
      <DashboardHeader></DashboardHeader>
      <div
        style={{
          maxWidth: "1000px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "98%",
          marginTop: "10px",
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

                  padding: "20px",
                }}
              >
                <h2
                  style={{
                    fontWeight: "500",
                    fontSize: "1.5rem",
                    color: "white",
                  }}
                >
                  {subject} : {courseName}
                </h2>

                {courseStarted ? (
                  <div
                    style={{
                      padding: "10px",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <h2
                      style={{
                        fontWeight: "400",
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    >
                      You have completed
                    </h2>
                    <AnimatedPercentageScore
                      color="rgb(39, 106, 245, 1)"
                      percentage={96}
                      fontColor=""
                    />
                  </div>
                ) : (
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
                        // paddingLeft: "10px",
                        fontWeight: "400",
                        fontSize: "1.2rem",
                      }}
                    >
                      {" "}
                      Not started yet!
                    </h2>
                    <MainActionBtn style={{ width: "200px" }}>
                      {" "}
                      Start Learning
                    </MainActionBtn>
                  </div>
                )}
              </div>

              <UserdataWrapper>
                <Box>
                  <AllTimeLearningTimeBox data={122222} />
                </Box>
                <Box>
                  {" "}
                  <AllTimeQuestionsAnsweredBox data={15} />
                </Box>
                <Box>
                  {" "}
                  <AllTimeXPBox data={200} />
                </Box>
              </UserdataWrapper>
              {/* <SearchCourse /> */}
            </HeaderContent>
          </Header>
        </Wrapper>
        <div style={{ height: "20px" }}></div>

        <SearchCourse />
        <LeaderBoard />
      </div>
    </Main>
  );
}

export default CourseDetailedView;

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
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;

  transition: 0.3s;
  background: linear-gradient(
    225deg,
    rgba(0, 200, 200, 0.2) 0%,
    rgba(0, 200, 200, 0.7) 20%,
    rgba(0, 200, 200, 1) 60%,
    rgba(39, 106, 245, 0.7) 100%
  );
  border-radius: 5px;
  // margin: 5px;

  width: 100%;

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
`;

const Header = styled.div`
  height: 100%;
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
  marginTop: 10px;

  @media ${device.laptop} {
    marginTop: 80px
  }



`;

const Box = styled.div`
  height: 100%;
  width: 100%;
  margin: 3px;
  max-width: 300px;
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
  padding: 20px;

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
