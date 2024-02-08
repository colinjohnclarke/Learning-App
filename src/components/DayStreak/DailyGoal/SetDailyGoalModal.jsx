import React, { useState, useContext } from "react";
import styled, { css } from "styled-components";
import { TbTargetArrow } from "react-icons/tb";
import MainActionBtn from "../../Buttons/MainActionBtn";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { RxCross2 } from "react-icons/rx";
import DailyGoalUpdated from "./DailyGoalUpdated";
import SetDailyGoal from "./SetDailyGoal";

function SetDailyGoalModal({ modalIsOpen, setModalIsOpen }) {
  const { darkThemeActive } = useContext(UserContext);

  return (
    <>
      {modalIsOpen && (
        <ModalWrapper
          modalIsOpen={modalIsOpen}
          darkThemeActive={darkThemeActive}
        >
          <SetDailyGoal
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
        </ModalWrapper>
      )}
    </>
  );
}

export default SetDailyGoalModal;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};
  transition: opacity 0.2s;
  opacity: 1;

  ${({ modalIsOpen }) =>
    modalIsOpen &&
    css`
      opacity: 1;
      pointer-events: auto;
    `}
`;

const P = styled.p`
  padding-right: 10px;
`;

const Name = styled.div`
  padding-left: 10px;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
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
  // background-color: #333;
  color: #fff;
  margin: 7px;
  padding: 4px;
  height: 40px;
  width: 300px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
`;

const ModalTitle = styled.h2`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ModalOption = styled.button`
  height: 40px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 7px;
  padding: 4px;
  min-height: 50px;
  border-radius: 5px;
  border: none;

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
