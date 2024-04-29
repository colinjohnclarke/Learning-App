import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { device } from "../../styles/breakpoints";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import RecentCourses from "../Courses/RecentCourses";
import ContinueBtn from "../../components/Buttons/ContinueBtn";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";

function CoursesDashBoard() {
  const { darkThemeActive } = useContext(UserContext);
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

  const selected = {
    fontWeight: "500",
    transition: "0.3s",
    color: darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor,
    textAlign: "center",
    // color: "red",
  };
  const unselected = {
    fontWeight: "500",
    transition: "0.3s",
    color: "rgb(128,128,128)",
    color: darkThemeActive ? "rgb(220,220,220)" : "rgb(105,105,105)",
    textAlign: "center",
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
        {/* <Select
          style={recentCoursesDisplayed ? selected : unselected}
          onClick={handleSchoolLeaderBoardClick}
        >
          Recent...
        </Select> */}

        {/* <Select
          style={seeRecommenedCourses ? selected : unselected}
          onClick={handleStudentLeaderBoardClick}
        >
          {" "}
          Recommended
        </Select> */}
      </Tags>

      {/* <SelectionBar
        style={seeRecommenedCourses ? selectionbarRight : selectionbarLeft}
      ></SelectionBar> */}

      {recentCoursesDisplayed &&
        (<RecentCourses /> || <Skeleton height={60} count={3} />)}
      {seeRecommenedCourses && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "20px",
            marginTop: "10px",
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
              Enroll For Course
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

const Image = styled.div`
  height: 100%;

  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);

  @media ${device.mobileL} {
  }
`;
