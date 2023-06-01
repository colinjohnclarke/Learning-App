import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

const MCQAnswerButtons = (props) => {
  const [buttonstyle, setButtonStyle] = useState({});
  const [clickResponseText, setClickResponseText] = useState();

  const correct_answer_input_color = "rgba(137, 240, 158, 0.34)";
  const incorrect_answer_input_color = "rgba(240, 137, 137, 0.34)";
  const normal_input_color = "white";

  const onPressed = () => {
    setButtonStyle({
      backgroundColor: props.iscorrect
        ? correct_answer_input_color
        : incorrect_answer_input_color,
    });
    setClickResponseText(props.iscorrect ? "Well done! Correct" : "Incorrect!");
  };

  return (
    <Wrapper>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          width: 300,
          // color: "black",
        }}
        size="large"
        style={buttonstyle}
        onClick={(props) => {
          onPressed();
          console.log(` question index : ${props.index}, "clicked" `);
        }}
      >
        {props.text}
      </Button>
      <ClickResponseText>{clickResponseText}</ClickResponseText>
    </Wrapper>
  );
};

export default MCQAnswerButtons;

const Wrapper = styled.div`
  // text-align: center;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // margin: 5px;
`;

const ClickResponseText = styled.p``;
