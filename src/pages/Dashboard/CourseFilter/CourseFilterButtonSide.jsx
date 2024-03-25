import React, { useContext } from "react";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { BiFilter } from "react-icons/bi";
import styled from "styled-components";

function CourseFilterButtonSide({ sidePanel }) {
  const { courseFilterMobileisOpen, setCourseFilterMobileisOpen } = sidePanel;

  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper
      onClick={() => {
        setCourseFilterMobileisOpen((val) => !val);
      }}
      darkThemeActive={darkThemeActive}
    >
      <BiFilter
        fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
        size={25}
      ></BiFilter>
    </Wrapper>
  );
}

export default CourseFilterButtonSide;

const Wrapper = styled.button`
  border: 1px solid rgb(0, 245, 245);
  margin-right: 10px;
  padding: 10px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? "white"
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  border-radius: 16px;
  background-color: 0.2s ease-in-out 0s;

  @media (min-width: 600px) {
    display: none;
  }

  &:hover {
    transform: translateY(-1px);
    background-color: rgba(0, 245, 245);
  }

  &:active {
    transform: translateY(1px);
    // background-color: rgba(0, 240, 240, 0.29);
  }
`;
