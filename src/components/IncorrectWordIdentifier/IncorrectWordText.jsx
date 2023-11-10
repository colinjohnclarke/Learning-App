import React, { useRef, useContext } from "react";
import { IncorrectWordContext } from "./IncorrectWordContext";
import styled from "styled-components";
// import IncorrectWordMCQ from "./IncorrectWordMCQ";
import { myPortableTextComponents } from "../../config/sanity/portableText";
import { PortableText } from "@portabletext/react";
import "animate.css";
import { device } from "../../styles/breakpoints";
import Score from "../Data/CurrentQuestionScores/Score";
import { colors } from "../../styles/colors";
import MCQ from "./MCQ";

function IncorrectWordText({ data, index }) {
  let word1selected = false;
  let word2selected = false;

  const mcqCheckWord1Ref = useRef(false);
  const mcqCheckWord2Ref = useRef(false);

  let numberofCorrectWordstoFind = 2;
  let animatenum = "";
  let showReminder = false;

  const {
    index0word1selectioncorrect,
    setindex0Word1SelectionCorrect,
    index0mcq1selectioncorrect,
    setindex0MCQ1SelectionCorrect,
    index0mcq1selectionIncorrect,
    index0setMCQ1SelectionInCorrect,
    index0word2selectioncorrect,
    setindex0Word2SelectionCorrect,
    index0mcq2selectioncorrect,
    setindex0MCQ2SelectionCorrect,
    index0mcq2selectionIncorrect,
    setindex0MCQ2SelectionInCorrect,
  } = useContext(IncorrectWordContext);

  // reassign these context values to pass to score component with correct name
  let index0AnswerisCorrect = index0word1selectioncorrect;
  let index1AnswerisCorrect = index0word2selectioncorrect;

  let additionalMark1 = index0mcq1selectioncorrect;
  let additionalMark2 = index0mcq2selectioncorrect;

  const totalMarksAvailable = data.total_marks_available;

  // word 1

  const MCQ_option_for_replacement_word1Arr =
    data.MCQ_option_for_replacement_word_.split(", ");

  // word 2

  const MCQ_option_for_replacement_word2Arr =
    data.MCQ_option_for_replacement_word_2.split(", ");

  // before words correctly clicked set to hidden
  let word1mcqstyle = { display: "none" };
  let word2mcqstyle = { display: "none" };

  // words correctly clicked display
  const displaymcqStyle = {
    display: "block",
    transition: "2.5s",
    backgroundColor: "rgba(0, 200, 200, 0.3)",
    boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 3px 0px",
    paddingTop: "10px",
    marginTop: "10px",
    width: "60%",
    minWidth: "350px",
    textAlign: "center",
  };

  const correctstyle = {
    backgroundColor: colors.correctColor,
    color: "white",
    paddingLeft: "3px",
    paddingRight: "0px",
    marginRight: "2px",
  };

  let normalTextStyle = { backgroundColor: "white", fontSize: "16px" };

  // scroll function pass in element ref
  const scrolltoFn = (elementRef) => {
    elementRef.current?.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };

  const handleWordSelection = (elementRef, isWord1) => {
    if (isWord1) {
      setindex0Word1SelectionCorrect(true);
      setTimeout(() => {
        scrolltoFn(elementRef);
      }, 700);
    } else {
      setindex0Word2SelectionCorrect(true);
      setTimeout(() => {
        scrolltoFn(elementRef);
      }, 300);
    }
  };

  // click handler first word
  const incorrectAnswer1Clicked = (elementRef) => {
    setindex0Word1SelectionCorrect((val) => true);
    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 700);
    // scrolltoFn(mcqCheckWord1Ref);
  };

  // click handler second word
  const incorrectAnswer2Clicked = (elementRef) => {
    setindex0Word2SelectionCorrect((val) => true);
    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 300);
    //   scrolltoFn(mcqCheckWord1Ref);
  };

  if (index0word1selectioncorrect) {
    word1selected = true;
    word1mcqstyle = displaymcqStyle;
  }

  if (index0word2selectioncorrect) {
    word2selected = true;
    word2mcqstyle = displaymcqStyle;
  }

  // function to reduce the count of remaining words after incorrect word correctly selected

  if (word1selected && numberofCorrectWordstoFind === 2) {
    numberofCorrectWordstoFind = numberofCorrectWordstoFind - 1;
  } else if (word2selected && numberofCorrectWordstoFind === 1) {
    numberofCorrectWordstoFind = numberofCorrectWordstoFind - 1;
  }

  // setAnimateNum("animate__animated animate__jackInTheBox");
  else if (word1selected && !word2selected) {
    showReminder = true;
  } else if (word1selected && word2selected) {
    showReminder = false;
  }

  const mcq1 = (
    <MCQ
      MCQoptionsforreplacementword={MCQ_option_for_replacement_word1Arr}
      data={data}
      style={word1mcqstyle}
      wordIsSelected={word1selected}
      mcqCheckWord1Ref={mcqCheckWord1Ref}
      index={index}
      incorrectWord={data.incorrect_word_1}
      correctWord={data.correct_word_1}
      mcq={"mcq1"}
    ></MCQ>
  );

  const mcq2 = (
    <MCQ
      MCQoptionsforreplacementword={MCQ_option_for_replacement_word2Arr}
      data={data}
      style={word2mcqstyle}
      wordIsSelected={word2selected}
      mcqCheckWord1Ref={mcqCheckWord2Ref}
      index={index}
      incorrectWord={data.incorrect_word_2}
      correctWord={data.correct_word_2}
      mcq={"mcq2"}
    ></MCQ>
  );

  return (
    <Wrapper>
      <Score
        scoreData={{
          index0AnswerisCorrect,
          index1AnswerisCorrect,
          additionalMark1,
          additionalMark2,
        }}
        totalMarksAvailable={totalMarksAvailable}
        index={index}
      ></Score>
      <Question style={{ textAlign: "center" }}>
        There are{" "}
        <div style={{ display: "inline" }} className={animatenum}>
          <strong
            style={{
              fontWeight: 800,
              color: colors.correctColor,
              textDecoration: "underline",
            }}
          >
            {numberofCorrectWordstoFind}
          </strong>
        </div>{" "}
        incorrect words in the text below, find them and click!
      </Question>
      <Main>
        <PortableText
          value={data.picture}
          components={myPortableTextComponents}
        ></PortableText>
      </Main>
      <Text ref={mcqCheckWord1Ref}>
        {data.initial_leading_scentence_word1}
        <IncorrectWord
          style={word1selected ? correctstyle : normalTextStyle}
          onClick={() => incorrectAnswer1Clicked(mcqCheckWord1Ref)}
        >
          {" "}
          {data.incorrect_word_1}{" "}
        </IncorrectWord>
        {data.remainder_sentence_word_1}
        {data.initial_leading_scentence_word2}
        <IncorrectWord
          style={word2selected ? correctstyle : normalTextStyle}
          onClick={() => incorrectAnswer2Clicked(mcqCheckWord2Ref)}
        >
          {" "}
          {data.incorrect_word_2}{" "}
        </IncorrectWord>
        {data.remainder_sentence_word_2}
      </Text>
      {mcq1}

      <Reminder
        style={showReminder ? { display: "flex" } : { display: "none" }}
      >
        <p style={{ textAlign: "center" }}>
          There is still{" "}
          <div style={{ display: "inline" }} className={animatenum}>
            <strong
              style={{
                fontWeight: 800,
                color: colors.correctColor,
                textDecoration: "underline",
              }}
            >
              {numberofCorrectWordstoFind}
            </strong>
          </div>{" "}
          incorrect word(s) to find in the text above!
        </p>
      </Reminder>
      {mcq2}
    </Wrapper>
  );
}

export default IncorrectWordText;

const Wrapper = styled.div`
  min-height: 490px;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-top: 0.5px solid lightblue;


  @media ${device.mobileL} {
    min-height: 400px;
`;

const Text = styled.div`
  line-height: 20px;
  text-align: center;
  display: inline;
  padding: 15px;
`;

const IncorrectWord = styled.p`
  display: inline;
`;

const Main = styled.div`
  //   width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Reminder = styled.div``;

const Question = styled.p`
  font-weight: 400;
`;
