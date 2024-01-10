import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";

import CourseFilterDesktopMain from "../Dashboard/CourseFilter/CourseFilterDesktopMain";

function EnrollForCourse() {
  const { darkThemeActive } = useContext(UserContext);
  return (
    <Wrapper darkThemeActive={darkThemeActive} style={{ maxWidth: "900px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <CourseFilterDesktopMain darkThemeActive={darkThemeActive} />
        <CourseFilterResult darkThemeActive={darkThemeActive}>
          {" "}
          Begin by searching....
        </CourseFilterResult>
      </div>
    </Wrapper>
  );
}

export default EnrollForCourse;

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-top: 5px;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const CourseFilterResult = styled.div`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 400;

  align-items: center;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;

  width: 50%;
  max-height: 100px;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;
