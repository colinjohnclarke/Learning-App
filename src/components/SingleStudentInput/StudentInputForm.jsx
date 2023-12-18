import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import MainActionBtn from "../Buttons/MainActionBtn";
import { BiHelpCircle } from "react-icons/bi";
import Score from "../Data/CurrentQuestionScores/Score";

import { myPortableTextComponents } from "../../config/sanity/portableText";
import "animate.css";
import { device } from "../../styles/breakpoints";

// sanity imports
import sanityClient from "../../createclient";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import HelpBtn from "../Buttons/HelpBtn";

function StudentInputForm({ updateStateFunctions, data, index }) {
  const [helpneeded, setHelpNeeded] = useState(false);
  // user input state
  const [input, setInput] = useState("");
  const [inputfocused, setInputFocused] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const totalMarksAvailable = data.total_marks_available;

  //constants

  const {
    correctAnswerIsSelected,
    setCorrectAnswerIsSelected,
    incorrectAnswerIsSelected,
    setIncorrectAnswerIsSelected,
  } = updateStateFunctions;

  const inputlength = input.length;
  let selectedInputColor;
  let textfieldLabel = "What's your answer?";
  let animate = "";
  let animateIncorrect = "animate__animated animate__wobble animate__faster";
  let animateCorrect = "animate__animated  animate__bounce animate__faster";

  const spanStyleCorrect = {
    position: "absolute",
    left: "0px",
    top: "0px",
    transform: "translateX(10px) translateY(-7px)",
    fontSize: "10px",
    transition: "0.3s",
    padding: "5px",
    borderRadius: "5px",
    backgroundColor: colors.correctColor,
    color: "white",
  };

  const spanStyleIncorrect = {
    position: "absolute",
    left: "0px",
    top: "0px",
    transform: "translateX(10px) translateY(-7px)",
    fontSize: "10px",
    transition: "0.3s",
    padding: "5px",
    borderRadius: "5px",
    backgroundColor: colors.incorrectColor,
    color: "white",
  };

  const spanStyleNormal = {
    position: "absolute",
    left: "0px",
    top: "0px",
    transform: "translateX(10px) translateY(-7px)",
    fontSize: "10px",
    transition: "0.3s",
    padding: "5px",
    borderRadius: "5px",
    backgroundColor: "white",
  };

  const spanStyleNormalUnFocused = {
    position: "absolute",
    left: "0px",
    top: "0px",
    padding: "20px",
    fontSize: "12px",
    borderRadius: "5px",
    transition: "0.3s",
  };

  let spanStyle = spanStyleNormalUnFocused;

  // gather data from passed from from API fetched via get data component

  const correct_expected_answers_list = data.correct_expected_answers_list;

  const hint = data.hint;
  const question = data.question;
  const image = data.image;
  // pass in acceptable answers from props and check to see if user input matches

  const correct_expected_answers_listArr1 =
    correct_expected_answers_list.split(", ");

  const correct_expected_answers_listArr2 =
    correct_expected_answers_list.split(",");

  const correct_expected_answers_listArr =
    correct_expected_answers_listArr1.concat(correct_expected_answers_listArr2);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswerSubmitted((val) => true);

    // validation that user has provided an answer

    if (inputlength === 0) {
      textfieldLabel = "Please enter an answer and submit :) ";

      // pass in acceptable answers from props and check to see if user input matches and update state
    } else {
      const check_answer = correct_expected_answers_listArr.find(
        (element) => element === input
      );

      // update text field responses as state depending on correct answer being provided, text response provided and colors of box highlight correct or not

      if (check_answer === undefined) {
        // set new context value for Score to update if incorrect
        setIncorrectAnswerIsSelected((val) => true);
      } else if (check_answer && index === 0) {
        // set new context value for Score to update if Correct
        setCorrectAnswerIsSelected((val) => true);
      }
    }
  };

  if (correctAnswerIsSelected) {
    selectedInputColor = colors.correctColor;
    textfieldLabel = "Correct! Great work :) ";
    animate = animateCorrect;
    spanStyle = spanStyleCorrect;
  } else if (incorrectAnswerIsSelected) {
    selectedInputColor = colors.incorrectColor;
    textfieldLabel = "Not right keep trying!";
    animate = animateIncorrect;
    spanStyle = spanStyleIncorrect;
  }

  // remove the feedback comments and input box colour as user types in input field

  const handleChange = (e) => {
    setInput(e.target.value);
    setAnswerSubmitted((val) => false);

    const check_answer = correct_expected_answers_listArr.find(
      (element) => element === input
    );

    if (check_answer === undefined) {
      spanStyle = spanStyleNormal;
      selectedInputColor = colors.normalInputColor;
      textfieldLabel = "Whats your answer?";
    }
  };

  const helpBtnClickHandler = () => {
    setHelpNeeded(!helpneeded);

    return false;
  };

  const hintstyleHidden = { display: "none" };

  const hintStyle = {
    display: "flex",
  };

  const handleFocusInput = () => {
    setInputFocused((val) => true);
  };

  if (inputfocused && !answerSubmitted) {
    spanStyle = spanStyleNormal;
    selectedInputColor = colors.normalInputColor;
  }

  return (
    <Wrapper>
      <Score
        scoreData={{ correctAnswerIsSelected }}
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></Score>
      <Question>{question}</Question>

      <PortableText
        value={image}
        components={myPortableTextComponents}
      ></PortableText>

      <HelpBtn
        style={helpneeded ? { display: "none" } : { display: "flex" }}
        onClick={helpBtnClickHandler}
      ></HelpBtn>

      <Hint
        style={helpneeded ? hintStyle : hintstyleHidden}
        className={
          helpneeded
            ? "animate__animated animate__backInRight animate__fast"
            : ""
        }
      >
        <BiHelpCircle style={{ width: "70px" }} />
        {hint}
      </Hint>
      <form style={{ fontFamily: "Montserrat" }} onSubmit={handleSubmit}>
        <div
          className={animate}
          onClick={() => {
            handleFocusInput();
          }}
          style={{
            position: "relative",
            backgroundColor: selectedInputColor,
            borderRadius: "5px",
          }}
        >
          <input
            style={{
              height: "30px",
              width: "200px",
              padding: "10px",
              backgroundColor: selectedInputColor,
              border: "3.5px solid rgb(0, 240, 240, 0.5)",
              borderRadius: "5px",
              display: "flex",
              position: "relative",
              outline: "none",
              fontSize: "14px",
              transition: "0.2s",
            }}
            required="required"
            type="text"
            label={textfieldLabel}
            onChange={handleChange}
          />

          <label style={spanStyle}>{textfieldLabel}</label>
        </div>

        <MainActionBtn
          style={{ backgroundColor: "rgb(00, 240, 240)", color: "white" }}
          type="submit"
        >
          {" "}
          Check
        </MainActionBtn>
      </form>
    </Wrapper>
  );
}

export default StudentInputForm;

const Wrapper = styled.div`
  border-top: 0.5px solid lightblue;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;

  @media ${device.mobileL} {
    height: 100%;
  }

  form {
    padding: 2%;
    margin: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Hint = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  width: 80%;
  max-width: 700px;
  border: 2px solid rgba(0, 200, 200, 1);
  color: rgba(0, 200, 200, 1);
  padding: 10px;
`;

const Question = styled.p`
  padding-top: 40px;
  padding: 30px;
  text-align: center;
  font-weight: 400;
`;

const Image = styled.div`
  max-width: 200px;
`;
