import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { device } from "../../styles/breakpoints";
import CourseSearchResult from "../../pages/Dashboard/CourseSearchResult";
import FetchCoursefromSanity from "../../pages/Dashboard/CourseFilter/FetchCoursefromSanity";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";

function SearchCourse() {
  const [searchedResult, setSearchedResult] = useState("");
  const [displaySearchResults, setDisplaySearchResult] = useState(false);

  const coursesfromSanity = FetchCoursefromSanity();

  const { darkThemeActive } = useContext(UserContext);
  const navigate = useNavigate();

  const searchCourse = (val) => {
    let result = coursesfromSanity.filter(
      (course) =>
        course.subject.toLowerCase().includes(val) ||
        course.blockName.toLowerCase().includes(val) ||
        course.courseName.toLowerCase().includes(val)
    );

    setSearchedResult((res) => result);
  };

  let searchBoxHeight = searchedResult.length * 60 + 60;

  return (
    <Outer darkThemeActive={darkThemeActive}>
      <Main darkThemeActive={darkThemeActive}>
        <Wrapper
          onSubmit={(e) => {
            navigate(`/courses?query=${searchedResult}`);
          }}
          darkThemeActive={darkThemeActive}
        >
          <div>
            <BsSearch />
          </div>
          <Input
            onChange={(e) => {
              setSearchedResult(e.target.value);
            }}
            darkThemeActive={darkThemeActive}
            type="text"
            placeholder="Search our courses..."
          ></Input>
          <h1>{searchedResult}</h1>
        </Wrapper>

        {displaySearchResults && <CourseSearchResult data={searchedResult} />}
      </Main>
    </Outer>
  );
}

export default SearchCourse;

const Wrapper = styled.form`
  height: 30px;
  width: 94.5%;
  // max-width: 880px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  border-radius: 5px;
  margin: 6px;
  padding: 8px;
  display: flex;
  flex-direction: row;
  // justify-content: ;
  align-items: center;
  font-size: 12px;
`;

const Input = styled.input`
  height: 40px;
  width: 50%;
  border: none;
  outline: none;
  padding-left: 10px;

  font-size: 16px;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 5px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Box = styled.a`
  height: 50px;
  width: 100%;
  min-width: 290px;
  padding: 4px;
  margin: 3px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  &:hover {
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
    background-color: rgb(39, 106, 245, 0.01);
  }
`;

const SuggestedCourse = styled.div`
  display: none;
  @media (min-width: 550px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Outer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  background-color: rgb(255, 255, 255);
  border-radius: 5px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  @media ${device.desktop} {
    width: 100%;
  }

  //
`;

const SuggestCourseMobile = styled.div`
  display: flex;

  @media ${device.mobileL} {
    display: none;
  }
`;

const NoResultDesktop = styled.div`
  display: none;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  @media (min-width: 550px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const NoResultMobile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  @media (min-width: 550px) {
    display: none;
  }
`;
