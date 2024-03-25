import React from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";

function DailyGoalUpdated() {
  return <ModalContent>DailyGoalUpdated</ModalContent>;
}

export default DailyGoalUpdated;

const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;
