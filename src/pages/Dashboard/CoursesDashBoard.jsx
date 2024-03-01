import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { device } from "../../styles/breakpoints";
import CourseFilter from "./CourseFilter/CourseFilter";
import { CourseFilterContext } from "./CourseFilter/CourseFilterContext";
import FetchBlocksfromSanity from "../Courses/FetchBlocksFromSanity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import RecentCourses from "../Courses/RecentCourses";
import ContinueBtn from "../../components/Buttons/ContinueBtn";
import { Link } from "react-router-dom";

function CoursesDashBoard() {
  const [seeRecommenedCourses, setSeeRecommendedCourses] = useState(false);
  const [recentCoursesDisplayed, setRecentCoursesDisplayed] = useState(true);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [dropDownClicked, setDropdownClicked] = useState(Array(6).fill(false));

  const handleSchoolLeaderBoardClick = () => {
    setSeeRecommendedCourses((val) => !val);
    setRecentCoursesDisplayed((val) => !val);
  };

  const handleStudentLeaderBoardClick = () => {
    setRecentCoursesDisplayed((val) => !val);
    setSeeRecommendedCourses((val) => !val);
  };

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const { subject, courseName, blockName } = useParams();

  console.log(subject, courseName, blockName);

  const courses = FetchBlocksfromSanity();

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

  return (
    <Wrapper>
      <Tags>
        <Select
          style={recentCoursesDisplayed ? selected : unselected}
          onClick={handleSchoolLeaderBoardClick}
        >
          Recent...
        </Select>

        <Select
          style={seeRecommenedCourses ? selected : unselected}
          onClick={handleStudentLeaderBoardClick}
        >
          {" "}
          Recomended
        </Select>
      </Tags>

      <SelectionBar
        style={seeRecommenedCourses ? selectionbarRight : selectionbarLeft}
      ></SelectionBar>

      {recentCoursesDisplayed &&
        (<RecentCourses /> || <Skeleton height={60} count={3} />)}
      {seeRecommenedCourses && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {" "}
          <p> Start by Enrolling</p>
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
        </div>
      )}
    </Wrapper>
  );
}

export default CoursesDashBoard;

const Wrapper = styled.div`
  width: 100%;
`;

const Box = styled.a`
  height: 50px;
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


  }
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
    rgba(0, 200, 200, 0.2) 0%,
    rgba(0, 200, 200, 0.5) 20%,
    rgba(0, 200, 200, 0.4) 60%,
    rgba(39, 106, 245, 0.7) 100%
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
