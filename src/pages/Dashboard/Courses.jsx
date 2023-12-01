import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { recentCourseList } from "./RecentCourseList";
import { allCoursesList } from "./AllCoursesList";
import { device } from "../../styles/breakpoints";
import CourseFilter from "./CourseFilter/CourseFilter";
import CourseFilterBtn from "../../components/Buttons/CourseFilterBtn";
import { CourseFilterContext } from "./CourseFilter/CourseFilterContext";
import FetchCoursefromSanity from "./CourseFilter/FetchCoursefromSanity";
import { defaultCoursesImages } from "./CourseFilter/DefaultCourseImages";

function Courses() {
  const [seeAllCoursesDisplayed, setSeeAllCoursesDisplayed] = useState(false);
  const [recentCoursesDisplayed, setRecentCoursesDisplayed] = useState(true);
  const [displayFilter, setDisplayFilter] = useState(false);

  const [dropDownClicked, setDropdownClicked] = useState(Array(6).fill(false));

  const handleSchoolLeaderBoardClick = () => {
    setSeeAllCoursesDisplayed((val) => !val);
    setRecentCoursesDisplayed((val) => !val);
  };

  const handleStudentLeaderBoardClick = () => {
    setRecentCoursesDisplayed((val) => !val);
    setSeeAllCoursesDisplayed((val) => !val);
  };
  console.log(
    "🚀 ~ file: Courses.jsx:12 ~ defaultCoursesImages:",
    defaultCoursesImages
  );

  // const { type } = useParams();
  // console.log("🚀 ~ file: Courses.jsx:35 ~ Courses ~ type:", type);

  const { subject, courseName, blockName } = useParams();

  console.group(subject, courseName, blockName);

  const courses = FetchCoursefromSanity();
  console.log("🚀 ~ file: Courses.jsx:30 ~ Courses ~ courses:", courses);

  const selected = {
    fontWeight: "500",
    transition: "0.3s",
    color: "rgb(78, 78, 78)",
    // color: "red",
  };
  const unselected = {
    fontWeight: "500",
    transition: "0.3s",
    color: "#D3D3D3",
  };
  const selectionbarLeft = {
    transition: "ease-in-out 0.3s",
  };

  const selectionbarRight = {
    transform: "translateX(100%)",
    transition: " ease-in-out 0.3s",
  };

  const allCourses = courses.map((item) => {
    console.log(item.subject);

    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });

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
              {item.subject} :
            </p>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                paddingLeft: "10px",
              }}
            >
              {item.blockName}
            </p>
          </Text>

          <Image
            src={
              imgurl
                ? imgurl.imageUrl
                : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
            }
          ></Image>
        </Box>
      </Link>
    );
  });
  const recentCourses = allCourses;
  return (
    <Wrapper>
      <CourseFilterContext.Provider
        value={{
          dropDownClicked,
          setDropdownClicked,
          displayFilter,
          setDisplayFilter,
        }}
      >
        <CourseFilter />
        <Tags>
          <Select
            style={recentCoursesDisplayed ? selected : unselected}
            onClick={handleSchoolLeaderBoardClick}
          >
            Your Courses
          </Select>

          <Select
            style={seeAllCoursesDisplayed ? selected : unselected}
            onClick={handleStudentLeaderBoardClick}
          >
            {" "}
            Add Course
            {seeAllCoursesDisplayed && (
              <CourseFilterBtn
                onClick={(e) => {
                  e.preventDefault();
                  setDisplayFilter((val) => !val);
                }}
              />
            )}
          </Select>
        </Tags>

        <SelectionBar
          style={seeAllCoursesDisplayed ? selectionbarRight : selectionbarLeft}
        ></SelectionBar>

        {recentCoursesDisplayed && recentCourses}
        {seeAllCoursesDisplayed && allCourses}
      </CourseFilterContext.Provider>
    </Wrapper>
  );
}

export default Courses;

const Wrapper = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  width: 100%;
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
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.3);
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

const Image = styled.img`
  height: 100%;
  width: 33.3%;
  border-radius: 5px;
  max-width: 100px;
  min-width: 100px;
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
