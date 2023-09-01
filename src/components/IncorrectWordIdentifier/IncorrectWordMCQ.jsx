import React, { useEffect, useState, useContext } from "react";
import { IncorrectWordContext } from "./IncorrectWordContext";
import styled from "styled-components";

import { colors } from "../../styles/colors";
import MCQbtn from "../Buttons/MainActionBtn";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import "animate.css";

const IncorrectWordMCQ = (props) => {
  const [buttonstyle, setButtonStyle] = useState({
    width: "250px",
    border: "none",
  });
  const [clickResponseText, setClickResponseText] = useState();
  const [animateIndex0, setAnimateIncorrectAnswerIndex0] = useState(false);
  const [animateIndex1, setAnimateIncorrectAnswerIndex1] = useState(false);
  const [animateclass, setAnimateClass] = useState("");
  const [textstyle, setTextStyle] = useState({});
  const [correctbuttondisabled, setCorrectButtonDisabled] = useState(false);

  const [buttonClicked, setButtonClicked] = useState(false);
  // const [correctanswerSelected, setCorrectAnswerSelcted] = useState(false);

  const {
    index0word1selectioncorrect,
    setindex0Word1SelectionCorrect,

    index0mcq1selectioncorrect,
    setindex0MCQ1SelectionCorrect,
    index0mcq1selectionIncorrect,
    index0setMCQ1SelectionInCorrect,
    index0word2selectioncorrect,
    setindex0Word2SelectionCorrect,
    index0mcq2selectioncorrect,
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

  const onPressed = () => {
    setButtonClicked((val) => !val);

    if (itemisCorrect && index === 0 && mcq === "mcq1") {
      setindex0MCQ1SelectionCorrect((val) => true);
      setTextStyle((val) => correctfontstyle);
    } else if (!itemisCorrect && index === 0 && mcq === "mcq1") {
      index0setMCQ1SelectionInCorrect((prevVal) => true);
    } else if (itemisCorrect && index === 0 && mcq === "mcq2") {
      setindex0MCQ2SelectionCorrect((val) => true);
      setTextStyle((val) => correctfontstyle);
    } else if (!itemisCorrect && index === 0 && mcq === "mcq2") {
      setindex0MCQ2SelectionInCorrect((prevVal) => true);
    }

    setButtonStyle({
      border: "none",
      width: "250px",
      display: "flex",
      flexDirection: "row",
      position: "relative",
      justifyContent: "space-between",
      backgroundColor: itemisCorrect
        ? colors.correctColor
        : colors.incorrectColor,
    });
    setClickResponseText(
      itemisCorrect ? (
        <TiTickOutline style={{ currentColor: "white" }} />
      ) : (
        <RxCross2 />
      )
    );
  };

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

  // MCQ Question 1

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true
  let index0MCQ1correctansweselected = false;

  if (
    itemisCorrect &&
    index0mcq1selectionIncorrect &&
    index === 0 &&
    mcq === "mcq1"
  ) {
    index0MCQ1correctansweselected = true;
  }

  // index 0 contolling functions

  useEffect(() => {
    if (index0MCQ1correctansweselected) {
      setButtonStyle((val) => showcorrectAns);
      setClickResponseText(itemisCorrect ? <TiTickOutline /> : "");
      setTextStyle((val) => correctfontstyle);
    }
  }, [index0MCQ1correctansweselected]);

  // if incorrect answer clicked for index 0 and animate incorrect
  useEffect(() => {
    if (!itemisCorrect && buttonClicked && index === 0) {
      setAnimateIncorrectAnswerIndex0((val) => true);
    }
  }, [index0MCQ1correctansweselected]);

  useEffect(() => {
    if (!itemisCorrect && index0mcq1selectionIncorrect && index === 0) {
      setAnimateClass(
        (val) => "animate__animated animate__wobble animate__faster"
      );
    }
  }, [buttonClicked]);

  // disable correct buttons when selection is made
  useEffect(() => {
    if (index0MCQ1correctansweselected) setCorrectButtonDisabled((val) => !val);
  }, [index0MCQ1correctansweselected, index0setMCQ1SelectionInCorrect]);

  // MCQ Question 2

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true
  let index0MCQ2correctansweselected = false;

  if (
    itemisCorrect &&
    index0mcq2selectionIncorrect &&
    index === 0 &&
    mcq === "mcq2"
  ) {
    index0MCQ2correctansweselected = true;
  }

  // index 0 contolling functions

  useEffect(() => {
    if (index0MCQ2correctansweselected && mcq === "mcq2") {
      setButtonStyle((val) => showcorrectAns);
      setClickResponseText(itemisCorrect ? <TiTickOutline /> : "");
      setTextStyle((val) => correctfontstyle);
    }
  }, [index0MCQ2correctansweselected]);

  // if incorrect answer clicked for index 0 and animate incorrect
  useEffect(() => {
    if (!itemisCorrect && buttonClicked && index === 0) {
      setAnimateIncorrectAnswerIndex0((val) => true);
    }
  }, [index0MCQ2correctansweselected]);

  useEffect(() => {
    if (!itemisCorrect && index0mcq2selectionIncorrect && index === 0) {
      setAnimateClass(
        (val) => "animate__animated animate__wobble animate__faster"
      );
    }
  }, [buttonClicked]);

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true
  //   let index1correctansweselected = false;

  //   if (itemisCorrect && index1ItemClickedisInCorrect && index === 1) {
  //     index1correctansweselected = true;
  //   }

  //   // index 1 contolling functions
  //   // show correct answer if incorrect answer is selected and display correct icon
  //   useEffect(() => {
  //     if (index1correctansweselected) {
  //       setButtonStyle((val) => showcorrectAns);
  //       setClickResponseText(
  //         itemisCorrect ? <TiTickOutline style={{ color: "white" }} /> : ""
  //       );
  //       setTextStyle((val) => correctfontstyle);
  //     }
  //   }, [index1ItemClickedisInCorrect]);

  //   // if incorrect answer clicked for index 0 and animate incorrect
  //   useEffect(() => {
  //     if (!itemisCorrect && buttonClicked && index === 1) {
  //       setAnimateIncorrectAnswerIndex1((val) => true);
  //     }
  //   }, [index1ItemClickedisInCorrect]);

  //   useEffect(() => {
  //     if (!itemisCorrect && index1ItemClickedisInCorrect && index === 1) {
  //       setAnimateClass(
  //         (val) => "animate__animated animate__wobble animate__faster"
  //       );
  //     }
  //   }, [buttonClicked]);

  // disable correct buttons when selection is made
  //   useEffect(() => {
  //     if (index === 1) setCorrectButtonDisabled((val) => !val);
  //   }, [index1ItemClickedisInCorrect, index1ItemClickedisInCorrect]);

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
