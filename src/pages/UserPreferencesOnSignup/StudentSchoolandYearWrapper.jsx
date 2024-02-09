import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import SelectSchool from "./SelectSchool/SelectSchool";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import { GiArchiveRegister } from "react-icons/gi";
import { UserContext } from "../../App";

import SelectYear from "./SelectYear/SelectYear";

function StudentSchoolandYearWrapper({
  setDisplayStudentAndSchoolWrapper,
  setDisplayCustomiseUserExperience,
}) {
  const { darkThemeActive } = useContext(UserContext);
  const handleClick = () => {
    setDisplayStudentAndSchoolWrapper(false);
    setDisplayCustomiseUserExperience(true);
  };

  return (
    <ModalContent darkThemeActive={darkThemeActive}>
      <h2>Complete your signup</h2>
      <GiArchiveRegister fill={darkThemeActive ? "" : "white"} size={45} />
      <SelectSchool />
      <SelectYear />
      <MainActionBtn
        darkThemeActive={darkThemeActive}
        onClick={handleClick}
        style={{ width: "100%", marginTop: "20px", marginTop: "40px" }}
      >
        {" "}
        Save
      </MainActionBtn>
    </ModalContent>
  );
}

export default StudentSchoolandYearWrapper;

const ModalContent = styled.div`
  height: 450px;
  width: 60%;
  max-width: 500px;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  p,
  h2 {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  @media ${device.tablet} {
    width: 300px;
  }
`;
