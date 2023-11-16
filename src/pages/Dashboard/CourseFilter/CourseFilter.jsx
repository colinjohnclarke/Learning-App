import React, { useContext } from "react";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";
import { FilterOptions } from "./FilterOptions";
import DropDown from "./DropDown";
import { CourseFilterContext } from "./CourseFilterContext";

function CourseFilter() {
  const filterContent = FilterOptions.map((item, index) => {
    return <DropDown index={index} data={item}></DropDown>;
  });
  const {
    dropDownClicked,
    setDropdownClicked,
    displayFilter,
    setDisplayFilter,
  } = useContext(CourseFilterContext);

  return (
    <Wrapper
      style={{ left: displayFilter ? "0px" : "-100%", transition: "0.3s" }}
    >
      <Back
        onClick={() => {
          setDisplayFilter((val) => !val);
          console.log("clicked");
        }}
      >
        {" "}
        <IoChevronBack />
      </Back>
      {filterContent}
    </Wrapper>
  );
}

export default CourseFilter;

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
  position: absolute;
  top: 0;
  z-index: 10;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 65%;
`;

const Back = styled.button`
  height: 35px;
  width: 35px;
  border-radius: 4px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background: linear-gradient(
    225deg,
    rgba(39, 106, 245, 0.5) 0%,
    rgba(0, 200, 200, 0.5) 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;
