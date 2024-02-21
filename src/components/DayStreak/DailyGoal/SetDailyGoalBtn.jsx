import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { MdEdit } from "react-icons/md";
import { UserContext } from "../../../App";
import SetDailyGoalModal from "./SetDailyGoalModal";
import XPPointsScoredToday from "./XPPointsScoredToday";

function SetDailyGoalBtn() {
  const { darkThemeActive, userData } = useContext(UserContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const xP = XPPointsScoredToday();

  return (
    <div>
      <SetDailyGoalModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
      />
      <Wrapper darkThemeActive={darkThemeActive}>
        <Inner>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "500",
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            Target
          </div>
          <div
            style={{
              fontSize: "12px",
              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            {" "}
            {xP}/ {userData?.user.preferences.personalizedSettings.dailyXPGoal}{" "}
            XP
          </div>
        </Inner>
        <Btn darkThemeActive={darkThemeActive} onClick={handleClick}>
          <MdEdit fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"} />
        </Btn>
      </Wrapper>
    </div>
  );
}

export default SetDailyGoalBtn;

const Wrapper = styled.div`
  padding: 10px;
  height: 30px;
  width: 110px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 0.5px solid lightgrey;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor};
`;

const Inner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.darkThemePrimaryFontColor
      : ThemeStyles.lightThemePrimaryFrontColor};
`;

const Btn = styled.button`
  position: relative;
  left: 4px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px lightgrey;
  margin: 3px;
  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? `${ThemeStyles.lightThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 2px 2px`
      : `${ThemeStyles.darkThemeMainBoxShadow}`};

  &:hover {
    background-color: rgb(39, 106, 245, 0.05);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
