import React from "react";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import styled from "styled-components";
import { GrNext } from "react-icons/gr";
import { device } from "../../styles/breakpoints";
import { ThemeStyles } from "../../styles/ThemeStyles";

function CourseDetails({
  data,
  subject,
  courseName,
  blockName,
  darkThemeActive,
}) {
  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const content = data ? (
    <img
      alt=""
      style={{
        height: "100px",
        width: "100px",
      }}
      src={imgurlFor(data?.asset._ref)}
    />
  ) : null;

  const main = (
    <Details darkThemeActive={darkThemeActive}>
      {/* <Box></Box> */}
      <Box>
        <p style={{ padding: "3px", margin: "3px", fontSize: "14px" }}>
          {subject}
        </p>{" "}
        <GrNext style={{ padding: "3px", margin: "3px" }} />
        <CourseName style={{ padding: "3px", margin: "3px", fontSize: "14px" }}>
          {courseName}
        </CourseName>
        <GrNext style={{ padding: "3px", margin: "3px" }} />
        <p
          style={{
            padding: "3px",
            fontWeight: "500",
            margin: "3px",
            fontSize: "14px",
          }}
        >
          {blockName}
        </p>
      </Box>

      <Image>{content}</Image>
    </Details>
  );

  return main;
}

export default CourseDetails;

const Details = styled.div`
  margin-bottom: 4px;
  padding-top: 50px;
  min-height: 100px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  strong {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  max-width: 1000px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  @media ${device.mobileL} {
    margin-bottom: 10px;
  }

  @media ${device.tablet} {
    padding-top: 60px;
  }
`;

const CourseName = styled.div`

display`;

const Image = styled.div`
  height: 100%;
  object-fit: fill;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  position: relative;
  top: 4px;
  border-radius: 5px;

  @media ${device.mobileL} {
  }
`;

const Box = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  text-align: left;
  justify-conent: left;
  align-items: center;
  padding-left: 10px;

  @media ${device.mobileL} {
    padding-left: 40px;
  }
`;
