import React, { useState, useContext } from "react";
import styled from "styled-components";
import { TbTargetArrow } from "react-icons/tb";
import MainActionBtn from "../../Buttons/MainActionBtn";
import { UserContext } from "../../../App";
import {
  darkThemeSecondaryBackgroundColor,
  ThemeStyles,
} from "../../../styles/ThemeStyles";
import { RxCross2 } from "react-icons/rx";
import DailyGoalUpdated from "./DailyGoalUpdated";
import animate from "animate.css";
import ConfettiDashboard from "../../Effects/ConfettiDashboard";
import { device } from "../../../styles/breakpoints";

import { DiRubyRough } from "react-icons/di";
import { useUpdateDailyXpGoalMutation } from "../../../features/api/UserData/dailyXPGoal";

function SetDailyGoal({ modalIsOpen, setModalIsOpen }) {
  const { darkThemeActive, userData } = useContext(UserContext);
  const [selectedOption, setSelectedOption] = useState();
  console.log("🚀 ~ SetDailyGoalModal ~ selectedOption:", selectedOption);

  const [displayDailyGoalUpdate, setDisplayDailyGoalUpdate] = useState(false);

  const [updateDailyXpGoal] = useUpdateDailyXpGoalMutation();

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const handleSubmit = async () => {
    console.log("Selected XP Points234:", selectedOption);
    setDisplayDailyGoalUpdate((val) => true);

    const update = await updateDailyXpGoal({
      updatedDailyXPGoal: selectedOption,
      id: userData.user._id,
    });
    console.log("🚀 ~ handleSubmit ~ update:", update);
  };

  const selected = {
    backgroundColor: darkThemeActive
      ? "lightgrey"
      : darkThemeSecondaryBackgroundColor,
    color: "white",
  };

  const inActiveSubmitButtonStyle = {
    backgroundColor: "rgb(0, 245, 245, 0.2)",
    color: darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor,

    boxShadow: darkThemeActive
      ? ThemeStyles.darkThemeMainBoxShadow
      : ThemeStyles.lightThemeMainBoxShadow,
  };

  const activeSubmitButtonStyle = {
    backgroundColor: darkThemeActive
      ? "rgb(0, 245, 245)"
      : ThemeStyles.darkThemePrimaryBackgroundColor,

    color: darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor,

    boxShadow: darkThemeActive
      ? ThemeStyles.darkThemeMainBoxShadow
      : ThemeStyles.lightThemeMainBoxShadow,

    border: "2px solid rgba(0, 240, 240, 0.8)",
    color: "white",
  };

  const XPPointsOptions = [
    { name: "Light", xp: "100" },
    { name: "Casual", xp: "150" },
    { name: "Intermediate", xp: "200" },
    { name: "Serious", xp: "250" },
    { name: "Advanced", xp: "500" },
  ];

  const options = XPPointsOptions.map((option, optionsIndex) => {
    let rubys = XPPointsOptions.map((item, index) => {
      if (index <= optionsIndex) {
        return <DiRubyRough size={15} fill="rgb(138,43,226)" />;
      } else return <></>;
    });

    return (
      <ModalOption
        style={selectedOption === option.xp ? selected : {}}
        type="button"
        value={option.xp}
        onClick={(e) => {
          e.preventDefault();
          setSelectedOption(option.xp);
          console.log("TEST", e.target.value);
        }}
        darkThemeActive={darkThemeActive}
      >
        <Name darkThemeActive={darkThemeActive}> {option.name}</Name>
        <Ruby>{rubys}</Ruby>
        <P darkThemeActive={darkThemeActive}>{option.xp} XP</P>
      </ModalOption>
    );
  });

  return (
    <Wrapper>
      {!displayDailyGoalUpdate ? (
        <ModalContent darkThemeActive={darkThemeActive}>
          <ModalExitBtn onClick={toggleModal}>
            {" "}
            <RxCross2 size={24} />
          </ModalExitBtn>
          <ModalTitle darkThemeActive={darkThemeActive}>
            Set your Daily Goal
            <TbTargetArrow
              style={{ marginTop: "10px" }}
              stroke={
                darkThemeActive
                  ? ThemeStyles.darkThemeTertiaryBackgroundColor
                  : "white"
              }
              size={140}
            />
          </ModalTitle>
          <ModalForm onSubmit={handleSubmit}>
            {options}

            <ModalButton
              onClick={handleSubmit}
              style={
                !selectedOption
                  ? inActiveSubmitButtonStyle
                  : activeSubmitButtonStyle
              }
              disabled={!selectedOption}
              type="button"
            >
              Lock it in!
            </ModalButton>
          </ModalForm>
        </ModalContent>
      ) : (
        <>
          <ModalContent darkThemeActive={darkThemeActive}>
            <ModalExitBtn onClick={toggleModal}>
              {" "}
              <RxCross2 size={24} />
            </ModalExitBtn>
            <ConfettiDashboard></ConfettiDashboard>
            <ModalTitle darkThemeActive={darkThemeActive}>
              Daily Goal set to {selectedOption} XP
              <TbTargetArrow
                stroke={
                  darkThemeActive
                    ? ThemeStyles.darkThemeTertiaryBackgroundColor
                    : "white"
                }
                size={140}
              />
            </ModalTitle>

            <ModalButton
              darkThemeActive={darkThemeActive}
              onClick={toggleModal}
              style={
                !selectedOption
                  ? inActiveSubmitButtonStyle
                  : { border: "2px solid white" }
              }
              disabled={!selectedOption}
              type="button"
            >
              Continue!
            </ModalButton>
          </ModalContent>
        </>
      )}
    </Wrapper>
  );
}

export default SetDailyGoal;

const Wrapper = styled.div`
  position: absolute;
  z-index: 300;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
  width: 60vw;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
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

  @media ${device.tablet} {
    width: auto;
  }
`;

const Ruby = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ModalExitBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 0.5px lightgrey;
  margin: 3px;
  &:hover {
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;

    background-color: #e0e0e0;
  }
`;

const ModalButton = styled.button`
  margin: 7px;
  padding: 4px;
  height: 50px;
  width: 300px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 240, 240, 1);
    color: white;
  }

  &:active {
    transform: translateY(3px);
    background-color: rgba(0, 240, 240, 1);
    box-shadow: none;
  }
`;

const ModalTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
`;

const ModalOption = styled.button`
  height: 40px;
  min-width: 300px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 7px;
  padding: 4px;
  min-height: 50px;
  border-radius: 5px;
  border: none;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};

  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &:hover {
    transition: 0s;
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
  }
`;
