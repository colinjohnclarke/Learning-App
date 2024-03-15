import React, { useContext, useState } from "react";
import styled from "styled-components";

import { FilterOptions } from "./FilterOptions";
import DropDown from "./DropDown";
import { CourseFilterContext } from "./CourseFilterContext";
import { device } from "../../../styles/breakpoints";
import MainActionBtn from "../../../components/Buttons/MainActionBtn";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { BiFilter } from "react-icons/bi";
import { IoMdArrowBack } from "react-icons/io";

function CourseFilterDesktopMain({ filterState, dropDownState, sidePanel }) {
  const { filterTermsArr, setFilterTermsArr } = filterState;
  const { dropdownsSelected, setDropDownsSelected } = dropDownState;

  const { courseFilterMobileisOpen, setCourseFilterMobileisOpen } = sidePanel;

  const { darkThemeActive } = useContext(UserContext);

  const CrossIcon = () => {
    return <AiOutlineClose style={{ fontSize: "20px", strokeWidth: "1" }} />;
  };

  const filterContent = FilterOptions.map((item, index) => {
    return (
      <DropDown
        setFilterTermsArr={setFilterTermsArr}
        filterTermsArr={filterTermsArr}
        dropdownsSelected={dropdownsSelected}
        setDropDownsSelected={setDropDownsSelected}
        index={index}
        data={item}
      ></DropDown>
    );
  });

  return (
    <Wrapper
      darkThemeActive={darkThemeActive}
      style={{
        backgroundColor: darkThemeActive
          ? ThemeStyles.lightThemePrimaryBackgroundColor
          : ThemeStyles.darkThemeSecondaryBackgroundColor,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",

          margin: "5px",
        }}
      >
        {/* <BiFilter
          fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
          size={25}
        ></BiFilter> */}
        <MainActionBtn
          style={{ marginRight: "4px" }}
          onClick={() => {
            setFilterTermsArr([]);
          }}
          darkThemeActive={darkThemeActive}
        >
          <p>Reset filter</p>
        </MainActionBtn>
      </div>

      <FilterDiv>{filterContent}</FilterDiv>
    </Wrapper>
  );
}

export default CourseFilterDesktopMain;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const FilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 97%;

  padding-right: 4px;
  padding-left: 4px;
`;

const Back = styled.button`
  height: 45px;
  border: none;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
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
const ClearFilter = styled.button`
  height: 35px;
  width: 100px;
  border-radius: 5px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(0, 0, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Backdrop = styled.div``;
