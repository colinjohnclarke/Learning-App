import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import Slide from "@mui/material/Slide";

// sanity imports
import sanityClient from "../../createclient";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";

function StudentInputForm(props) {
  //constants

  const correct_answer_input_color = "rgba(137, 240, 158, 0.34)";
  const incorrect_answer_input_color = "rgba(240, 137, 137, 0.34)";
  const normal_input_color = "white";

  // user input state

  const [input, setInput] = useState("");
  const inputlength = input.length;

  const [isCorrect, setIsCorrect] = useState("");
  const [selectedinputcolor, setSelectedInputColor] = useState("");
  const [textfieldlabel, setTextFieldLabel] = useState("What's your answer?");
  const [isShowingFeedback, setIsShowingFeedback] = useState(false);

  // gather data from passed from from API fetched via get data component

  const getprops = props.data;
  const acceptable_answers = getprops.acceptable_answers;

  // pass in acceptable answers from props and check to see if user input matches

  const handleSubmit = (e, acceptable_answers) => {
    e.preventDefault();

    // validation that user has provided an answer

    if (inputlength === 0) {
      setTextFieldLabel("Please enter an answer and submit :) ");
      setIsShowingFeedback(true);

      // pass in acceptable answers from props and check to see if user input matches and update state
    } else {
      const check_answer = getprops.acceptable_answers.find(
        (element) => element === input
      );

      // update text field responses as state depending on correct answer being provided, text response provided and colors of box highlight correct or not

      if (check_answer === undefined) {
        setIsCorrect(false);
        console.log("false");
        setSelectedInputColor(incorrect_answer_input_color);
        setTextFieldLabel("Not right keep trying!");
        setIsShowingFeedback(true);
      } else {
        setIsCorrect(true);
        console.log(true);
        setSelectedInputColor(correct_answer_input_color);
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
    setSelectedInputColor(normal_input_color);
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
          <img src={imgurlFor(props.value.asset).width(400)} alt="hjshdjs" />
        </div>
      ),
    },
  };

  const getstudent_input_test_question_block =
    getprops.student_input_test_question_block;

  console.log("BLOCK TEXT: ", getstudent_input_test_question_block);

  return (
    <Wrapper>
      <h2>{getprops.student_input_test_question}</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          color="secondary"
          sx={{ backgroundColor: selectedinputcolor }}
          onChange={handleChange}
          type="text"
          label={textfieldlabel}
        ></TextField>
        <Button
          color="secondary"
          type="submit"
          sx={{ p: 1, m: 2 }}
          variant="contained"
        >
          Check
        </Button>
      </form>
      <Slide direction="left" in={isShowingFeedback} mountOnEnter unmountOnExit>
        <h3>{textfieldlabel}</h3>
      </Slide>

      <PortableText
        value={getstudent_input_test_question_block}
        components={myPortableTextComponents}
      ></PortableText>
    </Wrapper>
  );
}

export default StudentInputForm;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 90%;

  form {
    padding: 2%;
    margin: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
