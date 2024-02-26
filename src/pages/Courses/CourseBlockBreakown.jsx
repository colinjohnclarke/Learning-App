import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import "animate.css";
import { UserContext } from "../../App";
import AnimatedPercentageScore from "../Dashboard/AnimatedPercentageScore";

import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { ThemeStyles } from "../../styles/ThemeStyles";

function CourseBlockBreakdown({ data, completedBlocks, blocksRemaining }) {
  console.log("🚀 ~ CourseBlockBreakdown ~ completedBlocks:", completedBlocks);
  console.log("🚀 ~ CourseBlockBreakdown ~ data:", data);
  const builder = imageUrlBuilder(sanityClient);

  const { darkThemeActive } = useContext(UserContext);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const allBlocksinCourse = data?.map((block, index) => {
    const findBlock = completedBlocks?.find((subBlock) => {
      return subBlock.blockName === block.blockName;
    });
    console.log("🚀 ~ findBlock ~ findBlock:", findBlock);
    const content = block.coverImage ? (
      <img
        alt=""
        style={{
          height: "60px",
          width: "100px",
          position: "relative",
          borderRadius: "5px",
          //   top: "10px",
        }}
        src={imgurlFor(block.coverImage.asset._ref)}
      />
    ) : null;
    return (
      <Link
        style={{
          width: "100%",
          height: "60px",
          margin: "5px",
          textDecoration: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "5px",
        }}
        to={`/courses/${block.subject}/${block.courseName}/${block.blockName}`}
      >
        <Box darkThemeActive={darkThemeActive}>
          {" "}
          <Text style={{ fontSize: "12px", fontWeight: "500" }}>
            Part&nbsp; {index + 1}) &nbsp;{block.blockName}
          </Text>
          {findBlock ? (
            <AnimatedPercentageScore
              color="rgb(0, 240, 245)"
              percentage={findBlock?.PercentageScores}
            />
          ) : (
            <></>
          )}
          <Image>{content}</Image>
        </Box>
      </Link>
    );
  });
  return (
    <Wrapper>
      <OverView darkThemeActive={darkThemeActive}>
        {" "}
        The learning journey...
      </OverView>
      {allBlocksinCourse}
    </Wrapper>
  );
}

export default CourseBlockBreakdown;

const Wrapper = styled.div`
  padding-bottom: 20px;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s;

  border-radius: 5px;
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
  height: 100%;
  width: 100%;
  min-width: 290px;
  //   padding: 4px;

  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: rgb(255, 255, 255);

  &:hover {
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
  }

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const Image = styled.div`
  height: 100%;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  border-radius: 5px;
  @media ${device.mobileL} {
  }
`;

const OverView = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  border-radius: 5px;

  font-weight: 500;

  //   background-color: rgb(255, 255, 255);
  // background: linear-gradient(
  //   225deg,
  //   rgba(39, 106, 245, 0.5) 0%,
  //   rgba(0, 200, 200, 1) 100%
  // );
  margin-bottom: 10px;
  margin-top: 10px;
`;
