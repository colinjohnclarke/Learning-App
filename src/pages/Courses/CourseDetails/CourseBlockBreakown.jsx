import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../../styles/breakpoints";
import "animate.css";
import { UserContext } from "../../../App";
import AnimatedPercentageScore from "../../Dashboard/AnimatedPercentageScore";

import { ThemeStyles } from "../../../styles/ThemeStyles";

import Topic from "./Topic";

function CourseBlockBreakdown({ topics, completedLessons, blocksRemaining }) {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topicstoRender = topics?.map((topic) => {
    return { ...topic, selected: false };
  });

  console.log("topicstoRender", topicstoRender);

  useEffect(() => {
    if (topics) {
      setSelectedTopics(topicstoRender);
    }
  }, [topics]);

  const { darkThemeActive } = useContext(UserContext);
  // window.scrollTo(0, 0);

  // the topics below is from the list of blocks stored in sanity making up a "course"
  const courseTopicsBreakdown = selectedTopics?.map((topic, index) => {
    // map through each block in 'completed blocks array from db and return details
    const findBlock = completedLessons?.find((subBlock) => {
      return (
        subBlock.blockName === topic.blockName &&
        subBlock.subject === topic.subject
      );
    });

    return (
      <Topic
        selectedTopics={selectedTopics}
        setSelectedTopics={setSelectedTopics}
        key={index}
        findBlock={findBlock}
        topic={topic}
        index={index}
      />
    );
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

const OverView = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  // height: auto;
  border-radius: 16px;

  font-weight: 500;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
  margin-bottom: 10px;
  margin-top: 10px;
`;
