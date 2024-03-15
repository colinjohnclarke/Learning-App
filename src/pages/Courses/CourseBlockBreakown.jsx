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
import { fontSize } from "@mui/system";
import { DiRubyRough } from "react-icons/di";

function CourseBlockBreakdown({ data, completedBlocks, blocksRemaining }) {
  const builder = imageUrlBuilder(sanityClient);

  const { darkThemeActive } = useContext(UserContext);

  const imgurlFor = (source) => {
    return builder.image(source);
  };
  // the data below is from the list of blocks stored in sanity making up a "course"
  const allBlocksinCourse = data?.map((block, index) => {
    // map through each block in 'completed blocks array from db and return details
    const findBlock = completedBlocks?.find((subBlock) => {
      return (
        subBlock.blockName === block.blockName &&
        subBlock.subject === block.subject
      );
    });

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
          border: "none",
        }}
        to={`/courses/${block.subject}/${block.courseName}/${block.blockName}`}
      >
        <Box darkThemeActive={darkThemeActive}>
          <Text
            style={{
              fontSize: "11px",
              listStyle: "none",
              paddingLeft: "10px",
              textAlign: "start",
              fontWeight: "400",
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFontgroundColor
                : ThemeStyles.darkThemePrimaryFontColor,
              // display: "flex",
              // justifyContent: "center",
              // alignItem: "start",
            }}
          >
            Part&nbsp; {index + 1}) &nbsp;{block.blockName}
          </Text>

          {findBlock && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFontgroundColor
                    : ThemeStyles.darkThemePrimaryFontColor,
                }}
              >
                {" "}
                Top Score:
              </p>
              <AnimatedPercentageScore
                color="rgb(0, 240, 245)"
                percentage={findBlock?.percentageScores}
              />

              <ShadedCard>
                {" "}
                <p
                  style={{
                    color: "white",
                    margin: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <DiRubyRough size={20} fill="rgb(138,43,226)" />
                  {findBlock?.XPScored}
                </p>
              </ShadedCard>
            </div>
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

  margin: 0px;

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
  position: relative;
  height: 60px;
  width: 100%;
  min-width: 290px;
  // padding: 4px;

  border-radius: 5px;
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

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ShadedCard = styled.p`
  height: 100%;
  width: 33.3%;
  border-radius: 5px;
  max-width: 100px;
  display: flex;
  align-items: end;
  justify-content: end;
  font-size: 10px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  /* Fallback for older browsers */
  background: -webkit-linear-gradient(
    top left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  background: -moz-linear-gradient(
    top left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  background: -o-linear-gradient(top left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  opacity: 1;
  color: white;
  position: absolute;
  right: 0px;
  z-index: 22;
`;
