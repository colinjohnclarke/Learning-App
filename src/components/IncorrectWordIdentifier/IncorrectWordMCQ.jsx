import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import MCQbtn from "../Buttons/MainActionBtn";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import "animate.css";

const IncorrectWordMCQ = (props) => {
  const [buttonSelected, setButtonSelected] = useState(false);
  const { setPointsScored, mcq1State, setMcq1State, mcq2State, setMcq2State } =
    props.updateStateFunctions;

  let buttonstyle = {
    width: "250px",
    border: "none",
  };

  let animateclass = "";
  let textstyle = {};
  let buttonDisabled = false;

  let showCorrectAnsStyle = {
    width: "250px",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    justifyContent: "space-between",
    color: "white",
    border: "none",
    backgroundColor: props.isCorrect
      ? colors.correctColor
      : colors.incorrectColor,
  };

  const correctfontstyle = {
    color: "white",
    fontWeight: "500",
  };

  const onPressed = () => {
    setButtonSelected((val) => true);

    if (props.isCorrect && props.mcq === "mcq1") {
      setPointsScored((val) => val + 1);
      setMcq1State((val) => ({
        correctAnswerSelected: true,
        incorrectAnswerSelected: false,
      }));
      buttonDisabled = true;
      textstyle = correctfontstyle;
    } else if (!props.isCorrect && props.mcq === "mcq1") {
      setMcq1State((val) => ({
        correctAnswerSelected: false,
        incorrectAnswerSelected: true,
      }));
      buttonDisabled = true;
    }

    if (props.isCorrect && props.mcq === "mcq2") {
      setPointsScored((val) => val + 1);
      setMcq2State((val) => ({
        correctAnswerSelected: true,
        incorrectAnswerSelected: false,
      }));
      textstyle = correctfontstyle;
      buttonDisabled = true;
    } else if (!props.isCorrect && props.mcq === "mcq2") {
      setMcq2State((val) => ({
        correctAnswerSelected: false,
        incorrectAnswerSelected: true,
      }));
      buttonDisabled = true;
    }
  };

  let icon;
  // if incorrect answer selected show correct answer
  if (
    props.isCorrect &&
    props.mcq === "mcq1" &&
    mcq1State.incorrectAnswerSelected
  ) {
    buttonstyle = showCorrectAnsStyle;
    icon = <TiTickOutline fill="white" />;
    buttonDisabled = true;
  } else if (
    props.isCorrect &&
    props.mcq === "mcq1" &&
    mcq1State.correctAnswerSelected
  ) {
    buttonstyle = showCorrectAnsStyle;
    icon = <TiTickOutline fill="white" />;
    buttonDisabled = true;
  }
  // if incorrect answer selected show incorrect style
  if (
    !props.isCorrect &&
    props.mcq === "mcq1" &&
    mcq1State.incorrectAnswerSelected &&
    buttonSelected
  ) {
    buttonstyle = showCorrectAnsStyle;
    icon = <RxCross2 fill="white" />;
    animateclass = "animate__animated animate__wobble animate__faster";
    buttonDisabled = true;
  }

  // mcq 2 state

  if (
    props.isCorrect &&
    props.mcq === "mcq2" &&
    mcq2State.incorrectAnswerSelected
  ) {
    buttonstyle = showCorrectAnsStyle;
    icon = <TiTickOutline fill="white" />;
    buttonDisabled = true;
  } else if (
    props.isCorrect &&
    props.mcq === "mcq2" &&
    mcq2State.correctAnswerSelected
  ) {
    buttonstyle = showCorrectAnsStyle;
    icon = <TiTickOutline fill="white" />;
    buttonDisabled = true;
  }
  // if incorrect answer selected show incorrect style
  if (
    !props.isCorrect &&
    props.mcq === "mcq2" &&
    mcq2State.incorrectAnswerSelected &&
    buttonSelected
  ) {
    buttonstyle = showCorrectAnsStyle;
    icon = <RxCross2 fill="white" />;
    animateclass = "animate__animated animate__wobble animate__faster";
    buttonDisabled = true;
  }

  return (
    <Wrapper>
      <MCQbtn
        disabled={buttonDisabled}
        className={animateclass}
        style={buttonstyle}
        onClick={onPressed}
      >
        <Box></Box>

        <Answer style={textstyle}>{props.text}</Answer>
        <ClickResponseText>{icon}</ClickResponseText>
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
