import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Slide from "@mui/material/Slide";
import { colors } from "../../styles/colors";
import MainActionBtn from "../Buttons/MainActionBtn";
import { BiHelpCircle } from "react-icons/bi";
import Score from "../scores/Score";

// sanity imports
import sanityClient from "../../createclient";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import HelpBtn from "../Buttons/HelpBtn";

import { display } from "@mui/system";

function StudentInputForm(props) {
  const [helpneeded, setHelpNeeded] = useState(false);

  const data = props.data;

  //constants

  // user input state

  const [input, setInput] = useState("");
  const inputlength = input.length;
  const [isCorrect, setIsCorrect] = useState("");
  const [selectedinputcolor, setSelectedInputColor] = useState("");
  const [textfieldlabel, setTextFieldLabel] = useState("What's your answer?");
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  // gather data from passed from from API fetched via get data component

  const correct_expected_answers_list =
    props.data.correct_expected_answers_list;

  const hint = props.data.hint;
  const question = props.data.question;
  const image = props.data.image;
  // pass in acceptable answers from props and check to see if user input matches

  const correct_expected_answers_listArr =
    correct_expected_answers_list.split(", ");

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

      if (check_answer === undefined) {
        setIsCorrect(false);
        console.log("false");
        setSelectedInputColor(colors.incorrectColor);
        setTextFieldLabel("Not right keep trying!");
        setIsShowingFeedback(true);
      } else {
        setIsCorrect(true);
        console.log(true);
        setSelectedInputColor(colors.correctColor);
        setTextFieldLabel("Correct! Great work :) ");
        setIsShowingFeedback(true);
      }
    }
  };

  // remove the feedback comments and input box colour as user types in input field

  const handleChange = (e) => {
    setInput(e.target.value);
    setIsShowingFeedback(false);
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
          <img src={imgurlFor(props.value.asset)} alt="" />
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
  return (
    <Wrapper>
      <Score></Score>
      <Question>{question}</Question>
      <PortableText
        value={image}
        components={myPortableTextComponents}
      ></PortableText>

      <HelpBtn onClick={helpBtnClickHandler}></HelpBtn>

      <Hint style={helpneeded ? hintStyle : hintstyleHidden}>
        <BiHelpCircle style={{ width: "70px" }} />
        {hint}
      </Hint>
      <form onSubmit={handleSubmit}>
        <TextField
          // color="secondary"
          style={{}}
          sx={{ backgroundColor: selectedinputcolor }}
          onChange={handleChange}
          type="text"
          label={textfieldlabel}
        ></TextField>{" "}
        <MainActionBtn type="submit"> Check</MainActionBtn>
      </form>
      <Slide direction="left" in={isShowingFeedback} mountOnEnter unmountOnExit>
        <h3>{textfieldlabel}</h3>
      </Slide>
    </Wrapper>
  );
}

export default StudentInputForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

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
  background-color: rgb(128, 48, 192);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  color: black;
  width: 80%;
  max-width: 500px;
  background-color: rgba(0, 200, 200, 0.29);
  padding: 10px;
`;

const Question = styled.p`
  padding: 20px;
  margin: 40px;
  text-align: center;
`;
