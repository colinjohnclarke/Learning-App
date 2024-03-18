import React, { useContext } from "react";
import styled from "styled-components";
import FetchCoursesFromSanity from "./FetchCoursesFromSanity";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import { Link } from "react-router-dom";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import { device } from "../../styles/breakpoints";
import HeaderColoredHightlight from "./HeaderColoredHightlight";

function AllCourses() {
  const { darkThemeActive } = useContext(UserContext);

  const coursesFromSanity = FetchCoursesFromSanity();

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
              {course.courseName}
            </p>
          </Text>
          <ShadedCard>
            {" "}
            <p style={{ color: "white", margin: "4px" }}>{educationLevel}</p>
          </ShadedCard>

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

  return (
    <Wrapper>
      <HeaderColoredHightlight content={"All courses"} />
      {courses}
    </Wrapper>
  );
}

export default AllCourses;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: 0.3s;
`;
const Box = styled.a`
  position: relative;
  height: 60px;
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
