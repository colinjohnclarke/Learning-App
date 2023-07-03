import React, { useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { colors } from "../../styles/colors";
import MCQbtn from "../Buttons/MainActionBtn";
import { TiTickOutline } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const MCQAnswerButtons = (props) => {
  const [buttonstyle, setButtonStyle] = useState({});
  const [clickResponseText, setClickResponseText] = useState();

  const onPressed = () => {
    setButtonStyle({
      backgroundColor: props.iscorrect
        ? colors.correctColor
        : colors.incorrectColor,
    });
    setClickResponseText(props.iscorrect ? <TiTickOutline /> : <RxCross2 />);
  };

  return (
    <Wrapper>
      <MCQbtn
        style={buttonstyle}
        onClick={(props) => {
          onPressed();
        }}
      >
        <Text>
          <Answer>{props.text} </Answer>
          <ClickResponseText>{clickResponseText}</ClickResponseText>
        </Text>
      </MCQbtn>
    </Wrapper>
  );
};

export default MCQAnswerButtons;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ClickResponseText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const Answer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;
const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
