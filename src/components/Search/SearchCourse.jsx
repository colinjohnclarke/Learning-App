import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { device } from "../../styles/breakpoints";
import CourseSearchResult from "../../pages/Dashboard/CourseSearchResult";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";
import Border from "../Border";

function SearchCourse() {
  const [searchedResult, setSearchedResult] = useState("");

  const { darkThemeActive } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Border>
      <Outer darkThemeActive={darkThemeActive}>
        <Main darkThemeActive={darkThemeActive}>
          <Wrapper
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/courses?query=${searchedResult}`);
            }}
            darkThemeActive={darkThemeActive}
          >
            <div>
              <BsSearch
                fill={
                  darkThemeActive
                    ? ThemeStyles.lightThemePrimaryFrontColor
                    : ThemeStyles.darkThemePrimaryFontColor
                }
              />
            </div>
            <Input
              onChange={(e) => {
                setSearchedResult(e.target.value);
              }}
              darkThemeActive={darkThemeActive}
              type="text"
              placeholder="Search our courses..."
            ></Input>
          </Wrapper>
        </Main>
      </Outer>
    </Border>
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

  border-radius: 16px;
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

  &::placeholder {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

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
  border-radius: 16px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const Outer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgb(255, 255, 255);
  border-radius: 16px;
  padding: 4px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  @media ${device.desktop} {
    width: 100%;
  }

  //
`;
