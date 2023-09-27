import React, { useEffect, useState, useContext } from "react";
import { IncorrectWordContext } from "./IncorrectWordContext";
import styled from "styled-components";

import { colors } from "../../styles/colors";
import MCQbtn from "../Buttons/MainActionBtn";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import "animate.css";

const IncorrectWordMCQ = (props) => {
  let buttonstyle = {
    width: "250px",
    border: "none",
  };

  let clickResponseText;
  let animateclass = "";
  let textstyle = {};

  // const [correctbuttondisabled, setCorrectButtonDisabled] = useState(false);

  // let correctbuttondisabled = false;
  // const [correctbuttondisabled, setButtonDisabled] = useState(false);

  let correctbuttondisabled = false;

  const [buttonClicked, setButtonClicked] = useState(false);

  // const [correctanswerSelected, setCorrectAnswerSelcted] = useState(false);

  const {
    setindex0MCQ1SelectionCorrect,
    index0mcq1selectionIncorrect,
    index0setMCQ1SelectionInCorrect,
    setindex0MCQ2SelectionCorrect,
    index0mcq2selectionIncorrect,
    setindex0MCQ2SelectionInCorrect,
  } = useContext(IncorrectWordContext);

  // get props
  const index = props.index;
  const itemisCorrect = props.isCorrect;
  const mcq = props.mcq;

  // setindex0Word2SelectionCorrect,
  // index0mcq2selectioncorrect,

  let showcorrectAns = {
    width: "250px",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    color: "white",
    border: "none",
    backgroundColor: colors.correctColor,
  };

  const correctfontstyle = {
    color: "white",
    fontWeight: "500",
  };

  const onPressed = () => {
    setButtonClicked((val) => true);
  };

  if (buttonClicked) {
    if (itemisCorrect && index === 0 && mcq === "mcq1") {
      setindex0MCQ1SelectionCorrect((val) => true);
      textstyle = correctfontstyle;
    } else if (!itemisCorrect && index === 0 && mcq === "mcq1") {
      index0setMCQ1SelectionInCorrect((prevVal) => true);
    } else if (itemisCorrect && index === 0 && mcq === "mcq2") {
      setindex0MCQ2SelectionCorrect((val) => true);
      textstyle = correctfontstyle;
    } else if (!itemisCorrect && index === 0 && mcq === "mcq2") {
      setindex0MCQ2SelectionInCorrect((prevVal) => true);
    }

    buttonstyle = {
      border: "none",
      width: "250px",
      display: "flex",
      flexDirection: "row",
      position: "relative",
      justifyContent: "space-between",
      backgroundColor: itemisCorrect
        ? colors.correctColor
        : colors.incorrectColor,
    };

    clickResponseText = itemisCorrect ? (
      <TiTickOutline style={{ currentColor: "white" }} />
    ) : (
      <RxCross2 />
    );
  }

  // MCQ Question 1

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true

  if (
    itemisCorrect &&
    index0mcq1selectionIncorrect &&
    index === 0 &&
    mcq === "mcq1"
  ) {
    buttonstyle = showcorrectAns;
    clickResponseText = itemisCorrect ? <TiTickOutline /> : "";
    textstyle = correctfontstyle;
    correctbuttondisabled = true;

    // disable correct buttons when selection is made
  }

  if (
    itemisCorrect &&
    index0mcq2selectionIncorrect &&
    index === 0 &&
    mcq === "mcq2"
  ) {
    buttonstyle = showcorrectAns;
    clickResponseText = itemisCorrect ? <TiTickOutline /> : "";
    textstyle = correctfontstyle;
    correctbuttondisabled = true;

    // disable correct buttons when selection is made
  }

  // index 0 contolling functions

  if (
    !itemisCorrect &&
    index0mcq1selectionIncorrect &&
    index === 0 &&
    buttonClicked
  ) {
    animateclass = "animate__animated animate__wobble animate__faster";
    correctbuttondisabled = true;
  } else if (
    !itemisCorrect &&
    index0mcq2selectionIncorrect &&
    index === 0 &&
    buttonClicked
  ) {
    animateclass = "animate__animated animate__wobble animate__faster";
    correctbuttondisabled = true;
  }

  // disable correct buttons when selection is made

  // MCQ Question 2

  return (
    <Wrapper>
      <MCQbtn
        disabled={correctbuttondisabled}
        className={animateclass}
        style={buttonstyle}
        onClick={onPressed}
      >
        <Box></Box>

        <Answer style={textstyle}>{props.text}</Answer>
        <ClickResponseText>{clickResponseText}</ClickResponseText>
      </MCQbtn>
    </Wrapper>
  );
};

export default IncorrectWordMCQ;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  width: 10px;
`;
const ClickResponseText = styled.div`
  // position: absolute;
`;

const Answer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 4px;
`;
