import React, { useContext, useState } from "react";
import styled from "styled-components";
import CourseFilterDesktopMain from "./CourseFilterDesktopMain";
import "animate.css";
import { RxCross2 } from "react-icons/rx";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { device } from "../../../styles/breakpoints";
import { UserContext } from "../../../App";
import { IoMdArrowBack } from "react-icons/io";

export default function CourseFilterMobileMain({
  sidePanel,
  filterState,
  dropDownState,
}) {
  const { filterTermsArr, setFilterTermsArr } = filterState;
  const { dropdownsSelected, setDropDownsSelected } = dropDownState;
  const { courseFilterMobileisOpen, setCourseFilterMobileisOpen } = sidePanel;
  const { darkThemeActive } = useContext(UserContext);

  let position = "-200%";

  if (courseFilterMobileisOpen) {
    position = "0%";
  }

  return (
    <div>
      <Wrapper
        className={" animate__animated animate__fadeIn"}
        position={position}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            backgroundColor: darkThemeActive
              ? ThemeStyles.lightThemePrimaryBackgroundColor
              : ThemeStyles.darkThemeSecondaryBackgroundColor,
          }}
        >
          {" "}
          <button
            style={{
              height: "30px",
              margin: "7px",
              backgroundColor: darkThemeActive
                ? ThemeStyles.lightThemePrimaryBackgroundColor
                : ThemeStyles.darkThemeSecondaryBackgroundColor,
              border: "none",
            }}
            onClick={() => {
              setCourseFilterMobileisOpen((val) => !val);
            }}
          >
            {" "}
            <IoMdArrowBack
              fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
              size={25}
            />
          </button>
        </div>

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
  width: 360px;
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
