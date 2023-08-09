import React, { useEffect, useState, useContext } from "react";
import { GapFillContext } from "./GapFillContext";
import styled from "styled-components";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import { correctstyle } from "../../styles/colors";

import HelpBtn from "../Buttons/HelpBtn";
import ScoreGapFill from "../../components/Data/CurrentQuestionScores/ScoreGapFill";
import "animate.css";

import { BiHelpCircle } from "react-icons/bi";

function GapFill(props) {
  console.log("🚀 ~ file: GapFill.jsx:16 ~ props:", props);
  const item = props.item;
  const index = props.index;
  const acceptable_missing_words = props.item.acceptable_missing_words;
  const helphints = props.item.hint;
  const totalMarksAvailable = props.item.total_marks_available;

  console.log(
    "🚀 ~ file: GapFill.jsx:21 ~ totalMarksAvailable:",
    totalMarksAvailable
  );

  const [inputfieldgapfill, setInputFieldGapFill1] = useState("");
  const [iscorrect, setIsCorrect] = useState(false);
  const [helpneeded, setHelpNeeded] = useState(false);

  const builder = imageUrlBuilder(sanityClient);

  function imgurlFor(source) {
    return builder.image(source);
  }

  const {
    index0answeriscorrect,
    setindex0AnswerisCorrect,
    index1AnswerisCorrect,
    setindex1AnswerisCorrect,
  } = useContext(GapFillContext);

  const myPortableTextComponents = {
    types: {
      image: (props) => (
        <Image>
          <img
            style={{
              maxWidth: "400px",
              width: "70%",
              // padding: "10px",
              // margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            src={imgurlFor(props.value.asset)}
            alt={props.pic_alt}
          />
        </Image>
      ),
      marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        em: ({ children }) => (
          <em className="text-gray-600 font-semibold">{children}</em>
        ),
      },
    },
  };

  useEffect(() => {
    const acceptable_missing_words_Arr = acceptable_missing_words.split(", ");

    let compareAnswer;

    compareAnswer = acceptable_missing_words_Arr.find(
      (answer) => answer === inputfieldgapfill
    );

    if (compareAnswer === undefined && index === 0) {
      setIsCorrect(false);
    } else if (compareAnswer !== undefined && index === 0) {
      setIsCorrect(true);
      setindex0AnswerisCorrect((val) => true);
    }
  }, [inputfieldgapfill]);

  useEffect(() => {
    const acceptable_missing_words_Arr = acceptable_missing_words.split(", ");

    let compareAnswer;

    compareAnswer = acceptable_missing_words_Arr.find(
      (answer) => answer === inputfieldgapfill
    );

    if (compareAnswer === undefined && index === 1) {
      setIsCorrect(false);
    } else if (compareAnswer !== undefined && index === 1) {
      setIsCorrect(true);
      setindex1AnswerisCorrect((val) => true);
    }
  }, [inputfieldgapfill]);

  // else if (compareAnswer === undefined && index === 1) {
  //   setIsCorrect(false);
  // } else if (compareAnswer !== undefined && index === 1) {
  //   setIsCorrect(true);
  //   setindex1AnswerisCorrect((val) => true

  const submithandler = (e) => {
    e.preventDefault();
    setInputFieldGapFill1(e.target.value);
  };

  let style;

  if (iscorrect) {
    style = {
      backgroundColor: correctstyle.backgroundColor,
      color: correctstyle.color,
    };
  }

  //   if (inputfieldgapfill == )

  let hintstyle = {};

  const helpBtnClickHandler = () => {
    setHelpNeeded(!helpneeded);

    return false;
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
            iscorrect ? "animate__animated animate__bounce animate__faster" : ""
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
