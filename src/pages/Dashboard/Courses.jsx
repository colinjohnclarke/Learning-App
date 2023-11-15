import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { recentCourseList } from "./RecentCourseList";
import { allCoursesList } from "./AllCoursesList";
import { device } from "../../styles/breakpoints";


function Courses() {
  const [seeAllCoursesDisplayed, setSeeAllCoursesDisplayed] = useState(false);

  const [recentCoursesDisplayed, setRecentCoursesDisplayed] = useState(true);

  const handleSchoolLeaderBoardClick = () => {
    setSeeAllCoursesDisplayed((val) => !val);
    setRecentCoursesDisplayed((val) => !val);
  };

  const handleStudentLeaderBoardClick = () => {
    setRecentCoursesDisplayed((val) => !val);
    setSeeAllCoursesDisplayed((val) => !val);
  };

  const selected = {
    fontWeight: "700",
    transition: "0.3s",
    color: "black",
  };
  const unselected = {
    fontWeight: "700",
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

  const recentCourses = recentCourseList.map((item) => {
    return (
      <Link
        style={{ display: "flex", width: "100%", textDecoration: "none" }}
        to={"/courses/biology"}
      >
        <Box>
          <Text>
            {" "}
            <p
              style={{
                fontSize: "12px",
                listStyle: "none",
                paddingLeft: "10px",
                fontWeight: "600",
              }}
            >
              {item.subject} :
            </p>
            <p
              style={{
                fontSize: "12px",
                listStyle: "none",
                paddingLeft: "10px",
              }}
            >
              {item.courseName}
            </p>
          </Text>

          <Image src={item.imageUrl}></Image>
        </Box>
      </Link>
    );
  });

  const allCourses = allCoursesList.map((item) => {
    return (
      <Link
        style={{ display: "flex", width: "100%", textDecoration: "none" }}
        to={"/courses/biology"}
      >
        <Box>
          <Text>
            {" "}
            <p
              style={{
                fontSize: "12px",
                listStyle: "none",
                paddingLeft: "10px",
                fontWeight: "600",
              }}
            >
              {item.subject} :
            </p>
            <p
              style={{
                fontSize: "12px",
                listStyle: "none",
                paddingLeft: "10px",
              }}
            >
              {item.courseName}
            </p>
          </Text>

          <Image src={item.imageUrl}></Image>
        </Box>
      </Link>
    );
  });

  return (
    <Wrapper>
      <Tags>
        <Select
          style={recentCoursesDisplayed ? selected : unselected}
          onClick={handleSchoolLeaderBoardClick}
        >
          Recent Courses
        </Select>

        <Select
          style={seeAllCoursesDisplayed ? selected : unselected}
          onClick={handleStudentLeaderBoardClick}
        >
          See all Courses
        </Select>
      </Tags>

      <SelectionBar
        style={seeAllCoursesDisplayed ? selectionbarRight : selectionbarLeft}
      ></SelectionBar>

      {recentCoursesDisplayed && recentCourses}

      {seeAllCoursesDisplayed && allCourses}
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  @media ${device.tablet} {
    width: 25%;
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
    width: 25%;
  }
`;
