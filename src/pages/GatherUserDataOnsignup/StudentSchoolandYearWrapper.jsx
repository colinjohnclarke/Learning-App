import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import SelectSchool from "./SelectSchool/SelectSchool";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import SelectYear from "./SelectYear/SelectYear";

import { UserContext } from "../../App";
import { useUpdateUserSchoolMutation } from "../../redux/api/UserData/updateUserSchool";

import { FcGraduationCap } from "react-icons/fc";

function StudentSchoolandYearWrapper({ navigateSignup }) {
  const { darkThemeActive, userData } = useContext(UserContext);

  const [school, setSchool] = useState({});

  const [year, setYear] = useState("");

  const {
    displayConfirmUserNames,
    setDisplayConfirmUserNames,
    displayStudentAndSchoolWrapper,
    setDisplayStudentAndSchoolWrapper,
    displayCustomiseUserExperience,
    setDisplayCustomiseUserExperience,
  } = navigateSignup;

  const [updateUserSchool] = useUpdateUserSchoolMutation();

  const schoolDetails = {
    id: userData?.user._id,
    ...school,
    year,
  };

  const updateSchoolDetails = async () => {
    try {
      const result = await updateUserSchool(schoolDetails);
    } catch (error) {}
  };

  const handleSaveBtnClick = () => {
    setDisplayStudentAndSchoolWrapper(false);
    setDisplayCustomiseUserExperience(true);
    updateSchoolDetails();
  };

  const handlePrevBtnClicked = () => {
    setDisplayCustomiseUserExperience(false);
    setDisplayStudentAndSchoolWrapper(false);
    setDisplayConfirmUserNames(true);
  };

  return (
    <ModalContent darkThemeActive={darkThemeActive}>
      <h2> Your school details</h2>
      <FcGraduationCap size={50} stroke={darkThemeActive ? "" : "white"} />
      <Box>
        {" "}
        <SelectSchool setSchool={setSchool} />
      </Box>
      <Box>
        {" "}
        <SelectYear setYear={setYear} />
      </Box>
      <div style={{ display: "flex", width: "100%" }}>
        <MainActionBtn
          darkThemeActive={darkThemeActive}
          onClick={handlePrevBtnClicked}
          style={{ width: "100%", marginTop: "20px", marginTop: "40px" }}
        >
          {" "}
          previous
        </MainActionBtn>

        <MainActionBtn
          darkThemeActive={darkThemeActive}
          onClick={handleSaveBtnClick}
          style={{ width: "100%", marginTop: "20px", marginTop: "40px" }}
        >
          {" "}
          save
        </MainActionBtn>
      </div>
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
  border-radius: 16px;
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

const Box = styled.div`
  width: 100%;
`;
