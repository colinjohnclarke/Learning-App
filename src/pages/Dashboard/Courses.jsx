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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import AnimatedPercentageScore from "./AnimatedPercentageScore";
import working from "../../assets/images/working.jpg";
import AddCourseBtn from "../../components/Buttons/AddCourseBtn";

function Courses({ data }) {
  console.log("🚀 ~ file: Courses.jsx:19 ~ Courses ~ data:", data);
  const [seeAllCoursesDisplayed, setSeeAllCoursesDisplayed] = useState(false);
  const [recentCoursesDisplayed, setRecentCoursesDisplayed] = useState(true);
  const [displayFilter, setDisplayFilter] = useState(false);

  const [dropDownClicked, setDropdownClicked] = useState(Array(6).fill(false));

  const blocksCompleted = data?.user.blocksCompleted || undefined;

  const handleSchoolLeaderBoardClick = () => {
    setSeeAllCoursesDisplayed((val) => !val);
    setRecentCoursesDisplayed((val) => !val);
  };

  const handleStudentLeaderBoardClick = () => {
    setRecentCoursesDisplayed((val) => !val);
    setSeeAllCoursesDisplayed((val) => !val);
  };

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const { subject, courseName, blockName } = useParams();

  console.log(subject, courseName, blockName);

  const courses = FetchCoursefromSanity();
  console.log(
    "🚀 ~ file: Courses.jsx:49 ~ Courses from sanity ~ courses:",
    courses
  );

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

  let filterCompletedBlocks = [];

  const allCourses = courses.map((item) => {
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

    filterCompletedBlocks = blocksCompleted?.filter(
      (subItem) => subItem.blockName === item.blockName
    );

    let highestPercentageScore;

    if (filterCompletedBlocks) {
      highestPercentageScore = Math.round(
        filterCompletedBlocks[0]?.PercentageScores
      );
    }

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
              {item.subject} &nbsp;
            </p>
            <p
              style={{
                fontSize: "13px",
                listStyle: "none",
                // padding: "12px",
              }}
            >
              {item.blockName}
            </p>
          </Text>

          {highestPercentageScore ? (
            <AnimatedPercentageScore
              color={"rgb(0, 230, 250, 0.8)"}
              // percentage={Math.round(highestPercentageScore)}
              percentage={highestPercentageScore}
            />
          ) : (
            <></>
          )}

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

  /// recent Blocks

  const filterAttemptedCourses = blocksCompleted?.filter(
    (course) => course.PercentageScores !== 0
  );
  console.log(
    "🚀 ~ file: Courses.jsx:163 ~ Courses ~ filterAttemptedCourses:",
    filterAttemptedCourses
  );

  const recentCourses = filterAttemptedCourses?.map((item) => {
    const imgurlItem = courses.filter((subItem) => {
      return subItem.blockName === item.blockName;
    });

    const urlstring = imgurlItem[0]?.coverImage.asset._ref;

    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });

    const content = urlstring ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "100px",
        }}
        src={imgurlFor(urlstring)}
      />
    ) : (
      <> </>
    );

    filterCompletedBlocks = blocksCompleted?.filter(
      (subItem) => subItem.blockName === item.blockName
    );

    let highestPercentageScore;

    if (filterCompletedBlocks) {
      highestPercentageScore = Math.round(
        filterCompletedBlocks[0]?.PercentageScores
      );
    }

    const courseList = (
      <Link
        style={{ display: "flex", width: "100%", textDecoration: "none" }}
        to={`/courses/${item.Subject}/${item.courseName}/${item.blockName}`}
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
              {item.Subject}
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
          {highestPercentageScore ? (
            <AnimatedPercentageScore
              // percentage={Math.round(highestPercentageScore)}
              percentage={highestPercentageScore}
            />
          ) : (
            <> </>
          )}

          {content ? (
            <Image>{content}</Image>
          ) : (
            <Img
              src={
                imgurl
                  ? imgurl
                  : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
              }
            ></Img>
          )}
        </Box>
      </Link>
    );

    const addcourseSelection = (
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: "white",
          alignItems: "center",
          borderRadius: "5px",
          boxShadow: "0px 0px 30px 4px rgba(174, 196, 216, 0.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
            fontWeight: "500",
            borderRadius: "5px",
            boxShadow: "0px 0px 30px 4px rgba(174, 196, 216, 0.25)",
          }}
        >
          <img
            style={{ height: "200px", width: "200px" }}
            src={working}
            alt="workinganimatedimage"
          />
          Hmm...No Courses yet
          <Link
            style={{ textDecoration: "none", padding: "20px" }}
            to={"/courses"}
          >
            <AddCourseBtn style={{ width: "350px" }} />
          </Link>
        </div>
      </div>
    );

    return addcourseSelection;
  });

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
            Recent...
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

        {recentCoursesDisplayed &&
          (recentCourses || <Skeleton height={60} count={3} />)}
        {seeAllCoursesDisplayed &&
          (allCourses || <Skeleton height={60} count={3} />)}

        {/* {<Skeleton height={50} count={3} />}
        {seeAllCoursesDisplayed && (allCourses || <Skeleton count={3} />)} */}
      </CourseFilterContext.Provider>
    </Wrapper>
  );
}

export default Courses;

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
