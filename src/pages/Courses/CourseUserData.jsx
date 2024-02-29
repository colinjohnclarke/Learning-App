import React, { useContext } from "react";
import AllTimeLearningTimeBox from "../Dashboard/Scores/AllTimeLearningTimeBox";
import AllTimeQuestionsAnsweredBox from "../Dashboard/Scores/AllTimeQuestionsAnsweredBox";
import AllTimeXPBox from "../Dashboard/Scores/AllTimeXPBox";
import styled from "styled-components";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";

function CourseUserData({ data }) {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <UserdataWrapper>
      <Box style={{ marginRight: "4px" }} darkThemeActive={darkThemeActive}>
        <AllTimeLearningTimeBox
          data={data?.courseData?.timeElapsedForCurrentCourse || 0}
        />
      </Box>
      <Box
        style={{ marginRight: "4px", marginLeft: "4px" }}
        darkThemeActive={darkThemeActive}
      >
        {" "}
        <AllTimeQuestionsAnsweredBox data={data.courseData} />
      </Box>
      <Box style={{ marginLeft: "4px" }} darkThemeActive={darkThemeActive}>
        {" "}
        <AllTimeXPBox data={data?.courseData?.XPForCurrentCourse || 0} />
      </Box>
    </UserdataWrapper>
  );
}

export default CourseUserData;

const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const UserdataWrapper = styled.div`
  // padding-top: 10px;
  width: 100%;
  height: 70px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
