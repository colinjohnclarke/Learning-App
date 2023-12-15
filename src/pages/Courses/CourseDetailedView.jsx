import React, { useState } from "react";
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

function CourseDetailedView() {
  const [breakdownDisplayed, setBreakdownIsDisplayed] = useState(true);
  const { subject, courseName } = useParams();

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

  const buttonPositionOpen = {
    position: "absolute",
    top: "5px",
    right: "5px",
    zIndex: "200",
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <Main>
      <DashboardHeader />
      {/* <Wrapper> */}

      <SidePanel>
        <Button
          onClick={() => setBreakdownIsDisplayed((val) => !val)}
          style={buttonPositionOpen}
        >
          <IoChevronBack size={20} />
        </Button>
        <CourseBlockBreakown
          controllers={{ breakdownDisplayed, setBreakdownIsDisplayed }}
          data={blocks}
        ></CourseBlockBreakown>{" "}
      </SidePanel>

      <Header>
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
            />{" "}
          </div>
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
      </Header>
      {/* </Wrapper> */}
    </Main>
  );
}

export default CourseDetailedView;

const SidePanel = styled.div`
  height: 100%;
  width: 485px;
  border: 4px solid blue;
  position: relative;
  z-index: 200;
`;

const Wrapper = styled.div`
  // padding-top: 50px;
  // height: 100%;
  // width: 100%;
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
  // border-radius: 5px;
  // border: 2px solid green;
`;

const Main = styled.div`
  // height: 100%;
  // width: 100%;
  // display: flex;
  // flex-direction: row;
  // justify-content: center;
  // align-items: center;
  // border: 2px solid;
`;

const Header = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // // align-items:
  flex-direction: column;
  background: linear-gradient(
    225deg,
    rgba(0, 200, 200, 0.2) 0%,
    rgba(0, 200, 200, 0.7) 20%,
    rgba(0, 200, 200, 1) 60%,
    rgba(39, 106, 245, 0.7) 100%
  );
  border-radius: 5px;
  // margin: 8px;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);

  @media ${device.tablet} {
    margin-top: 8px;
    max-width: 800px;
  }
`;

const Box = styled.div`
  height: 100%;
  width: 100%;
  margin: 3px;
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
  // justify-content: center;
  // align-items: center;
  // margin: 10px;
  // max-width: 500px;

  @media ${device.tablet} {
    // width: 50%;
    // transition: 0s;
  }
`;

const Button = styled.button``;
