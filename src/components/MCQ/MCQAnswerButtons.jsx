import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import MCQbtn from "../Buttons/MCQbtn";
import MCQMathButton from "../Buttons/MCQMathButton";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import MathsMLfromString from "../../config/sanity/MathsMLfromString";
import "animate.css";
import { useDispatch, useSelector } from "react-redux";
import { updateQuestionsAttempted } from "../../features/CurrentBlockProgressData/currentblockprogressdata";

import {
  updateIndex0CorrectAnswerSelected,
  updateIndex0INCorrectAnswerSelected,
  updateIndex1CorrectAnswerSelected,
  updateindex1INCorrectAnswerSelected,
} from "../../features/MCQ/MCQslice";

const MCQAnswerButtons = ({ index, isCorrect, text, isAlgebra }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  let buttonstyle = {};
  let clickResponseText;
  let animateclass = "";
  let textstyle = {};
  let buttonDisabled = false;

  const dispatch = useDispatch();

  const index0valueSelectionisCorrect = useSelector(
    (state) => state.mcqslice.index0CorrectAnswerSelected
  );
  const index0valueSelectionisINCorrect = useSelector(
    (state) => state.mcqslice.index0INCorrectAnswerSelected
  );

  const index1valueSelectionisCorrect = useSelector(
    (state) => state.mcqslice.index1CorrectAnswerSelected
  );
  const index1valueSelectionisINCorrect = useSelector(
    (state) => state.mcqslice.index1INCorrectAnswerSelected
  );

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
  };

  const onPressed = () => {
    setButtonClicked((val) => !val);
    if (isCorrect && index === 0) {
      dispatch(updateIndex0CorrectAnswerSelected());
    } else if (isCorrect && index === 1) {
      dispatch(updateIndex1CorrectAnswerSelected());
    } else if (!isCorrect && index === 0) {
      dispatch(updateIndex0INCorrectAnswerSelected());
    } else if (!isCorrect && index === 1) {
      dispatch(updateindex1INCorrectAnswerSelected());
    }
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

  if (
    (!isCorrect &&
      index0valueSelectionisINCorrect &&
      index === 0 &&
      buttonClicked) ||
    (!isCorrect &&
      index1valueSelectionisINCorrect &&
      index === 1 &&
      buttonClicked)
  ) {
    animateclass = "animate__animated animate__wobble animate__fast";
  }

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true

  // index 1 contolling functions
  // show correct answer if incorrect answer is selected and display correct icon

  if (index0valueSelectionisINCorrect) {
    if (isCorrect && index === 0) {
      textstyle = correctfontstyle;
      buttonstyle = clickedButtonStyle;
      clickResponseText = <TiTickOutline style={{ currentColor: "white" }} />;
    }
  } else if (index1valueSelectionisINCorrect) {
    if (isCorrect && index === 1) {
      textstyle = correctfontstyle;
      buttonstyle = clickedButtonStyle;
      clickResponseText = <TiTickOutline style={{ currentColor: "white" }} />;
    }
  }

  // disable correct answer buttons af
  if (
    (index0valueSelectionisCorrect && index === 0) ||
    (index0valueSelectionisINCorrect && index === 0)
  ) {
    buttonDisabled = true;
  } else if (
    (index1valueSelectionisCorrect && index === 1) ||
    (index1valueSelectionisINCorrect && index === 1)
  ) {
    buttonDisabled = true;
  }

  const textContent = !isAlgebra ? (
    <Answer style={textstyle}>{text}</Answer>
  ) : (
    <MathsMLfromString data={text}></MathsMLfromString>
  );

  const btn = isAlgebra ? (
    <MCQMathButton
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
