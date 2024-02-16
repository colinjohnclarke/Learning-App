import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import AnimatedPercentageScore from "../Dashboard/AnimatedPercentageScore";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import Header from "../../components/Header/Header";
import exam from "../../assets/images/exam.png";
import { useGetAllEnrolledCoursesDataQuery } from "../../features/api/UserData/enrolledCourseDataSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { ThemeStyles } from "../../styles/ThemeStyles";
import CoursePercentageCompletion from "../../components/functions/CoursePercentageCompletion";
import AddCourseBtn from "../../components/Buttons/AddCourseBtn";
import HeaderColoredHightlight from "./HeaderColoredHightlight";

function RecentCourses() {
  const courses = FetchCoursefromSanity();
  // console.log("🚀 ~ RecentCourses ~ courses:", courses);
  const builder = imageUrlBuilder(sanityClient);
  const { userData, darkThemeActive } = useContext(UserContext);

  const { data } = useGetAllEnrolledCoursesDataQuery(userData?.user._id);
  // console.log("🚀 ~ RecentCourses ~ data:", data); // no subject saved

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  // map through each course saved in enrolled courses DB obj
  const list = data?.enrolledCourses?.map((item, index) => {
    // search courses from sanity
    const result = courses.find((subItem) => {
      // return so we we get saved course details from sanity eg cover image and subject
      return subItem.courseName === item.courseName;
    });
    // console.log("🚀 ~ result ~ result:", result);

    // filter the courses from sanity as they contain a complete list of all courses so we only need ones which match this courseName
    const blocks = courses
      .filter((course) => {
        return course.courseName === item.courseName;
      })

      //sort so items are in correct block order
      .sort((a, b) => {
        return a.blockPositioninCourse - b.blockPositioninCourse;
      });

    // console.log("🚀 ~ list ~ blocks:", blocks);

    // store list of completed blocks from user
    const blocksCompletedfromDB = userData?.user.blocksCompleted;
    // console.log("🚀 ~ list ~ blocksCompletedfromDB:", blocksCompletedfromDB);

    // blocks completed from DB dont have subject saved
    const completedBlocks = blocksCompletedfromDB?.filter((block) => {
      return block.courseName === item.courseName;
    });

    // console.log("🚀 ~ completedBlocks ~ completedBlocks:", completedBlocks);

    const CoursePercentageCompletion =
      (completedBlocks.length / blocks.length) * 100;

    const content = result?.coverImage ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "100px",
        }}
        src={imgurlFor(result.coverImage.asset._ref)}
      />
    ) : null;

    return (
      <LinkWrapper
        className="animate__animated animate__fadeIn"
        style={{
          textDecoration: "none",
          animationDelay: `${index / 20}s`,
        }}
      >
        <Link
          style={{
            textDecoration: "none",
          }}
          to={`/courses/${result?.subject}/${result?.courseName}`}
        >
          <Box darkThemeActive={darkThemeActive}>
            <Text>
              {" "}
              <div
                style={{
                  padding: "12px",
                }}
              >
                {" "}
                <p
                  style={{
                    fontSize: "13px",
                    listStyle: "none",
                    // paddingLeft: "10px",
                    fontWeight: "600",
                  }}
                >
                  {result?.subject}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    listStyle: "none",
                    // padding: "12px",
                  }}
                >
                  {result?.courseName}
                </p>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  listStyle: "none",
                  padding: "12px",
                }}
              >
                {item.XPForCurrentCourse} Xp
              </p>
            </Text>
            <AnimatedPercentageScore
              color="rgb(0, 245, 245)"
              percentage={CoursePercentageCompletion}
            />

            {content ? (
              <Image>{content}</Image>
            ) : (
              <Img
                src={
                  "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
                }
              ></Img>
            )}
          </Box>
        </Link>
      </LinkWrapper>
    );
  });

  return (
    <Main
      style={{
        alignItems: "center",
        fontWeight: "500",
        width: "100%",

        borderRadius: "5px",
      }}
    >
      {/* <PaddingBox /> */}
      <HeaderColoredHightlight content={"Your recent Courses"} />
      <Grid>
        {list}
        <Box
          darkThemeActive={darkThemeActive}
          style={{
            height: "80px",
            width: "100%",
            minWidth: "290px",
            marginTop: "12px",
            borderRadius: "5px",
          }}
        >
          <Button>
            <Link to={"/courses"}> + Enroll for course </Link>
          </Button>
        </Box>
      </Grid>
    </Main>
  );
}

export default RecentCourses;

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  @media ${device.tablet} {
  }
`;

const Grid = styled.div`
  padding-top: 10px;
  width: 100%;
  //   display: flex;
  //   align-items: center;
  //   flex-direction: column;
  //   justify-content: center;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const LinkWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const Box = styled.a`
  height: 80px;
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

const Image = styled.div`
  height: 100%;
  border-radius: 5px;

  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);

  @media ${device.mobileL} {
  }
`;

const Button = styled.div`
  border: 2px dotted;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  a {
    transition: 0.1s;
    text-decoration: none;
  }

  &:hover {
    a {
      font-size: 1.2rem;
      transition: 0.1s;
      color: rgba(0, 240, 240);
      text-decoration: none;
    }
  }
`;
