import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../../styles/breakpoints";
import "animate.css";
import { UserContext } from "../../../App";
import AnimatedPercentageScore from "../../Dashboard/AnimatedPercentageScore";

import { ThemeStyles } from "../../../styles/ThemeStyles";

import Topic from "./Topic";

function CourseBlockBreakdown({ topics, completedLessons, blocksRemaining }) {
  console.log("🚀 ~ CourseBlockBreakdown ~ topics:", topics);

  const { darkThemeActive } = useContext(UserContext);
  window.scrollTo(0, 0);

  // the topics below is from the list of blocks stored in sanity making up a "course"
  const courseTopicsBreakdown = topics?.map((topic, index) => {
    // map through each block in 'completed blocks array from db and return details
    const findBlock = completedLessons?.find((subBlock) => {
      return (
        subBlock.blockName === topic.blockName &&
        subBlock.subject === topic.subject
      );
    });

    return <Topic findBlock={findBlock} topic={topic} index={index} />;
  });
  return (
    <Wrapper>
      <OverView darkThemeActive={darkThemeActive}>
        {" "}
        The learning journey...
      </OverView>
      {courseTopicsBreakdown}
    </Wrapper>
  );
}

export default CourseBlockBreakdown;

const Wrapper = styled.div`
  // padding-bottom: 20px;
  // display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid red;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // transition: 0.3s;

  // margin: 0px;
  // border-radius: 16px;
`;

const Text = styled.p`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: 0.2s;
  padding: 10px;
`;

const Box = styled.a`
  position: relative;
  height: 60px;
  width: 100%;
  min-width: 290px;
  // padding: 4px;

  border-radius: 16px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  strong {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  background-color: ${(props) =>
    props.darkThemeActive
      ? "white"
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  &:hover {
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
    background-color: rgb(39, 106, 245, 0.01);
  }
`;

const OverView = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  border-radius: 16px;

  font-weight: 500;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
  margin-bottom: 10px;
  margin-top: 10px;
`;
