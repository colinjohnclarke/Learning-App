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

function CourseFilterDesktopMain({ filterState, dropDownState }) {
  const { filterTermsArr, setFilterTermsArr } = filterState;
  const { dropdownsSelected, setDropDownsSelected } = dropDownState;

  // console.log("🚀 ~ CourseFilterDesktopMain ~ filterTermsArr:", filterTermsArr);
  const { darkThemeActive } = useContext(UserContext);
  const CrossIcon = () => {
    return <AiOutlineClose style={{ fontSize: "20px", strokeWidth: "1" }} />;
  };

  const filterContent = FilterOptions.map((item, index) => {
    return (
      <DropDown
        setFilterTermsArr={setFilterTermsArr}
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
        // left:  ? "0px" : "-100%",
        left: "0px",

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
        }}
      >
        <MainActionBtn darkThemeActive={darkThemeActive}>
          Clear all
        </MainActionBtn>

        <Back
          darkThemeActive={darkThemeActive}
          onClick={() => {
            // setDisplayFilter((val) => !val);
          }}
        >
          <CrossIcon />
        </Back>
      </div>

      {filterContent}
    </Wrapper>
  );
}

export default CourseFilterDesktopMain;

const Wrapper = styled.div`
  height: 100%;
  background-color: white;

  //   padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 30%;
  margin: 20px;

  //   @media ${device.tablet} {
  //     width: 25%;
  //   }

  //   @media ${device.mobileL} {
  //     width: 35%;
  //   }
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
