import React, { useState, useEffect, useRef, useContext } from "react";
import { IncorrectWordContext } from "./IncorrectWordContext";
import styled from "styled-components";
import IncorrectWordMCQ from "./IncorrectWordMCQ";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../createclient";
import "animate.css";
import ScoreInCorrectWord from "../scores/ScoreIncorrectWord";

import { correctstyle, incorrectstyle, colors } from "../../styles/colors";

function IncorrectWordText(props) {
  const [obj1key0, setObj1key0] = useState({});
  const [obj1key1, setObj1key1] = useState({});
  const [obj1key2, setObj1key2] = useState({});
  const [obj1key3, setObj1key3] = useState({});
  const [sortedquestionarrword1, setSortedQuestionArrword1] = useState();
  const [sortedquestionarrword2, setSortedQuestionArrword2] = useState();
  const [numberofCorrectwordstoFind, setNumberofCorrectWordstoFind] =
    useState(2);

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

  const [obj2key0, setObj2key0] = useState({});
  const [obj2key1, setObj2key1] = useState({});
  const [obj2key2, setObj2key2] = useState({});
  const [obj2key3, setObj2key3] = useState({});

  const [word1selected, setWord1Selected] = useState();
  const [word2selected, setWord2Selected] = useState();

  const mcqCheckWord1Ref = useRef(false);
  const mcqCheckWord2Ref = useRef(false);

  const data = props.data;

  const index = props.index;

  // word 1
  const MCQ_option_for_replacement_word1 =
    data.MCQ_option_for_replacement_word_;

  const MCQ_option_for_replacement_word1Arr =
    MCQ_option_for_replacement_word1.split(", ");

  // word 2

  const MCQ_option_for_replacement_word2 =
    data.MCQ_option_for_replacement_word_2;

  const MCQ_option_for_replacement_word2Arr =
    MCQ_option_for_replacement_word2.split(", ");

  // word 1 randomise

  // function to randomise the possible answers for the MCQ
  useEffect(() => {
    const nu1 = Math.random();
    const nu2 = Math.random();
    const nu3 = Math.random();
    const nu4 = Math.random();

    const random = [
      {
        number: nu1,
        value: MCQ_option_for_replacement_word1Arr[0],
        isCorrect: false,
      },
      {
        number: nu2,
        value: MCQ_option_for_replacement_word1Arr[1],
        isCorrect: false,
      },
      {
        number: nu3,
        value: MCQ_option_for_replacement_word1Arr[2],
        isCorrect: false,
      },
      { number: nu4, value: data.correct_word_1, isCorrect: true },
    ];

    const sorted = random.sort((number1, number2) =>
      number1.number < number2.number
        ? 1
        : number1.number > number2.number
        ? -1
        : 0
    );

    console.log(sorted);
    setSortedQuestionArrword1(sorted);
    setObj1key0(sorted[0]);
    setObj1key1(sorted[1]);
    setObj1key2(sorted[2]);
    setObj1key3(sorted[3]);
  }, [word1selected]);

  // word 2 randomise
  useEffect(() => {
    const nu1 = Math.random();
    const nu2 = Math.random();
    const nu3 = Math.random();
    const nu4 = Math.random();

    const random = [
      {
        number: nu1,
        value: MCQ_option_for_replacement_word2Arr[0],
        isCorrect: false,
      },
      {
        number: nu2,
        value: MCQ_option_for_replacement_word2Arr[1],
        isCorrect: false,
      },
      {
        number: nu3,
        value: MCQ_option_for_replacement_word2Arr[2],
        isCorrect: false,
      },
      { number: nu4, value: data.correct_word_2, isCorrect: true },
    ];

    const sorted = random.sort((number1, number2) =>
      number1.number < number2.number
        ? 1
        : number1.number > number2.number
        ? -1
        : 0
    );

    setSortedQuestionArrword2(sorted);
    setObj2key0(sorted[0]);
    setObj2key1(sorted[1]);
    setObj2key2(sorted[2]);
    setObj2key3(sorted[3]);
  }, [word2selected]);

  const builder = imageUrlBuilder(sanityClient);

  function imgurlFor(source) {
    return builder.image(source);
  }

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
            alt={data.pic_alt}
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

  // styles of MCQ

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

  let normalTextStyle = { backgroundColor: "white" };

  let correctBtnSelected = {
    backgroundColor: "rgba(137, 240, 158, 0.34)",
    color: "green",
    fontWeight: "bold",
    textDecoration: "underline",
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
    setWord1Selected(!word1selected);

    setindex0Word1SelectionCorrect((val) => true);

    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 700);
    // scrolltoFn(mcqCheckWord1Ref);
  };

  // click handler second word
  const incorrectAnswer2Clicked = (elementRef) => {
    setWord2Selected(!word2selected);
    setindex0Word2SelectionCorrect((val) => true);

    setTimeout(() => {
      scrolltoFn(elementRef);
    }, 300);
    //   scrolltoFn(mcqCheckWord1Ref);
  };

  let animateNum = "";

  if (word2selected) {
    word2mcqstyle = displaymcqStyle;
    animateNum = " animate__animated animate__bounceInLeft";
  }

  // function to reduce the count of remaining words after incorrect word correctly selected
  useEffect(() => {
    if (word1selected && numberofCorrectwordstoFind === 2) {
      setNumberofCorrectWordstoFind((val) => val - 1);
    } else if (word2selected && numberofCorrectwordstoFind === 1) {
      setNumberofCorrectWordstoFind((val) => val - 1);
    }
  }, [word1selected, word2selected]);

  if (word1selected) {
    word1mcqstyle = displaymcqStyle;
    animateNum = " animate__animated animate__bounceInLeft";
  }

  const mcq1 = (
    <Mcq
      className={
        word1mcqstyle ? " animate__animated animate__bounceInLeft" : ""
      }
      ref={mcqCheckWord1Ref}
      style={word1mcqstyle}
    >
      <p>
        Good! Now which word best fits in place of the word you have selected
        instead of{" "}
        <strong style={{ color: "red", fontWeight: "bold", textSize: "17px" }}>
          {" "}
          {data.incorrect_word_1}
        </strong>
        ?
      </p>
      <IncorrectWordMCQ
        mcq={"mcq1"}
        index={index}
        isCorrect={obj1key0.isCorrect}
        text={obj1key0.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={"mcq1"}
        index={index}
        isCorrect={obj1key1.isCorrect}
        text={obj1key1.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={"mcq1"}
        index={index}
        isCorrect={obj1key2.isCorrect}
        text={obj1key2.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={"mcq1"}
        index={index}
        isCorrect={obj1key3.isCorrect}
        text={obj1key3.value}
      ></IncorrectWordMCQ>
    </Mcq>
  );

  const mcq2 = (
    <Mcq
      className={word2mcqstyle ? "animate__animated animate__bounceInLeft" : ""}
      ref={mcqCheckWord2Ref}
      style={word2mcqstyle}
    >
      <p>
        Great, whats the word from these below that should replace{" "}
        <strong style={{ color: "red", fontWeight: "bold", textSize: "17px" }}>
          {data.incorrect_word_2}?
        </strong>
      </p>
      <IncorrectWordMCQ
        mcq={"mcq2"}
        index={index}
        isCorrect={obj2key0.isCorrect}
        text={obj2key0.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={"mcq2"}
        index={index}
        isCorrect={obj2key1.isCorrect}
        text={obj2key1.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={"mcq2"}
        index={index}
        isCorrect={obj2key2.isCorrect}
        text={obj2key2.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={"mcq2"}
        index={index}
        isCorrect={obj2key3.isCorrect}
        text={obj2key3.value}
      ></IncorrectWordMCQ>
    </Mcq>
  );

  return (
    <Wrapper>
      <ScoreInCorrectWord index={index}></ScoreInCorrectWord>
      <p style={{ textAlign: "center" }}>
        There are{" "}
        <strong
          className={animateNum}
          style={{
            fontWeight: 800,
            color: colors.correctColor,
            textDecoration: "underline",
          }}
        >
          {numberofCorrectwordstoFind}
        </strong>{" "}
        incorrect words in the text below, find them and click!
      </p>
      <Main>
        <PortableText
          value={data.picture}
          components={myPortableTextComponents}
        ></PortableText>
      </Main>
      <Text>
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
      {mcq2}
    </Wrapper>
  );
}

export default IncorrectWordText;

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Text = styled.div`
  line-height: 20px;
  text-align: center;
  display: inline;
  padding: 15px;
`;

const Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

const Mcq = styled.div``;

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
