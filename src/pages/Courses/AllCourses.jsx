import React, { useContext } from "react";
import styled from "styled-components";
import FetchCoursesFromSanity from "./FetchfromSanityFns/FetchCoursesFromSanity";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import { Link } from "react-router-dom";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import { device } from "../../styles/breakpoints";
import HeaderColoredHightlight from "./HeaderColoredHightlight";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import ContinueBtn from "../../components/Buttons/ContinueBtn";

function AllCourses() {
  const { darkThemeActive } = useContext(UserContext);

  const coursesFromSanity = FetchCoursesFromSanity();
  console.log("🚀 ~ AllCourses ~ coursesFromSanity:", coursesFromSanity);

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const courses = coursesFromSanity.map((course, index) => {
    // const subject = course.subject.map((courseDetails) => {
    //   return courseDetails.name;
    // });

    const subject = course.subject[0].name;

    console.log("🚀 ~ subject ~ subject:", subject);

    const educationLevel = course.educationLevel?.map((courseDetails) => {
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
            }}
          >
            {course.courseName}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <p
              style={{ fontSize: "12px", listStyle: "none", fontWeight: "600" }}
            >
              Lessons :
            </p>
            <p
              style={{
                fontSize: "12px",
                listStyle: "none",
                fontWeight: "300",
                marginLeft: "5px",
              }}
            >
              5
            </p>
          </div>

          <CourseOutline>
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
            Learn More
          </Button>
        </Link>
      </Box>
    );
  });

  return (
    <Wrapper>
      {" "}
      <HeaderColoredHightlight content={"All courses"} />
      <GridWrapper>
        {" "}
        <Grid>
          {courses} {courses} {courses} {courses}
        </Grid>
      </GridWrapper>
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

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  position: relative;
  height: 340px;
  width: 200px;
  margin: 10px;
  border-radius: 10px;
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

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  &:hover {
    transition: 0.2s;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 10px 20px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
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
  flex-direction: row;
  justify-content: center;
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
