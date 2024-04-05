import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";
import { defaultCoursesImages } from "./CourseFilter/DefaultCourseImages";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
// import FetchBlocksfromSanity from "../Courses/FetchBlocksFromSanity";
import FetchCoursesFromSanity from "../Courses/FetchfromSanityFns/FetchCoursesFromSanity";
import AnimatedSearchIcon from "../../assets/animations/AnimatedSearchIcon";

function CourseSearchResult({ termsArr, searchBarTerms }) {
  const courses = FetchCoursesFromSanity();

  const builder = imageUrlBuilder(sanityClient);
  const { darkThemeActive } = useContext(UserContext);
  // filters  courses based on the terms selected via the dropdown menu options
  let filteredCourses;

  filteredCourses = courses.filter((item) => {
    const subject = item.subject.map((details) => details.name).toString();
    const educationLevel = item.education_level?.map(
      (details) => details.education_level
    );
    const examBoard = item.exam_board?.map((examBoard) => examBoard.examboard);
    const skillsArr = item.subject_skills?.map((skill) => skill.skill_name);
    return (
      (subject && termsArr.includes(subject)) ||
      (educationLevel &&
        termsArr.some((level) => educationLevel.includes(level))) ||
      (examBoard && termsArr.some((exam) => examBoard.includes(exam))) ||
      (skillsArr && termsArr.some((skill) => skillsArr.includes(skill)))
    );
  });

  console.log(
    "🚀 ~ filteredCourses=courses.filter ~ filteredCourses:",
    filteredCourses
  );

  // filtering based on entering search parameters form input field

  // if (searchBarTerms && courses) {
  //   filteredCourses = courses.filter(
  //     (course) =>
  //       course.subject.some((subjectval) => {
  //         subjectval.name.toLowerCase().includes(searchBarTerms.toLowerCase());
  //       })

  //   );
  // }

  if (searchBarTerms && courses) {
    let searcBarTermsLowerCase = searchBarTerms.toLowerCase();
    filteredCourses = courses.filter(
      (course) =>
        (course.subject &&
          course.subject.some((subjectval) =>
            subjectval.name.toLowerCase().includes(searcBarTermsLowerCase)
          )) ||
        (course.courseName &&
          course.courseName.toLowerCase().includes(searchBarTerms)) ||
        (course.exam_board &&
          course.exam_board.some((examboardval) =>
            examboardval.examboard
              .toLowerCase()
              .includes(searcBarTermsLowerCase)
          )) ||
        (course.subject_skills &&
          course.subject_skills.some((skill) =>
            skill.skill_name.toLowerCase().includes(searcBarTermsLowerCase)
          )) ||
        (course.education_level &&
          course.education_level.some((level) =>
            level.education_level.toLowerCase().includes(searcBarTermsLowerCase)
          ))
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
      </div>
    );
  }

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  let searchResults;
  if (filteredCourses) {
    searchResults = filteredCourses.map((item, index) => {
      // // deafault img
      // let imgurl = defaultCoursesImages.find((subItem) => {
      //   return subItem.subject === item.subject;
      // });

      const subject = item.subject.map((details) => details.name);
      const educationLevel = item.education_level.map((courseDetails) => {
        return (
          <p
            style={{
              color: "white",
              margin: "4px",
              fontWeight: "600",
              fontSize: "12px",
            }}
          >
            {courseDetails.education_level.toString()}
          </p>
        );
      });

      return (
        <Link
          className="animate__animated animate__fadeIn"
          style={{
            display: "flex",
            width: "100%",
            textDecoration: "none",
            animationDelay: `${index / 20}s`,
          }}
          to={`/courses/${subject}/${item.courseName}`}
          key={index}
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
                {subject} :
              </p>
              <p
                style={{
                  fontSize: "13px",
                  listStyle: "none",
                  padding: "3px",
                  marginRight: "10px",
                }}
              >
                {item.courseName}
              </p>
            </Text>

            <ShadedCard>{educationLevel}</ShadedCard>
            <Img
              alt=""
              style={{
                objectFit: "cover",
              }}
              src={
                imgurlFor(item.coverImage.asset._ref)
                  ? imgurlFor(item.coverImage.asset._ref)
                  : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
              }
            />
          </Box>
        </Link>
      );
    });
  }

  return filteredCourses ? (
    searchResults
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p style={{ marginBottom: "50px" }}>Start by searching or filtering...</p>

      <AnimatedSearchIcon darkThemeActive={darkThemeActive} />
    </div>
  );
}

export default CourseSearchResult;

const Box = styled.a`
  position: relative;
  height: 60px;
  width: 100%;
  min-width: 290px;
  // padding: 4px;
  margin: 4px;
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

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ShadedCard = styled.p`
  height: 100%;
  width: 33.3%;
  border-radius: 16px;
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
  opacity: 0.8;
  color: white;
  position: absolute;
  right: 0px;
  z-index: 22;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
  max-width: 100px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
`;
