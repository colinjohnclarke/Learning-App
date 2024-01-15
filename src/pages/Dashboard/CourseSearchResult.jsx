import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";
import { defaultCoursesImages } from "./CourseFilter/DefaultCourseImages";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function CourseSearchResult({ data }) {
  const newArr = data ? [...data] : [];

  const builder = imageUrlBuilder(sanityClient);

  const { darkThemeActive } = useContext(UserContext);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const searchResults = newArr?.map((item) => {
    // deafault img
    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });
    // stored course image
    const content = item.coverImage ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "100px",
          borderRadius: "5px",
          // position: "relative",
          // top: "2px",
        }}
        src={imgurlFor(item.coverImage.asset._ref)}
      />
    ) : null;

    return (
      <Wrapper>
        <Link
          style={{ display: "flex", width: "100%", textDecoration: "none" }}
          to={`/courses/${item.subject}/${item.courseName}`}
        >
          <Box darkThemeActive={darkThemeActive}>
            <Text>
              <p
                style={{
                  fontSize: "13px",
                  listStyle: "none",
                  paddingLeft: "10px",
                  fontWeight: "600",
                }}
              >
                {item.subject} :
              </p>
              <p
                style={{
                  fontSize: "13px",
                  listStyle: "none",
                  paddingLeft: "10px",
                }}
              >
                {item.courseName}
              </p>
            </Text>

            {content ? (
              <Image> {content}</Image>
            ) : (
              <Img
                src={
                  imgurl
                    ? imgurl.imageUrl
                    : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
                }
              ></Img>
            )}
          </Box>
        </Link>
      </Wrapper>
    );
  });

  return searchResults;
}

export default CourseSearchResult;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: 1s;
`;
const Box = styled.a`
  height: 50px;
  width: 100%;
  min-width: 290px;
  // padding: 4px;
  margin: 3px;
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
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? " rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;"
      : ThemeStyles.darkThemeMainBoxShadow};

  transition: 0.3s;

  &:hover {
    transition: 0.2s;
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
    background-color: rgb(39, 106, 245, 0.01);
  }
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Image = styled.div`
  height: 100%;
  border-radius: 5px;

  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);

  @media ${device.mobileL} {
  }
`;

const Img = styled.img`
  height: 100%;
  border-radius: 5px;

  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);

  @media ${device.mobileL} {
  }
`;
