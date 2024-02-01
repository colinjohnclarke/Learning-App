import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { FaRegEdit } from "react-icons/fa";
import { UserContext } from "../../../App";
import SetDailyGoalModal from "./SetDailyGoalModal";

function SetDailyGoalBtn() {
  const { darkThemeActive } = useContext(UserContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log("🚀 ~ SetDailyGoalBtn ~ modalIsOpen:", modalIsOpen);
  const handleClick = () => {
    setModalIsOpen(!modalIsOpen);
    console.log("🚀 ~ SetDailyGoalBtn ~ modalIsOpen:", modalIsOpen);
  };

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
            Daily Goal
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
            0/150 XP
          </div>
        </Inner>
        <Btn darkThemeActive={darkThemeActive} onClick={handleClick}>
          <FaRegEdit fill={darkThemeActive ? "grey" : "white"} />
        </Btn>
      </Wrapper>
    </div>
  );
}

export default SetDailyGoalBtn;

// background-color: ${(props) =>
//     props.darkThemeActive
//       ? ThemeStyles.lightThemePrimaryBackgroundColor
//       : ThemeStyles.darkThemeSecondaryBackgroundColor};

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
  height: 30px;
  width: 30px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.darkThemeActive
      ? "lightgrey"
      : ThemeStyles.darkThemeTertiaryBackgroundColor};

  border-radius: 50%;
  border: none;
  margin-left: 2px;

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  &:hover {
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;

    background-color: #e0e0e0;
  }
`;
