import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import MainActionBtn from "../../components/Buttons/MainActionBtn";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { device } from "../../styles/breakpoints";
import { BsSignStopFill } from "react-icons/bs";

function ConfirmChangeofPersonalDataModal({ isOpen, onCancel, onConfirm }) {
  const { darkThemeActive } = useContext(UserContext);

  return (
    <ModalOverlay
      darkThemeActive={darkThemeActive}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <ModalContent darkThemeActive={darkThemeActive}>
        <h2>Confirm Change</h2>

        <BsSignStopFill
          size={60}
          fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
        />
        <p style={{ textAlign: "center" }}>
          Are you sure you want to change your personal information?
        </p>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <MainActionBtn
            style={{ width: "200px" }}
            darkThemeActive={darkThemeActive}
            onClick={onCancel}
          >
            Cancel
          </MainActionBtn>
          <MainActionBtn
            style={{ width: "250px" }}
            darkThemeActive={darkThemeActive}
            onClick={onConfirm}
          >
            Confirm
          </MainActionBtn>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
}

export default ConfirmChangeofPersonalDataModal;

const ModalOverlay = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  height: 450px;
  width: 60%;
  max-width: 500px;
  position: relative;
  background-color: #fff;
  padding: 60px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemeMainBoxShadow
      : ThemeStyles.darkThemeMainBoxShadow};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  p,
  h2 {
    color: ${(props) =>
      props.darkThemeActive
        ? ThemeStyles.lightThemePrimaryFrontColor
        : ThemeStyles.darkThemePrimaryFontColor};
  }

  @media ${device.tablet} {
    width: 300px;
  }
`;

const ModalButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
