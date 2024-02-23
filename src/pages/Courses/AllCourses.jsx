import React, { useContext } from "react";
import styled from "styled-components";
import FetchCoursesFromSanity from "./FetchCoursesFromSanity";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import { Link } from "react-router-dom";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";

function AllCourses() {
  const { darkThemeActive } = useContext(UserContext);

  const coursesFromSanity = FetchCoursesFromSanity();
  console.log("🚀 ~ ALLCourses ~ coursesFromSanity:", coursesFromSanity);

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const courses = coursesFromSanity.map((course, index) => {
    const subject = course.subject.map((courseDetails) => {
      return courseDetails.name;
    });

    const educationLevel = course.education_level.map((courseDetails) => {
      return (
        <p style={{ fontSize: "11px" }}>{courseDetails.education_level}</p>
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
        to={`/courses/${subject}/${course.courseName}`}
        key={index}
      >
        <Box darkThemeActive={darkThemeActive}>
          <Text>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                paddingLeft: "10px",
                fontWeight: "heavy",
                fontWeight: "800",
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
              {course.courseName}
            </p>
          </Text>

          <Img
            alt=""
            style={{
              objectFit: "cover",
            }}
            src={
              imgurlFor(course.coverImage.asset._ref)
                ? imgurlFor(course.coverImage.asset._ref)
                : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
            }
          />
        </Box>
      </Link>
    );
  });

  return courses;
}

export default AllCourses;

const Box = styled.a`
  height: 60px;
  width: 100%;
  min-width: 290px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  transition: 0s;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);

  &:hover {
    transition: 0s;
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
  }

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

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Img = styled.img`
  height: 100%;
  width: 33.3%;
  border-radius: 5px;
  max-width: 100px;
  min-width: 100px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
