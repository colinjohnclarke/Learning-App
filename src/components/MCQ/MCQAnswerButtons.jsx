import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { colors } from "../../styles/colors";
import MCQbtn from "../Buttons/MainActionBtn";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import "animate.css";
import { MCQcontext } from "./MCQContext";

const MCQAnswerButtons = (props) => {
  const [buttonstyle, setButtonStyle] = useState({});
  const [clickResponseText, setClickResponseText] = useState();
  const [animateIndex0, setAnimateIncorrectAnswerIndex0] = useState(false);
  const [animateIndex1, setAnimateIncorrectAnswerIndex1] = useState(false);
  const [animateclass, setAnimateClass] = useState("");
  const [textstyle, setTextStyle] = useState({});
  const [correctbuttondisabled, setCorrectButtonDisabled] = useState(false);

  const [buttonClicked, setButtonClicked] = useState(false);
  // const [correctanswerSelected, setCorrectAnswerSelcted] = useState(false);

  const {
    index0ItemClickedisCorrect,
    setindex0ItemClickedIsCorrect,
    index1ItemClickedisCorrect,
    setindex1ItemClickedIsCorrect,
    index0ItemClickedisInCorrect,
    setIndex0ItemSelectionIsInCorrect,
    index1ItemClickedisInCorrect,
    setIndex1ItemSelectionIsInCorrect,
  } = useContext(MCQcontext);

  // get props
  const index = props.index;
  const itemisCorrect = props.isCorrect;

  const onPressed = () => {
    setButtonClicked((val) => !val);
    if (itemisCorrect && index === 0) {
      setindex0ItemClickedIsCorrect((val) => true);
    } else if (itemisCorrect && index === 1) {
      setindex1ItemClickedIsCorrect((val) => true);
    } else if (!itemisCorrect && index === 0) {
      setIndex0ItemSelectionIsInCorrect((prevVal) => true);
      console.log("index 0 clicked");
    } else if (!itemisCorrect && index === 1) {
      setIndex1ItemSelectionIsInCorrect((prevVal) => true);
      console.log("index 1 clicked");
    }

    setButtonStyle({
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
    display: "flex",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    color: "white",
    backgroundColor: colors.correctColor,
  };

  const correctfontstyle = {
    color: "white",
    fontWeight: "500",
  };

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true
  let index0correctansweselected = false;
  if (itemisCorrect && index0ItemClickedisInCorrect && index === 0) {
    index0correctansweselected = true;
  }

  // index 0 contolling functions

  useEffect(() => {
    if (index0correctansweselected) {
      setButtonStyle((val) => showcorrectAns);
      setClickResponseText(itemisCorrect ? <TiTickOutline /> : "");
      setTextStyle((val) => correctfontstyle);
    }
  }, [index0correctansweselected]);

  // if incorrect answer clicked for index 0 and animate incorrect
  useEffect(() => {
    if (!itemisCorrect && buttonClicked && index === 0) {
      setAnimateIncorrectAnswerIndex0((val) => true);
    }
  }, [index0correctansweselected]);

  useEffect(() => {
    if (!itemisCorrect && index0ItemClickedisInCorrect && index === 0) {
      setAnimateClass(
        (val) => "animate__animated animate__wobble animate__faster"
      );
    }
  }, [buttonClicked]);

  // Identify the correct answers if the incorrect answer was selected and reveal to user
  // condense variables to a boolean if true
  let index1correctansweselected = false;

  if (itemisCorrect && index1ItemClickedisInCorrect && index === 1) {
    index1correctansweselected = true;
  }

  // index 1 contolling functions
  // show correct answer if incorrect answer is selected and display correct icon
  useEffect(() => {
    if (index1correctansweselected) {
      setButtonStyle((val) => showcorrectAns);
      setClickResponseText(
        itemisCorrect ? <TiTickOutline style={{ color: "white" }} /> : ""
      );
      setTextStyle((val) => correctfontstyle);
    }
  }, [index1ItemClickedisInCorrect]);

  // if incorrect answer clicked for index 0 and animate incorrect
  useEffect(() => {
    if (!itemisCorrect && buttonClicked && index === 1) {
      setAnimateIncorrectAnswerIndex1((val) => true);
    }
  }, [index1ItemClickedisInCorrect]);

  useEffect(() => {
    if (!itemisCorrect && index1ItemClickedisInCorrect && index === 1) {
      setAnimateClass(
        (val) => "animate__animated animate__wobble animate__faster"
      );
    }
  }, [buttonClicked]);

  // disable correct buttons when selection is made
  useEffect(() => {
    if (index === 0) setCorrectButtonDisabled((val) => !val);
  }, [index0ItemClickedisInCorrect, index0ItemClickedisInCorrect]);

  // disable correct buttons when selection is made
  useEffect(() => {
    if (index === 1) setCorrectButtonDisabled((val) => !val);
  }, [index1ItemClickedisInCorrect, index1ItemClickedisInCorrect]);

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

export default MCQAnswerButtons;

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
  padding: 4px;
`;
