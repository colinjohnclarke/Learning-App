import React, { useContext, useState } from "react";
import styled from "styled-components";
import CourseFilterDesktopMain from "./CourseFilterDesktopMain";
import "animate.css";

export default function CourseFilterMobileMain({
  sidePanel,
  filterState,
  dropDownState,
}) {
  const { filterTermsArr, setFilterTermsArr } = filterState;
  const { dropdownsSelected, setDropDownsSelected } = dropDownState;
  const { courseFilterMobileisOpen, setCourseFilterMobileisOpen } = sidePanel;
  let position = "-100%";

  if (courseFilterMobileisOpen) {
    position = "0%";
  }

  return (
    <div>
      <Wrapper
        className={" animate__animated animate__fadeIn"}
        position={position}
      >
        <button
          onClick={() => {
            setCourseFilterMobileisOpen((val) => !val);
          }}
        >
          {" "}
          click
        </button>

        <CourseFilterDesktopMain
          filterState={{ filterTermsArr, setFilterTermsArr }}
          dropDownState={{ dropdownsSelected, setDropDownsSelected }}
          sidePanel={{ courseFilterMobileisOpen, setCourseFilterMobileisOpen }}
        ></CourseFilterDesktopMain>
      </Wrapper>
      <Backdrop
        className={"animate__animated animate__fadeIn"}
        position={position}
      />
    </div>
  );
}

const Backdrop = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgb(0, 0, 0, 0.6);
  position: absolute;
  top: 0px;
  z-index: 100;

  left: ${(props) => props.position};
  @media (min-width: 600px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  width: 400px;
  background-color: white;
  position: fixed;
  z-index: 101;
  top: 0px;

  transition: 0.3s;

  left: ${(props) => props.position};

  @media (min-width: 600px) {
    display: none;
  }
`;
