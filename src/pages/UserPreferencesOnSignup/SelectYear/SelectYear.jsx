import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";

import Years from "./Years";
import { FcNext } from "react-icons/fc";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { UserContext } from "../../../App";
import { device } from "../../../styles/breakpoints";

function SelectYear({ setYear }) {
  const [selectedYear, setSelectedYear] = useState("");
  const [isDropDownDisplayed, setIsDropDownDisplayed] = useState(false);
  const dropdownRef = useRef(null);
  const { darkThemeActive, userData } = useContext(UserContext);

  const savedSchoolYear =
    userData?.user.yearGroup || localStorage.getItem("yearGroup");
  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     console.log(e);
  //     console.log("CURRENT", dropdownRef.current);
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setIsDropDownDisplayed((val) => false);
  //       console.log("!contains");
  //     }
  //   };
  //   document.addEventListener("click", handleOutsideClick);

  //   return () => document.removeEventListener("click", handleOutsideClick);
  // }, []);

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          // padding: "10px",
          backgroundColor: darkThemeActive
            ? ThemeStyles.lightThemePrimaryBackgroundColor
            : ThemeStyles.darkThemePrimaryBackgroundColor,
        }}
      >
        {" "}
        <LabelText darkThemeActive={darkThemeActive}>Select Year</LabelText>
        <IoCalendarNumberOutline
          stroke={darkThemeActive ? "black" : "white"}
          style={{
            marginLeft: "15px",
            position: "relative",
            left: "14px",
            bottom: "2px",
          }}
        />
      </div>

      <DropdownButton
        darkThemeActive={darkThemeActive}
        onClick={() => {
          setIsDropDownDisplayed((val) => !val);
        }}
      >
        {selectedYear || (
          <p style={{ fontSize: "13px" }}>
            {savedSchoolYear ? savedSchoolYear : "select year"}
          </p>
        )}

        <FcNext
          style={{
            transform: isDropDownDisplayed ? "rotate(270deg)" : "rotate(90deg)",
            transition: "0.2s",
          }}
        />
      </DropdownButton>
      <DropdownOptions
        darkThemeActive={darkThemeActive}
        ref={dropdownRef}
        style={{ height: isDropDownDisplayed ? "200px" : "0px" }}
        // onClick={(e) => e.stopPropagation()}
      >
        {Years.map((year, index) => (
          <OptionItem
            key={index}
            onClick={() => {
              setSelectedYear(year);
              setIsDropDownDisplayed((val) => false);
              localStorage.setItem("yearGroup", year);
              setYear(year);
            }}
          >
            {year}
          </OptionItem>
        ))}
      </DropdownOptions>
    </Wrapper>
  );
}

export default SelectYear;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 50;
  // min-width: 300px;

  // @media ${device.tablet} {
  //   width: 300px;
  // }
`;

const Btn = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  transition: 0.2s;
`;

const LabelText = styled.label`
  font-size: 13px;
  position: relative;
  right: 5px;

  background: transparent;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 45px;
  padding: 8px;

  border: none;
  border-radius: 5px;
  font-size: 12px;
  // color: #555;
  background-color: #fff;
  text-align: left;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  p {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const DropdownOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  // max-height: 100px;
  overflow-y: auto;

  border-top: none;
  border-radius: 0 0 4px 4px;
  background-color: #fff;
  transition: 0.1s;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  font-size: 13px;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  div {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }
`;

const OptionItem = styled.div`
  padding: 8px;
  cursor: pointer;

  style= {
     {
      fontsize: "13px";
    }
  }

  &:hover {
    background-color: rgb(0, 245, 245, 0.1);
  }
`;
