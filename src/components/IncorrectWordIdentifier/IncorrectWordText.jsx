import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import "animate.css";
import { device } from "../../styles/breakpoints";
import Score from "../Data/CurrentQuestionScores/Score";
import { colors } from "../../styles/colors";
import MCQ from "./MCQ";
import ImagefromSanity from "../../config/sanity/ImagefromSanity";
import { ThemeStyles } from "../../styles/ThemeStyles";
import { UserContext } from "../../App";

function IncorrectWordText({ data, index, updateStateFunctions }) {
  const [word1selected, setWord1selected] = useState(false);
  const [word2selected, setWord2selected] = useState(false);

  const mcqCheckWord1Ref = useRef(false);
  const mcqCheckWord2Ref = useRef(false);

  const { darkThemeActive } = useContext(UserContext);

  let numberofCorrectWordstoFind = 2;
  let animatenum = "";
  let showReminder = false;

  const { pointsScored, setPointsScored } = updateStateFunctions;

  // reassign these context values to pass to score component with correct name

  const totalMarksAvailable = data.total_marks_available;

  // word 1

  const MCQ_option_for_replacement_word1Arr =
    data.MCQ_option_for_replacement_word_.split(", ");

  // word 2

  const MCQ_option_for_replacement_word2Arr =
    data.MCQ_option_for_replacement_word_2.split(", ");

  // before words correctly clicked set to hidden
  let word1McqStyle = { display: "none" };
  let word2McqStyle = { display: "none" };

  // words correctly clicked display
  const displayMcqStyle = {
    display: "flex",
    flexDirection: "column",
    transition: "2.5s",
    backgroundColor: darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor,
    paddingTop: "10px",
    marginTop: "10px",
    // width: "60%",
    minWidth: "350px",
    textAlign: "center",
    height: "auto",
  };

  const correctstyle = {
    backgroundColor: colors.correctColor,
    color: "white",
    paddingLeft: "3px",
    paddingRight: "0px",
    marginRight: "2px",
  };

  let normalTextStyle = {
    backgroundColor: darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemeSecondaryBackgroundColor,
    fontSize: "16px",
  };

  // scroll function pass in element ref
  const scrolltoFn = (elementRef) => {
    elementRef.current?.scrollIntoView({
      alignToTop: true,
      behavior: "smooth",
    });
  };

  // click handler first word
  const incorrectAnswer1Clicked = (elementRef) => {
    setWord1selected((val) => true);
    setPointsScored((val) => val + 1);
    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 700);
    // scrolltoFn(mcqCheckWord1Ref);
  };

  // click handler second word
  const incorrectAnswer2Clicked = (elementRef) => {
    setWord2selected((val) => true);
    setPointsScored((val) => val + 1);
    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 300);
    //   scrolltoFn(mcqCheckWord1Ref);
  };

  if (word1selected) {
    word1McqStyle = displayMcqStyle;
  }

  if (word2selected) {
    word2McqStyle = displayMcqStyle;
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
  } else if (word2selected && word2selected) {
    showReminder = false;
  }

  const mcq1 = (
    <MCQ
      updateStateFunctions={updateStateFunctions}
      MCQoptionsforreplacementword={MCQ_option_for_replacement_word1Arr}
      data={data}
      style={word1McqStyle}
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
      updateStateFunctions={updateStateFunctions}
      MCQoptionsforreplacementword={MCQ_option_for_replacement_word2Arr}
      data={data}
      style={word2McqStyle}
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
          pointsScored,
        }}
        totalMarksAvailable={totalMarksAvailable}
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
        <ImagefromSanity data={data.picture} />
      </Main>
      <Text ref={mcqCheckWord1Ref}>
        {data.initial_leading_scentence_word1}{" "}
        <IncorrectWord
          data-testid="incorrectWord1"
          style={word1selected ? correctstyle : normalTextStyle}
          onClick={() => {
            if (!word1selected) {
              incorrectAnswer1Clicked(mcqCheckWord1Ref);
            }
          }}
        >
          {" "}
          {data.incorrect_word_1}{" "}
        </IncorrectWord>
        {data.remainder_sentence_word_1}
        {data.initial_leading_scentence_word2}
        <IncorrectWord
          className={
            word2selected ? " animate__animated animate__rubberBand" : ""
          }
          data-testid="incorrectWord2"
          style={word2selected ? correctstyle : normalTextStyle}
          onClick={() => {
            if (!word2selected) incorrectAnswer2Clicked(mcqCheckWord2Ref);
          }}
        >
          {" "}
          {data.incorrect_word_2}{" "}
        </IncorrectWord>
        {data.remainder_sentence_word_2}
      </Text>
      {mcq1}

      {/* <Reminder
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
      </Reminder> */}
      {mcq2}
    </Wrapper>
  );
}

export default IncorrectWordText;

const Wrapper = styled.div`

height: 100%; 
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 




  @media ${device.mobileL} {
    height: 100%;

  }


  @media ${device.mobileL} {
    min-height: 400px;
    height: 100%; 
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
  margin: 10px;
`;
