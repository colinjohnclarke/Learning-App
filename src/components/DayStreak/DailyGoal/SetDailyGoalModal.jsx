import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";
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
