import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../App";
import ExitCurrentCourseModal from "./ExitCurrentCourseModal";

function ExitCurrentCourseBtn() {
  const { darkThemeActive } = useContext(UserContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <ExitCurrentCourseModal
        setModalIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
      ></ExitCurrentCourseModal>
      <ExitBtn
        darkThemeActive={darkThemeActive}
        onClick={() => setModalIsOpen((val) => !val)}
      >
        {" "}
        <IoMdClose
          fill={darkThemeActive ? "rgb(200, 200, 200)" : "white"}
          size={24}
        />
      </ExitBtn>
    </div>
  );
}

export default ExitCurrentCourseBtn;

const ExitBtn = styled.button`
  top: 0;
  right: 0;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 10px;
  box-shadow: ${(props) =>
    props.darkThemeActive
      ? `${ThemeStyles.lightThemeMainBoxShadow}, rgba(0, 0, 0, 0.15) 0px 3px 2px 2px`
      : `${ThemeStyles.darkThemeMainBoxShadow}`};

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};

  &:hover {
    background-color: rgb(39, 106, 245, 0.05);
  }

  &:active {
    transform: translateY(2px);
    box-shadow: none;
  }
`;
