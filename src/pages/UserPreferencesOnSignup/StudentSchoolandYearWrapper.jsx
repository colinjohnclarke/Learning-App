import React from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import SelectSchool from "./SelectSchool/SelectSchool";
import MainActionBtn from "../../components/Buttons/MainActionBtn";

import SelectYear from "./SelectYear/SelectYear";

function StudentSchoolandYearWrapper({
  setDisplayStudentAndSchoolWrapper,
  setDisplayCustomiseUserExperience,
}) {
  const handleClick = () => {
    setDisplayStudentAndSchoolWrapper(false);
    setDisplayCustomiseUserExperience(true);
  };



  return (
    <ModalContent style={{ boxShadow: ThemeStyles.lightThemeMainBoxShadow }}>
      <h2>Complete your signup</h2>
      <SelectSchool />
      <SelectYear />
      <MainActionBtn
        onClick={handleClick}
        style={{ width: "100%", marginTop: "20px" }}
      >
        {" "}
        Save
      </MainActionBtn>

     
    </ModalContent>
  );
}

export default StudentSchoolandYearWrapper;

const P = styled.p`
  padding-right: 10px;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const Name = styled.div`
  padding-left: 10px;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  width: 60%;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  @media ${device.tablet} {
    width: auto;
  }
`;
