import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { colors } from "../../styles/colors";

const MCQAnswerButtons = (props) => {
  const [buttonstyle, setButtonStyle] = useState({});
  const [clickResponseText, setClickResponseText] = useState();

  const onPressed = () => {
    setButtonStyle({
      backgroundColor: props.iscorrect
        ? colors.correctColor
        : colors.incorrectColor,
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

const Wrapper = styled.div``;

const ClickResponseText = styled.p``;
