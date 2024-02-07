import React, { useState, useContext } from "react";
import styled from "styled-components";
import "animate.css";

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

  return (
    <ModalWrapper>
      {displayStudentAndSchoolWrapper && !displayCustomiseUserExperience && (
        <StudentSchoolandYearWrapper
          setDisplayStudentAndSchoolWrapper={setDisplayStudentAndSchoolWrapper}
          setDisplayCustomiseUserExperience={setDisplayCustomiseUserExperience}
          className={"animate__animated  animate__fadeIn"}
        />
      )}

      {displayCustomiseUserExperience && !displayStudentAndSchoolWrapper && (
        <CustomiseUserExperience
          setIsShoolandUserPreferencesCompleted={
            setIsShoolandUserPreferencesCompleted
          }
          setDisplayCustomiseUserExperience={setDisplayCustomiseUserExperience}
          setDisplayStudentAndSchoolWrapper={setDisplayStudentAndSchoolWrapper}
        />
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
  background-color: rgba(0, 0, 0, 0.5);
`;
