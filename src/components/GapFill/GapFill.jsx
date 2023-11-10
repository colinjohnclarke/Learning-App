import React, { useState } from "react";
import styled from "styled-components";
import { correctstyle } from "../../styles/colors";
import HelpBtn from "../Buttons/HelpBtn";
import Score from "../../components/Data/CurrentQuestionScores/Score";
import "animate.css";
import { myPortableTextComponents } from "../../config/sanity/portableText";
import { PortableText } from "@portabletext/react";
import { BiHelpCircle } from "react-icons/bi";

function GapFill(props) {
  const { item, index } = props;
  const { acceptable_missing_words, hint, total_marks_available } = item;

  const [inputFieldGapFill, setInputFieldGapFill] = useState("");
  const [helpNeeded, setHelpNeeded] = useState(false);

  const acceptableMissingWordsArr = acceptable_missing_words.split(", ");
  const isCorrect = acceptableMissingWordsArr.includes(inputFieldGapFill);

  const toggleHelp = () => {
    setHelpNeeded(!helpNeeded);
  };

  const hintAnimateClass = helpNeeded
    ? "animate__animated animate__bounceInLeft"
    : "";

  return (
    <Wrapper>
      <Score
        scoreData={{
          index0AnswerisCorrect: isCorrect,
          index1AnswerisCorrect: isCorrect,
        }}
        totalMarksAvailable={total_marks_available}
        index={index}
      />
      <Question> Fill in the gaps below!</Question>
      <Image>
        <PortableText
          value={item.picture}
          components={myPortableTextComponents}
        />
      </Image>

      <Text>
        {item.initial_scentence}
        <Input
          style={{
            backgroundColor: isCorrect ? correctstyle.backgroundColor : "",
          }}
          className={
            isCorrect ? "animate__animated animate__bounce animate__faster" : ""
          }
          type="text"
          onChange={(e) => setInputFieldGapFill(e.target.value)}
        />
        {item.remainder}
      </Text>
      <Hint
        className={hintAnimateClass}
        style={helpNeeded ? {} : { display: "none" }}
      >
        <BiHelpCircle style={{ width: "70px" }} />
        {hint}
      </Hint>
      <HelpBtn
        style={helpNeeded ? { display: "none" } : { display: "flex" }}
        onClick={toggleHelp}
      />
    </Wrapper>
  );
}

export default GapFill;

const Wrapper = styled.div`
  border-top: 0.5px solid lightblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 40px;
  width: 100%;
`;

const Hint = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background-color: rgb(128, 48, 192);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  color: black;
  width: 90%;
  background-color: rgba(0, 200, 200, 0.29);
  padding: 10px;
`;

const Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  transition: 0.5s;
  border-radius: none;
  text-align: center;
  border-radius: 0px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid;
  margin-left: 3px;
  margin-right: 3px;
  height: 20px;
  min-width: 40px;
  max-width: 80px;
  background-color: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid;
  }
`;
const Text = styled.p`
  line-height: 25px;
  position: relative;
  font-size: 15px;
  margin: 10px;
  // padding: 10px;

  z-index: 0;
  // padding: 2%, 3%, 2%, 3%;
`;

const Question = styled.p`
  font-weight: 400;
`;
