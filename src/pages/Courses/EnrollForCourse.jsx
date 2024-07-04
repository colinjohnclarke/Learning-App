import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import CourseFIlterResultDesktop from "./CourseFIlterResultDesktop";
import { useLocation } from "react-router-dom";
import CourseFilterDesktopMain from "../Dashboard/CourseFilter/CourseFilterDesktopMain";
import HeaderColoredHightlight from "./HeaderColoredHightlight";
import CourseFilterMobileMain from "../Dashboard/CourseFilter/CourseFilterMobileMain";

function EnrollForCourse() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  const { darkThemeActive } = useContext(UserContext);
  const [filterTermsArr, setFilterTermsArr] = useState({});
  window.scrollTo(0, 0);
  const [courseFilterMobileisOpen, setCourseFilterMobileisOpen] =
    useState(false);
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
        <DesktopFilter>
          <CourseFilterDesktopMain
            filterState={{ filterTermsArr, setFilterTermsArr }}
            dropDownState={{ dropdownsSelected, setDropDownsSelected }}
            sidePanel={{
              courseFilterMobileisOpen,
              setCourseFilterMobileisOpen,
            }}
          />
        </DesktopFilter>
        <CourseFIlterResultDesktop
          query={query}
          filterState={{ filterTermsArr, setFilterTermsArr }}
          dropDownState={{ dropdownsSelected, setDropDownsSelected }}
          sidePanel={{
            courseFilterMobileisOpen,
            setCourseFilterMobileisOpen,
          }}
        />
        <CourseFilterMobileMain
          filterState={{ filterTermsArr, setFilterTermsArr }}
          dropDownState={{ dropdownsSelected, setDropDownsSelected }}
          sidePanel={{
            courseFilterMobileisOpen,
            setCourseFilterMobileisOpen,
          }}
        ></CourseFilterMobileMain>
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

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 16px;



  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
`;

const DesktopFilter = styled.div`
  display: none;
  @media (min-width: 600px) {
    display: flex;
    width: 40%;
  }
`;
