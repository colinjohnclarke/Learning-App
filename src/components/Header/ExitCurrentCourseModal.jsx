import React, { useState, useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";
import { ThemeStyles } from "../../styles/ThemeStyles";
import MainActionBtn from "../Buttons/MainActionBtn";
import { BsExclamationDiamondFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

function ExitCurrentCourseModal({ modalIsOpen, setModalIsOpen }) {
  const { darkThemeActive } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <>
      {modalIsOpen && (
        <ModalWrapper darkThemeActive={darkThemeActive}>
          <ModalContent darkThemeActive={darkThemeActive}>
            <ModalExitBtn
              onClick={() => setModalIsOpen((val) => !val)}
              darkThemeActive={darkThemeActive}
            >
              <IoMdClose
                fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
                size={24}
              />
            </ModalExitBtn>

            <BsExclamationDiamondFill
              fill={darkThemeActive ? "" : "white"}
              size={54}
            />
            <P darkThemeActive={darkThemeActive}>
              Are you sure you want to exit? You will lose all progress.
            </P>
            <ButtonContainer>
              <MainActionBtn
                onClick={() => setModalIsOpen((val) => !val)}
                darkThemeActive={darkThemeActive}
                style={{ minWidth: "160px" }}
              >
                <P> Cancel</P>
              </MainActionBtn>
              <MainActionBtn
                onClick={() => {
                  navigate("/dashboard");
                  setModalIsOpen((val) => !val);
                }}
                darkThemeActive={darkThemeActive}
                style={{ minWidth: "160px" }}
              >
                <P> Exit to Dashboard</P>
              </MainActionBtn>
            </ButtonContainer>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
}

export default ExitCurrentCourseModal;

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
`;

const P = styled.p`
  padding-right: 10px;
  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
