import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";
import { defaultCoursesImages } from "./CourseFilter/DefaultCourseImages";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import FetchCoursefromSanity from "./CourseFilter/FetchCoursefromSanity";

import bookshelf from "../../assets/images/bookshelf.png";

function CourseSearchResult({ termsArr, searchBarTerms }) {
  const courses = FetchCoursefromSanity();

  // const newArr = data ? [...data] : [];
  // console.log("🚀 ~ CourseSearchResult ~ newArr:", newArr);

  const builder = imageUrlBuilder(sanityClient);

  const { darkThemeActive } = useContext(UserContext);

  let filteredCourses;

  if (termsArr.length) {
    filteredCourses = courses?.filter((item) => {
      return (
        (item.name && termsArr.some((term) => item.name.includes(term))) ||
        (item.blockName &&
          termsArr.some((term) => item.blockName.includes(term))) ||
        (item.courseName &&
          termsArr.some((term) => item.courseName.includes(term))) ||
        (item.subject && termsArr.some((term) => item.subject.includes(term)))
      );
    });
  }

  if (searchBarTerms) {
    filteredCourses = courses.filter(
      (course) =>
        course.subject.toLowerCase().includes(searchBarTerms) ||
        course.blockName.toLowerCase().includes(searchBarTerms) ||
        course.courseName.toLowerCase().includes(searchBarTerms)
    );
  }

  let noSearchRes = <></>;

  if (!searchBarTerms && !termsArr.length) {
    noSearchRes = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p>Start by searching or filtering...</p>

        <img
          style={{
            height: "160px",
            width: "160px",
            borderRadius: "5px",
          }}
          src={bookshelf}
          alt=""
        />
      </div>
    );
  }

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const searchResults = filteredCourses?.map((item, index) => {
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
          className=" animate__animated animate__fadeIn"
          style={{
            display: "flex",
            width: "100%",
            textDecoration: "none",
            animationDelay: `${index / 20}s`,
          }}
          to={`/courses/${item.subject}/${item.courseName}`}
        >
          <Box darkThemeActive={darkThemeActive}>
            <Text>
              <Subject
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  paddingLeft: "10px",
                  fontWeight: "600",
                }}
              >
                {item.subject}:
              </Subject>
              <p
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  paddingLeft: "10px",
                }}
              >
                {item.courseName}
              </p>

              <p
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  paddingLeft: "10px",
                }}
              >
                {item.blockName}
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

  return searchResults ? (
    searchResults
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>Start by searching or filtering...</p>

      <img
        style={{
          height: "160px",
          width: "160px",
          borderRadius: "5px",
        }}
        src={bookshelf}
        alt=""
      />
    </div>
  );
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
  margin: 4px;
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

const Subject = styled.div`
  display: none;

  @media ${device.mobileL} {
    display: block;
    font-weight: 500;
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
