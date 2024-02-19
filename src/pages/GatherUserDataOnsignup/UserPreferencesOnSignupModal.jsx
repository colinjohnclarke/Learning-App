import React, { useState, useContext } from "react";
import styled from "styled-components";
import "animate.css";
import { UserContext } from "../../App";
import { device } from "../../styles/breakpoints";
import StudentSchoolandYearWrapper from "./StudentSchoolandYearWrapper";
import { ThemeStyles } from "../../styles/ThemeStyles";
import CustomiseUserExperience from "./CustomiseExperience/CustomiseUserExperience";
import ConfirmUserFirstName from "./UserNames/ConfirmUserNames";

function UserPreferencesOnSignupModal({
  setIsShoolandUserPreferencesCompleted,
}) {
  const [displayConfirmUserNames, setDisplayConfirmUserNames] = useState(true);
  const [displayStudentAndSchoolWrapper, setDisplayStudentAndSchoolWrapper] =
    useState(false);

  const [displayCustomiseUserExperience, setDisplayCustomiseUserExperience] =
    useState(false);

  const { darkThemeActive } = useContext(UserContext);

  const navigateSignup = {
    displayConfirmUserNames,
    setDisplayConfirmUserNames,
    displayStudentAndSchoolWrapper,
    setDisplayStudentAndSchoolWrapper,
    displayCustomiseUserExperience,
    setDisplayCustomiseUserExperience,
  };

  return (
    <ModalWrapper darkThemeActive={darkThemeActive}>
      {displayConfirmUserNames && (
        <ConfirmUserFirstName navigateSignup={navigateSignup} />
      )}
      {displayStudentAndSchoolWrapper && !displayCustomiseUserExperience && (
        <StudentSchoolandYearWrapper
          navigateSignup={navigateSignup}
          className={"animate__animated  animate__fadeIn"}
        />
      )}
      {displayCustomiseUserExperience && !displayStudentAndSchoolWrapper && (
        <CustomiseUserExperienceWrapper darkThemeActive={darkThemeActive}>
          {" "}
          <CustomiseUserExperience
            navigateSignup={navigateSignup}
            setIsShoolandUserPreferencesCompleted={
              setIsShoolandUserPreferencesCompleted
            }
          />
        </CustomiseUserExperienceWrapper>
      )}
    </ModalWrapper>
  );
}

export default UserPreferencesOnSignupModal;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) =>
    props.darkThemeActive
      ? `linear-gradient(
        225deg,
        rgba(0, 100, 200, 0.3) 0%,
        rgba(0, 200, 200, 0.3) 30%,
        rgba(0, 240, 240, 0.3) 60%,
        rgba(39, 106, 245, 0.3) 100%
      )`
      : `linear-gradient(    225deg, rgb(58,80,107)   0%, #1c2541 50%,  #0b132b 100%)`};
`;

const CustomiseUserExperienceWrapper = styled.div`
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
  h2,
  div {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  @media ${device.tablet} {
    width: 300px;
  }
`;
