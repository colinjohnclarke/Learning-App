import React, { useState, useContext } from "react";
import styled from "styled-components";
import "animate.css";
import { UserContext } from "../../App";

import StudentSchoolandYearWrapper from "./StudentSchoolandYearWrapper";
import { ThemeStyles } from "../../styles/ThemeStyles";
import CustomiseUserExperience from "./CustomiseExperience/CustomiseUserExperience";

function UserPreferencesOnSignupModal({
  setIsShoolandUserPreferencesCompleted,
}) {
  const [displayStudentAndSchoolWrapper, setDisplayStudentAndSchoolWrapper] =
    useState(true);

  const [displayCustomiseUserExperience, setDisplayCustomiseUserExperience] =
    useState(false);

  const {
    darkThemeActive,
    setDarkThemeActive,
    silentModeActive,
    setSilentModeActive,
  } = useContext(UserContext);

  return (
    <div>
      <h1> HEJHJHJH{JSON.stringify(darkThemeActive)}</h1>
      <ModalWrapper darkThemeActive={darkThemeActive}>
        {displayStudentAndSchoolWrapper && !displayCustomiseUserExperience && (
          <StudentSchoolandYearWrapper
            setDisplayStudentAndSchoolWrapper={
              setDisplayStudentAndSchoolWrapper
            }
            setDisplayCustomiseUserExperience={
              setDisplayCustomiseUserExperience
            }
            className={"animate__animated  animate__fadeIn"}
          />
        )}

        {displayCustomiseUserExperience && !displayStudentAndSchoolWrapper && (
          <CustomiseUserExperience
            setIsShoolandUserPreferencesCompleted={
              setIsShoolandUserPreferencesCompleted
            }
            setDisplayCustomiseUserExperience={
              setDisplayCustomiseUserExperience
            }
            setDisplayStudentAndSchoolWrapper={
              setDisplayStudentAndSchoolWrapper
            }
          />
        )}
      </ModalWrapper>
    </div>
  );
}

export default UserPreferencesOnSignupModal;

const ModalWrapper = styled.div`
  // position: fixed;
  // z-index: 1000;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
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
