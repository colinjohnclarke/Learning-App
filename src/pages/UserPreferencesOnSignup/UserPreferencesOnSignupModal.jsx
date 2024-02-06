import React, { useState, useContext } from "react";
import styled from "styled-components";
import "animate.css";

import StudentSchoolandYearWrapper from "./StudentSchoolandYearWrapper";
import { ThemeStyles } from "../../styles/ThemeStyles";
import CustomiseUserExperience from "./CustomiseExperience/CustomiseUserExperience";

function UserPreferencesOnSignupModal() {
  const [displayStudentAndSchoolWrapper, setDisplayStudentAndSchoolWrapper] =
    useState(false);

  const [displayCustomiseUserExperience, setDisplayCustomiseUserExperience] =
    useState(true);

  return (
    <ModalWrapper>
      {displayStudentAndSchoolWrapper && !displayCustomiseUserExperience && (
        <StudentSchoolandYearWrapper
          className={"animate__animated  animate__fadeIn"}
        />
      )}

      {displayCustomiseUserExperience && !displayStudentAndSchoolWrapper && (
        <CustomiseUserExperience />
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
