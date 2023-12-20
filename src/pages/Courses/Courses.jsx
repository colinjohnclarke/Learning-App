import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import bookshelf from "../../assets/images/bookshelf.png";
import SearchCourse from "../../components/Search/SearchCourse";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import { device } from "../../styles/breakpoints";
import { Link } from "react-router-dom";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import CourseFilter from "../Dashboard/CourseFilter/CourseFilter";
import CourseFilterButton from "../../components/Buttons/CourseFilterBtn";
import PlaceHolderImg from "./PlaceHolderImg";
import RecentCourses from "./RecentCourses";
import { UserContext } from "../../App";
import {
  useGetAllEnrolledCoursesDataQuery,
  useAddEnrolledCourseMutation,
  useGetUserByEmailQuery,
} from "../../features/api/UserData/enrolledCourseDataSlice";

function Courses() {
  const courses = FetchCoursefromSanity();
  const user = useContext(UserContext);
  console.log("🚀 ~ file: Courses.jsx:21 ~ Courses ~ userCOLIN:", user);
  const builder = imageUrlBuilder(sanityClient);
  const enrolledCourses = user.user.enrolledCourses;

  // const [addEnrolledCourse] = useAddEnrolledCourseMutation();
  const { data } = useGetAllEnrolledCoursesDataQuery(user?.user._id);
  useEffect(() => {}, []);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const allCoursesSorted = courses.sort((a, b) =>
    a.courseName.localeCompare(b.courseName)
  );

  const filteredData = allCoursesSorted.filter((item, index, arr) => {
    return index === arr.findIndex((obj) => obj.courseName === item.courseName);
  });

  const courseslist = filteredData.map((item, index) => {
    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
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
        to={`/courses/${item.subject}/${item.courseName}`}
      >
        <Box>
          <Text>
            {" "}
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                paddingLeft: "10px",
                fontWeight: "600",
              }}
            >
              {item.subject}
            </p>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                padding: "12px",
              }}
            >
              {item.courseName}
            </p>
          </Text>

          <Img
            src={
              imgurl
                ? imgurl.imageUrl
                : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
            }
          ></Img>
        </Box>
      </Link>
    );
  });

  const allBlocks = courses.map((item, index) => {
    const content = item.coverImage ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "100px",
        }}
        src={imgurlFor(item.coverImage.asset._ref)}
      />
    ) : null;

    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });

    // filterCompletedBlocks = blocksCompleted?.filter(
    //   (subItem) => subItem.blockName === item.blockName
    // );

    // let highestPercentageScore;

    // if (filterCompletedBlocks) {
    //   highestPercentageScore = Math.round(
    //     filterCompletedBlocks[0]?.PercentageScores
    //   );
    // }

    return (
      <Link
        className="animate__animated animate__fadeIn"
        style={{
          display: "flex",
          width: "100%",
          textDecoration: "none",
          animationDelay: `${index / 20}s`,
        }}
        to={`/courses/${item.subject}/${item.courseName}/${item.blockName}`}
      >
        <Box>
          <Text>
            {" "}
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                paddingLeft: "10px",
                fontWeight: "600",
              }}
            >
              {item.subject}
            </p>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                padding: "12px",
              }}
            >
              {item.blockName}
            </p>
          </Text>

          {content ? (
            <Image>{content}</Image>
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
    );
  });

  const flexStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  };
  return (
    <Wrapper>
      {/* <CourseFilter /> */}
      <DashboardHeader />

      <Main>
        {!enrolledCourses.length ? (
          <PlaceHolderImg img={bookshelf} />
        ) : (
          <RecentCourses data={data} />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <SearchCourse />
        </div>
        <div style={flexStyle}>
          <p style={{ fontWeight: "500" }}> All Courses </p>

          <CourseFilterButton />
        </div>
        {courseslist}
        <div style={flexStyle}>
          <p style={{ fontWeight: "500" }}> All Blocks</p>
          <CourseFilterButton />
        </div>
        {allBlocks}
      </Main>
    </Wrapper>
  );
}

export default Courses;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 98%;
  max-width: 900px;

  @media ${device.desktop} {
    width: 100%;
  }
`;

const Box = styled.a`
  height: 50px;
  width: 100%;
  min-width: 290px;
  // padding: 4px;
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
    // background-color: rgb(39, 106, 245, 0.01);
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

const Img = styled.img`
  height: 100%;
  width: 33.3%;
  border-radius: 5px;
  max-width: 100px;
  min-width: 100px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  margin: 5px;
`;

const SeeAllBtn = styled.button`
  // // display: flex;

  // // justify-content: center;
  border: none;

  background-color: rgb(240, 245, 250);
`;

const Tags = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justifty-content: flex-start;
`;

const Select = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  @media ${device.tablet} {
    width: 50%;
  }
`;

const SelectionBar = styled.div`
  border-radius: 10px;
  height: 4px;
  width: 50%;
  background: linear-gradient(
    225deg,
    rgba(39, 106, 245, 1) 0%,
    rgba(0, 200, 200, 1) 100%
  );

  @media ${device.tablet} {
    width: 50%;
  }
`;

const Filter = styled.div`
  // display: flex;
  // flex-direction: row;
  // justify-content: space-around;
  // align-items: center;
  border: 1px solid;
  width: 100%;
`;

const Image = styled.div`
  height: 100%;

  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);

  @media ${device.mobileL} {
  }
`;

const PlaceholderImg = styled.div``;
