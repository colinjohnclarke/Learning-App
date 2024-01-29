import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import DashboardHeader from "../Dashboard/DashboardHeader";
import bookshelf from "../../assets/images/bookshelf.png";
import SearchCourse from "../../components/Search/SearchCourse";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import { device } from "../../styles/breakpoints";
import { Link, useLocation } from "react-router-dom";
import { defaultCoursesImages } from "../Dashboard/CourseFilter/DefaultCourseImages";
import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import CourseFilterButton from "../../components/Buttons/CourseFilterBtn";
import PlaceHolderImg from "./PlaceHolderImg";
import RecentCourses from "./RecentCourses";
import { UserContext } from "../../App";
import {
  useGetAllEnrolledCoursesDataQuery,
  useAddEnrolledCourseMutation,
  useGetUserByEmailQuery,
} from "../../features/api/UserData/enrolledCourseDataSlice";
import { ThemeStyles } from "../../styles/ThemeStyles";
import EnrollForCourse from "./EnrollForCourse";
import { maxHeight } from "@mui/system";
import HeaderColoredHightlight from "./HeaderColoredHightlight";
import NavigationBarMobile from "../../components/Navigation/NavigationBarMobile";

function Courses() {
  const courses = FetchCoursefromSanity();
  const { userData, darkThemeActive } = useContext(UserContext);

  const [selectStyle, setSelectStyle] = useState({
    position: "relative",
    left: "0%",
  });

  const [selection, setSelection] = useState("recentCourses");

  const builder = imageUrlBuilder(sanityClient);



  // const [addEnrolledCourse] = useAddEnrolledCourseMutation();
  const { data } = useGetAllEnrolledCoursesDataQuery(userData?.user._id);

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
        <Box darkThemeActive={darkThemeActive}>
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
        <Box darkThemeActive={darkThemeActive}>
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

  const selectClickHandler = (selection) => {
    setSelection(selection);
    console.log("selection", selection);
    if (selection === "allCoursesAndBlocks") {
      setSelectStyle({ transform: "translateX(200%)", transition: "0.3s" });
    } else if (selection === "enroll") {
      setSelectStyle({ transform: "translateX(100%)", transition: "0.3s" });
    } else {
      setSelectStyle({ transform: "translateX(0%)", transition: "0.3s" });
    }
  };

  useEffect(() => {
    selectClickHandler("enroll");
  }, []);

  const selected = {
    fontWeight: "500",
    transition: "0.3s",
    color: "rgb(78, 78, 78)",
  };
  const unselected = {
    fontWeight: "500",
    transition: "0.3s",
    color: "#D3D3D3",
  };

  return (
    <Wrapper darkThemeActive={darkThemeActive}>
      {/* <CourseFilter /> */}

      <Padding />

      <SelectionDiv>
        <Tags>
          <Select onClick={() => selectClickHandler("recentCourses")}>
            <p style={selection === "recentCourses" ? selected : unselected}>
              Recent Courses
            </p>
          </Select>
          <Select onClick={() => selectClickHandler("enroll")}>
            <p style={selection === "enroll" ? selected : unselected}>Enroll</p>
          </Select>
          <Select onClick={() => selectClickHandler("allCoursesAndBlocks")}>
            <p
              style={
                selection === "allCoursesAndBlocks" ? selected : unselected
              }
            >
              All
            </p>
          </Select>
        </Tags>

        <SelectionBar style={selectStyle}></SelectionBar>
      </SelectionDiv>
      <DashboardHeader />

      <Main darkThemeActive={darkThemeActive}>
        {selection === "recentCourses" && <RecentCourses />}

        {selection === "enroll" && <EnrollForCourse />}

        {selection === "allCoursesAndBlocks" && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <HeaderColoredHightlight content={"All courses"} />
            <p style={{ fontWeight: "500" }}> All Courses </p>
            {courseslist}

            <div
              style={{
                fontWeight: "500",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "auto",
              }}
            ></div>
          </div>
        )}
      </Main>
      <NavigationBarMobile />
    </Wrapper>
  );
}

export default Courses;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  p,
  div,
  strong {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 98%;
  max-width: 900px;

  @media ${device.desktop} {
    height: 100%;
  }
`;

const Padding = styled.div`
  height: 60px;
  @media ${device.tablet} {
    height: 80px;
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

const SelectionDiv = styled.div`
  width: 98%;
  max-width: 900px;
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
  transition: 0.3s;

  @media ${device.tablet} {
    width: 33%;
  }
`;

const SelectionBar = styled.div`
  border-radius: 10px;
  margin: 4px;
  height: 4px;
  width: 33%;
  background: linear-gradient(
    225deg,
    rgba(39, 106, 245, 1) 0%,
    rgba(0, 200, 200, 1) 100%
  );

  // @media ${device.tablet} {
  //   width: 100%;
  // }
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
