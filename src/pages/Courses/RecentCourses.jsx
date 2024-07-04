import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import AnimatedPercentageScore from "../Dashboard/AnimatedPercentageScore/AnimatedPercentageScore";
import FetchBlocksfromSanity from "./FetchfromSanityFns/FetchBlocksFromSanity";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { useGetAllEnrolledCoursesDataQuery } from "../../redux/api/UserData/enrolledCourseDataSlice";
import { ThemeStyles } from "../../styles/ThemeStyles";
import HeaderColoredHightlight from "./HeaderColoredHightlight";
import ContinueBtn from "../../components/Buttons/ContinueBtn";
import FetchCoursesFromSanity from "./FetchfromSanityFns/FetchCoursesFromSanity";
import Border from "../../components/Border";

function RecentCourses() {
  const { darkThemeActive, userData } = useContext(UserContext);
  console.log("🚀 ~ RecentCourses ~ userData:", userData);

  const coursesFromSanity = FetchCoursesFromSanity();
  const builder = imageUrlBuilder(sanityClient);
  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const recentCourses = coursesFromSanity.filter((course) => {
    return userData.user.enrolledCourses.some(
      (enrolledCourse) => enrolledCourse.courseName === course.courseName
    );
  });

  const courses = recentCourses.map((course, index) => {
    const subject = course.subject[0].name;

    return (
      <Border style={{ height: "340px", width: "200px", margin: "10px" }}>
        <Box
          key={index}
          style={{
            animationDelay: `${index / 20}s`,
          }}
          className="animate__animated animate__fadeIn"
          darkThemeActive={darkThemeActive}
        >
          <ImgWrapper>
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
            <ShadedCard>
              {" "}
              <p
                style={{
                  color: "white",
                  margin: "4px",
                  padding: "10px",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {subject}
              </p>
            </ShadedCard>
          </ImgWrapper>

          <Text>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                fontWeight: "600",
                color: darkThemeActive ? "" : "white",
              }}
            >
              {course.courseName}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                color: darkThemeActive ? "" : "white",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  fontWeight: "600",
                  color: darkThemeActive ? "" : "white",
                }}
              >
                Lessons :
              </p>
              <p
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  fontWeight: "300",
                  marginLeft: "5px",
                  color: darkThemeActive ? "" : "white",
                }}
              >
                5
              </p>
            </div>

            <CourseOutline style={{ color: darkThemeActive ? "" : "white" }}>
              AQA GCSE Science course provides students with a comprehensive
              understanding of biology, chemistry, and physics, fostering
              practical skills and critical thinking for further scientific
              studies and real-world engagement.
            </CourseOutline>
          </Text>
          <Link
            style={{
              display: "flex",
              // width: "100%",
              borderRadius: "16px",
              textDecoration: "none",
              animationDelay: `${index / 20}s`,
            }}
            to={`/courses/${subject}/${course.courseName}/${course.courseCode}`}
          >
            <Button
              style={{
                width: "100px",
                height: "20px",
                fontSize: "11px",
              }}
            >
              {" "}
              Continue
            </Button>
          </Link>
        </Box>
      </Border>
    );
  });

  return (
    <Border
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <Wrapper darkThemeActive={darkThemeActive}>
        <h2
          style={{
            fontWeight: "500",
            fontSize: "16px",
            color: darkThemeActive ? "" : "white",
          }}
        >
          Your recent Courses
        </h2>
        <GridWrapper>{courses}</GridWrapper>
      </Wrapper>
    </Border>
  );
}

export default RecentCourses;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex=start;
  border-radius: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  width: 100%;
  transition: 0.3s;

  background-color: ${(props) =>
    props.darkThemeActive
      ? "white"
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Box = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 16px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
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

  &:hover {
    transition: 0.2s;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 20px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    background-color: rgb(39, 106, 245, 0.05);
  }

  @media ${device.mobileL} {
    height: 340px;
    width: 200px;
  }
`;

const Subject = styled.div`
  display: none;

  @media ${device.mobileL} {
    display: block;
    font-weight: 500;
  }
`;

const GridWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
`;

const Text = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  margin: 10px;
  height: 40px;
  border-radius: 8px;
  background-color: rgba(0, 240, 245, 1);
  color: white;
  cursor: pointer;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  transition: 0.3s;
  border: 2px solid rgba(0, 240, 240, 0.8);
  font-weight: 400;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 250, 250, 1);
    color: white;
  }
`;
const ShadedCard = styled.p`
  height: 100%;
  width: 100%;
  margin: 0px;
  padding: 0px;
  border-radius: 10px;
  display: flex;
  align-items: end;
  justify-content: end;
  font-size: 10px;
  // clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
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
  opacity: 0.6;
  color: white;
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 22;
`;

const ImgWrapper = styled.div`
  height: 40%;
  width: 100%;
  position: relative;
`;

const CourseOutline = styled.div`
  width: 100%;

  display: inline-block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  // max-width: 100px;
  // clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
`;
