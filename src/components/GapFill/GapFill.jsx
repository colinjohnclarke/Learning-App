import React, { useState, useContext } from "react";
import { GapFillContext } from "./GapFillContext";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import { correctstyle } from "../../styles/colors";
import HelpBtn from "../Buttons/HelpBtn";
import ScoreGapFill from "../../components/Data/CurrentQuestionScores/ScoreGapFill";
import "animate.css";
import { myPortableTextComponents } from "../../config/sanity/portableText";
import { BiHelpCircle } from "react-icons/bi";

function GapFill(props) {
  const item = props.item;
  const index = props.index;
  const acceptable_missing_words = props.item.acceptable_missing_words;
  const helphints = props.item.hint;
  const totalMarksAvailable = props.item.total_marks_available;

  const [inputfieldgapfill, setInputFieldGapFill1] = useState("");
  const [helpneeded, setHelpNeeded] = useState(false);
  let isCorrect = false;
  const { setindex0AnswerisCorrect, setindex1AnswerisCorrect } =
    useContext(GapFillContext);

  const acceptable_missing_words_Arr = acceptable_missing_words.split(", ");
  let compareAnswer;

  compareAnswer = acceptable_missing_words_Arr.find(
    (answer) => answer === inputfieldgapfill
  );

  if (compareAnswer === undefined && index === 0) {
    isCorrect = false;
  } else if (compareAnswer !== undefined && index === 0) {
    isCorrect = true;
    setindex0AnswerisCorrect((val) => true);
  } else if (compareAnswer === undefined && index === 1) {
    isCorrect = false;
  } else if (compareAnswer !== undefined && index === 1) {
    isCorrect = true;
    setindex1AnswerisCorrect((val) => true);
  }

  const submithandler = (e) => {
    e.preventDefault();
    setInputFieldGapFill1(e.target.value);
  };

  let style;

  if (isCorrect) {
    style = {
      backgroundColor: correctstyle.backgroundColor,
      color: correctstyle.color,
    };
  }

  let hintstyle = {};

  const helpBtnClickHandler = () => {
    setHelpNeeded(!helpneeded);
  };

  const test = {
    boxShadow:
      "0 0 0 1px #6698cb inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgba(240, 137, 137, 0.34), 0 8px 0 1px rgba(220, 137, 137, 0.56),0 8px 8px 1px rgba(0,0,0,0.5)",
    backgroundColor: "rgba(240, 137, 137, 0.34)",
    display: "flex",
  };

  let hintAnimateClass = "";

  hintstyle = { display: "none" };
  if (helpneeded) {
    hintstyle = { test };
    hintAnimateClass = "animate__animated animate__bounceInLeft";
  }

  return (
    <Wrapper>
      <Question> Fill in the gaps below!</Question>
      <ScoreGapFill
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></ScoreGapFill>
      <Image>
        <PortableText
          value={item.picture}
          components={myPortableTextComponents}
        ></PortableText>
      </Image>

      <Text>
        {item.initial_scentence}
        <Input
          style={style}
          className={
            isCorrect ? "animate__animated animate__bounce animate__faster" : ""
          }
          type="text"
          onChange={submithandler}
        ></Input>
        {item.remainder}
      </Text>
      <Hint className={hintAnimateClass} style={hintstyle}>
        <BiHelpCircle style={{ width: "70px" }} />
        {helphints}
      </Hint>
      <HelpBtn
        style={helpneeded ? { display: "none" } : { display: "flex" }}
        onClick={() => {
          helpBtnClickHandler();
        }}
      ></HelpBtn>
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
