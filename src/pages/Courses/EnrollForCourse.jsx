import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import CourseFIlterResultDesktop from "./CourseFIlterResultDesktop";

import CourseFilterDesktopMain from "../Dashboard/CourseFilter/CourseFilterDesktopMain";
import HeaderColoredHightlight from "./HeaderColoredHightlight";

function EnrollForCourse() {
  const { darkThemeActive } = useContext(UserContext);
  const [filterTermsArr, setFilterTermsArr] = useState({});

  const [dropdownsSelected, setDropDownsSelected] = useState({
    ageGroup: false,
    subject: false,
    examBoard: false,
    skill: false,
    tier: false,
  });

  return (
    <Wrapper darkThemeActive={darkThemeActive} style={{ maxWidth: "900px" }}>
      <HeaderColoredHightlight content={"Enroll for our courses"} />
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
        <CourseFIlterResultDesktop
          filterState={{ filterTermsArr, setFilterTermsArr }}
          dropDownState={{ dropdownsSelected, setDropDownsSelected }}
        />
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  transition: 0.3s;

  background-image: linear-gradient(
    -225deg,
    rgb(142, 45, 226, 0.5) 0%,
    rgb(74, 0, 224, 0.5) 20%,
    rgb(74, 0, 224, 0.5) 30%,
    rgba(0, 200, 200, 0.7) 100%
  );

  border-radius: 5px;
  // margin: 5px;

  width: 100%;

  @media ${device.tablet} {
    width: 100%;
  }
`;
