import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import AnimatedPercentageScore from "../Dashboard/AnimatedPercentageScore";
import FetchBlocksfromSanity from "./FetchfromSanityFns/FetchBlocksFromSanity";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { useGetAllEnrolledCoursesDataQuery } from "../../redux/api/UserData/enrolledCourseDataSlice";
import { ThemeStyles } from "../../styles/ThemeStyles";
import HeaderColoredHightlight from "./HeaderColoredHightlight";
import ContinueBtn from "../../components/Buttons/ContinueBtn";

function RecentCourses() {
  const courses = FetchBlocksfromSanity();
  // console.log("🚀 ~ RecentCourses ~ courses:", courses);
  const builder = imageUrlBuilder(sanityClient);
  const { userData, darkThemeActive, selectedNav } = useContext(UserContext);

  const { data } = useGetAllEnrolledCoursesDataQuery(userData?.user._id);

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

    // filter the courses from sanity as they contain a complete list of all courses so we only need ones which match this topicName
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
          height: "80px",
          width: "80px",
          borderRadius: "16px",
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",

                  alignItems: "center",

                  width: "60px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    listStyle: "none",
                    padding: "12px",
                  }}
                >
                  {item.XPForCurrentCourse} Xp
                </p>
              </div>
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

        borderRadius: "16px",
      }}
    >
      {/* <PaddingBox /> */}
      <HeaderColoredHightlight content={"Your recent Courses"} />
      <Grid>{list}</Grid>
      {selectedNav.Dashboard && (
        <ContinueBtn style={{ color: "white" }}>
          <Link
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "500",
            }}
            to={"/courses"}
          >
            {" "}
            Enroll For Course{" "}
          </Link>
        </ContinueBtn>
      )}
      <Demo> For demo Enroll for Biology Photosynthesis Course</Demo>
    </Main>
  );
}

export default RecentCourses;

const Main = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
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

const Demo = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  transition: 0s;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  padding: 10px;
  border-radius: 16px;
  margin-bottom: 10px;
`;

const LinkWrapper = styled.div`
  width: 100%;
  padding-top: 10px;
  border-radius: 16px;
`;

const Box = styled.a`
  height: 80px;
  width: 100%;
  min-width: 290px;
  margin-top: 3px;
  margin-bottom: 3px;
  border-radius: 16px;
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
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  height: 100%;
  width: 33.3%;
  border-radius: 16px;
  max-width: 100px;
  min-width: 100px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
`;

const Image = styled.div`
  height: 100%;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  border-radius: 16px;
  @media ${device.mobileL} {
  }
`;
