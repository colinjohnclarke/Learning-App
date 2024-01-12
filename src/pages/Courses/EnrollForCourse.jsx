import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import CourseFIlterResultDesktop from "./CourseFIlterResultDesktop";

import CourseFilterDesktopMain from "../Dashboard/CourseFilter/CourseFilterDesktopMain";

function EnrollForCourse() {
  const { darkThemeActive } = useContext(UserContext);
  const [filterTermsArr, setFilterTermsArr] = useState({});
  console.log("🚀 ~ EnrollForCourse ~ filterTermsArr:", filterTermsArr);

  const [dropdownsSelected, setDropDownsSelected] = useState({
    ageGroup: false,
    subject: false,
    examBoard: false,
    skill: false,
    tier: false,
  });
  console.log("🚀 ~ EnrollForCourse ~ dropdownsSelected:", dropdownsSelected);

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
        <CourseFilterDesktopMain
          filterState={{ filterTermsArr, setFilterTermsArr }}
          dropDownState={{ dropdownsSelected, setDropDownsSelected }}
        />
        <CourseFIlterResultDesktop filterTermsArr={filterTermsArr} />
      </div>
    </Wrapper>
  );
}

export default EnrollForCourse;

const Wrapper = styled.div`
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  margin-top: 10px;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;
