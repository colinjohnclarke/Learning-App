import React from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import creator from "../../assets/images/creator.jpg";
import SearchCourse from "../../components/Search/SearchCourse";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import { device } from "../../styles/breakpoints";
import { Link } from "react-router-dom";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import CourseFilter from "../Dashboard/CourseFilter/CourseFilter";
import CourseFilterButton from "../../components/Buttons/CourseFilterBtn";

function Courses() {
  const courses = FetchCoursefromSanity();

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const allCoursesSorted = courses.sort((a, b) =>
    a.courseName.localeCompare(b.courseName)
  );

  const filteredData = allCoursesSorted.filter((item, index, arr) => {
    return index === arr.findIndex((obj) => obj.courseName === item.courseName);
  });
  console.log(
    "🚀 ~ file: Courses.jsx:33 ~ filteredData ~ filteredData:",
    filteredData
  );

  const courseslist = filteredData.map((item) => {
    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });

    return (
      <Link
        style={{ display: "flex", width: "100%", textDecoration: "none" }}
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

  const allBlocks = courses.map((item) => {
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
        style={{ display: "flex", width: "100%", textDecoration: "none" }}
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

  return (
    <Wrapper>
      {/* <CourseFilter /> */}
      <DashboardHeader />
      <Main>
        <div
          style={{
            margin: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            backgroundColor: "white",
            alignItems: "center",
            fontWeight: "500",
            padding: "4px",
            height: "400px",
            width: "100%",
            paddingTop: "20px",
          }}
        >
          <img
            style={{ height: "200px", width: "200px" }}
            src={creator}
            alt="workinganimatedimage"
          />
          No courses yet! Search Courses..
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "102%",
            alignItems: "center",
          }}
        >
          <SearchCourse />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <p style={{ fontWeight: "500" }}> All Courses </p>

          <CourseFilterButton />
        </div>
        {courseslist}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
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
  // position: absolute;
  // z-index: 100;
  width: 100%;
  // height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 900px;
`;

const Box = styled.a`
  height: 60px;
  width: 100%;
  min-width: 290px;
  margin: 2px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  transition: 0.4s;

  &:hover {
    // transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.8);
    transition: 0.4s;
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
