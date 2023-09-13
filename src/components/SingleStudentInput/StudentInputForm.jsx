import React, { useState, useEffect, useContext } from "react";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import MainActionBtn from "../Buttons/MainActionBtn";
import { BiHelpCircle } from "react-icons/bi";
import ScoreTextInput from "../Data/CurrentQuestionScores/ScoreTextInput";
import { TextInputContext } from "./TextInputContext";
import "animate.css";

// sanity imports
import sanityClient from "../../createclient";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import HelpBtn from "../Buttons/HelpBtn";

import { display } from "@mui/system";

function StudentInputForm(props) {
  const [helpneeded, setHelpNeeded] = useState(false);
  const [spanStyle, setSpanStyle] = useState({
    position: "absolute",
    left: "0px",
    top: "0px",
    padding: "20px",
    fontSize: "12px",
    borderRadius: "5px",
    transition: "0.3s",
  });

  const index = props.index;

  const totalMarksAvailable = props.data.total_marks_available;

  //constants

  // context varibles

  const {
    setIndex0AnswerisCorrect,
    setIndex0AnswerisInCorrect,
    setIndex1AnswerisCorrect,
    setIndex1AnswerisInCorrect,
  } = useContext(TextInputContext);

  // user input state

  const [input, setInput] = useState("");
  const inputlength = input.length;
  const [selectedinputcolor, setSelectedInputColor] = useState("");
  const [textfieldlabel, setTextFieldLabel] = useState("What's your answer?");
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);
  const [animate, setAnimate] = useState("");

  // gather data from passed from from API fetched via get data component

  const correct_expected_answers_list =
    props.data.correct_expected_answers_list;

  const hint = props.data.hint;
  const question = props.data.question;
  const image = props.data.image;
  // pass in acceptable answers from props and check to see if user input matches

  const correct_expected_answers_listArr1 =
    correct_expected_answers_list.split(", ");

  const correct_expected_answers_listArr2 =
    correct_expected_answers_list.split(",");

  const correct_expected_answers_listArr =
    correct_expected_answers_listArr1.concat(correct_expected_answers_listArr2);

  console.log(correct_expected_answers_listArr);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation that user has provided an answer

    if (inputlength === 0) {
      setTextFieldLabel("Please enter an answer and submit :) ");
      setIsShowingFeedback(true);

      // pass in acceptable answers from props and check to see if user input matches and update state
    } else {
      const check_answer = correct_expected_answers_listArr.find(
        (element) => element === input
      );

      // update text field responses as state depending on correct answer being provided, text response provided and colors of box highlight correct or not

      if (check_answer === undefined && index === 0) {
        // set new context value for Score to update if incorrect
        setIndex0AnswerisInCorrect((val) => true);

        //

        setSelectedInputColor(colors.incorrectColor);
        setTextFieldLabel((val) => "Not right keep trying!");
        setAnimate("animate__animated animate__wobble animate__faster");
        setIsShowingFeedback((val) => true);
        setSpanStyle((val) => ({
          position: "absolute",
          left: "0px",
          top: "0px",
          transform: "translateX(10px) translateY(-7px)",
          fontSize: "10px",
          transition: "0.3s",
          padding: "5px",
          borderRadius: "5px",

          backgroundColor: colors.incorrectColor,
        }));
      } else if (check_answer && index === 0) {
        // set new context value for Score to update if Correct
        setIndex0AnswerisCorrect((val) => true);

        //

        setSelectedInputColor(colors.correctColor);
        setTextFieldLabel("Correct! Great work :) ");
        setAnimate("animate__animated  animate__bounce animate__faster");
        setIsShowingFeedback((val) => true);

        setSpanStyle((val) => ({
          position: "absolute",
          left: "0px",
          top: "0px",
          transform: "translateX(10px) translateY(-7px)",
          fontSize: "10px",
          transition: "0.3s",
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: colors.correctColor,
        }));
      } else if (check_answer === undefined && index === 1) {
        // set new context value for Score to update if incorrect
        setIndex1AnswerisInCorrect((val) => true);

        //

        setSelectedInputColor((val) => colors.incorrectColor);
        setTextFieldLabel((val) => "Not right keep trying!");
        setIsShowingFeedback((val) => true);
        setAnimate("animate__animated animate__wobble animate__faster");
        setSpanStyle((val) => ({
          position: "absolute",
          left: "0px",
          top: "0px",
          transform: "translateX(10px) translateY(-7px)",
          fontSize: "10px",
          transition: "0.3s",
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: colors.incorrectColor,
          // border: "none",
        }));
      } else if (check_answer && index === 1) {
        // set new context value for Score to update if Correct
        setIndex1AnswerisCorrect((val) => true);

        //

        setSelectedInputColor(colors.correctColor);
        setTextFieldLabel("Correct! Great work :) ");
        setAnimate("animate__animated  animate__bounce animate__faster");

        setIsShowingFeedback((val) => true);

        setSpanStyle((val) => ({
          position: "absolute",
          left: "0px",
          top: "0px",
          transform: "translateX(10px) translateY(-7px)",
          fontSize: "10px",
          transition: "0.3s",
          padding: "5px",
          borderRadius: "5px",
          backgroundColor: colors.correctColor,
        }));
      }
    }
  };

  // remove the feedback comments and input box colour as user types in input field

  const handleChange = (e) => {
    setInput(e.target.value);
    setIsShowingFeedback(false);
    setSpanStyle((val) => ({
      position: "absolute",
      left: "0px",
      top: "0px",
      transform: "translateX(10px) translateY(-7px)",
      fontSize: "10px",
      transition: "0.3s",
      padding: "5px",
      borderRadius: "5px",
      backgroundColor: colors.normalInputColor,
    }));
  };

  useEffect(() => {
    setSelectedInputColor(colors.normalInputColor);
    setTextFieldLabel("Whats your answer?");
  }, [input]);

  // functions to render text and image from image blocks from sanity

  // initiated Sanity url builder
  const builder = imageUrlBuilder(sanityClient);

  function imgurlFor(source) {
    return builder.image(source);
  }

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <div>
          {" "}
          <img
            src={imgurlFor(props.value.asset)}
            style={{ maxWidth: "300px" }}
            alt=""
          />
        </div>
      ),
    },
  };

  let hintstyle = {};

  const helpBtnClickHandler = () => {
    setHelpNeeded(!helpneeded);

    return false;
  };

  const hintstyleHidden = { display: "none" };

  const hintStyle = {
    display: "flex",
  };

  const handleFocusInput = () => {
    setSpanStyle((val) => ({
      position: "absolute",
      left: "0px",
      top: "0px",
      transform: "translateX(10px) translateY(-7px)",
      fontSize: "10px",
      transition: "0.2s",
      padding: "5px",
      borderRadius: "5px",
      backgroundColor: selectedinputcolor,
    }));
  };

  return (
    <Wrapper>
      <ScoreTextInput
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></ScoreTextInput>
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
          onClick={handleFocusInput}
          style={{
            position: "relative",
            backgroundColor: selectedinputcolor,
            borderRadius: "5px",
          }}
        >
          <input
            style={{
              height: "30px",
              width: "200px",
              padding: "10px",
              backgroundColor: selectedinputcolor,
              border: "3.5px solid rgb(0, 200, 200, 0.5)",
              borderRadius: "5px",
              display: "flex",
              position: "relative",
              outline: "none",
              fontSize: "14px",
              transition: "0.2s",
            }}
            required="required"
            type="text"
            label={textfieldlabel}
            onChange={handleChange}
          />

          <label style={spanStyle}>{textfieldlabel}</label>
        </div>

        <MainActionBtn
          style={{ backgroundColor: "rgb(00, 200, 200)", color: "white" }}
          type="submit"
        >
          {" "}
          Check
        </MainActionBtn>
      </form>
      {/* <Slide direction="left" in={isShowingFeedback} mountOnEnter unmountOnExit>
        <h3>{textfieldlabel}</h3>
      </Slide> */}
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
