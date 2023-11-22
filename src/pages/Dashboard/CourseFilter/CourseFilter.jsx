import React, { useContext } from "react";
import styled from "styled-components";
import { IoChevronBack } from "react-icons/io5";
import { FilterOptions } from "./FilterOptions";
import DropDown from "./DropDown";
import { CourseFilterContext } from "./CourseFilterContext";
import { device } from "../../../styles/breakpoints";
import MainActionBtn from "../../../components/Buttons/MainActionBtn";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

function CourseFilter() {
  const CrossIcon = () => {
    return <AiOutlineClose style={{ fontSize: "20px", strokeWidth: "1" }} />;
  };

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
    <div>
      <Backdrop
        style={{
          display: displayFilter ? "block" : "none",
          opacity: "0.8",
          transition: "0.4s",
          backgroundColor: "grey",
          height: "100%",
          width: "100%",
          position: "absolute",
          top: "0px",
          zIndex: "10",
        }}
      ></Backdrop>

      <Wrapper
        style={{
          left: displayFilter ? "0px" : "-100%",
          transition: "0.4s",
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
          <MainActionBtn>Clear all</MainActionBtn>

          <Back
            onClick={() => {
              setDisplayFilter((val) => !val);
              console.log("clicked");
            }}
          >
            {" "}
            <CrossIcon />
          </Back>
        </div>

        {filterContent}
      </Wrapper>
    </div>
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

  @media ${device.tablet} {
    width: 25%;
  }

  @media ${device.mobileL} {
    width: 35%;
  }
`;

const Back = styled.button`
  height: 45px;

  border: none;

  // box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;

const ClearFilter = styled.button`
  height: 35px;
  width: 100px;
  border-radius: 4px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(0, 0, 250, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Backdrop = styled.div`
  transition: 0.4s;
`;
