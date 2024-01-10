import React, { useState, useContext } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import MCQbtn from "../Buttons/MCQbtn";
import MCQMathButton from "../Buttons/MCQMathButton";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import MathsMLfromString from "../../config/sanity/MathsMLfromString";
import "animate.css";
import { UserContext } from "../../App";

const MCQAnswerButtons = ({
  index,
  isCorrect,
  text,
  isAlgebra,
  updateStateFunctions,
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const { darkThemeActive } = useContext(UserContext);

  const {
    correctAnswerIsSelected,
    setCorrectAnswerIsSelected,
    incorrectAnswerIsSelected,
    setIncorrectAnswerIsSelected,
  } = updateStateFunctions;

  let buttonstyle = {};
  let clickResponseText;
  let animateclass = "";
  let textstyle = {};
  let buttonDisabled = false;

  const correctfontstyle = {
    color: "white",
    fontWeight: "500",
  };

  const clickedButtonStyle = {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    // justifyContent: "space-around",
    border: "none",
    backgroundColor: isCorrect ? colors.correctColor : colors.incorrectColor,
    boxShadow: "0px 0px 30px 4px rgba(174, 196, 216, 0.15)",
  };

  const onPressed = () => {
    setButtonClicked((val) => !val);

    if (isCorrect) {
      setCorrectAnswerIsSelected((val) => true);
    }
    setIncorrectAnswerIsSelected((val) => true);
  };

  if (buttonClicked) {
    textstyle = correctfontstyle;
    buttonstyle = clickedButtonStyle;
    clickResponseText = isCorrect ? (
      <TiTickOutline style={{ currentColor: "white" }} />
    ) : (
      <RxCross2 />
    );
  }

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true

  if (!isCorrect && incorrectAnswerIsSelected && buttonClicked) {
    animateclass = "animate__animated animate__headShake animate__faster";
  }

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true

  // index 1 contolling functions
  // show correct answer if incorrect answer is selected and display correct icon

  if (isCorrect && incorrectAnswerIsSelected) {
    textstyle = correctfontstyle;
    buttonstyle = clickedButtonStyle;
    clickResponseText = <TiTickOutline style={{ currentColor: "white" }} />;
  }

  // disable correct answer buttons af
  if (correctAnswerIsSelected || incorrectAnswerIsSelected) {
    buttonDisabled = true;
  }

  const textContent = !isAlgebra ? (
    <Answer style={textstyle}>{text}</Answer>
  ) : (
    <MathsMLfromString data={text}></MathsMLfromString>
  );

  const btn = isAlgebra ? (
    <MCQMathButton
      darkThemeActive={darkThemeActive}
      disabled={buttonDisabled}
      className={animateclass}
      style={buttonstyle}
      onClick={onPressed}
    >
      {" "}
      <Box> </Box>
      {textContent}
      <Box> </Box>
      <ClickResponseText>{clickResponseText}</ClickResponseText>
    </MCQMathButton>
  ) : (
    <MCQbtn
      darkThemeActive={darkThemeActive}
      disabled={buttonDisabled}
      className={animateclass}
      style={buttonstyle}
      onClick={onPressed}
    >
      <Box> </Box>
      {textContent}
      <Box></Box>
      <ClickResponseText>{clickResponseText}</ClickResponseText>
    </MCQbtn>
  );

  return <Wrapper>{btn}</Wrapper>;
};

export default MCQAnswerButtons;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`;

const Box = styled.div`
  width: 40px;
`;
const ClickResponseText = styled.div``;

const Answer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;
