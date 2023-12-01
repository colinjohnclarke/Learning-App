import React, { useEffect, useState } from "react";
import IncorrectWordMCQ from "./IncorrectWordMCQ";

function MCQ({
  data,
  style,
  wordIsSelected,
  incorrectWord,
  mcqCheckWord1Ref,

  MCQoptionsforreplacementword,
  correctWord,
  mcq,
  updateStateFunctions,
}) {
  const [key0, setKey0] = useState([]);
  const [key1, setKey1] = useState([]);
  const [key2, setKey2] = useState([]);
  const [key3, setKey3] = useState([]);

  //  randomise

  // function to randomise the possible answers for the MCQ

  useEffect(() => {
    const index0random = [
      {
        number: Math.random(),
        value: MCQoptionsforreplacementword[0],
        isCorrect: false,
      },
      {
        number: Math.random(),
        value: MCQoptionsforreplacementword[1],
        isCorrect: false,
      },
      {
        number: Math.random(),
        value: MCQoptionsforreplacementword[2],
        isCorrect: false,
      },
      { number: Math.random(), value: correctWord, isCorrect: true },
    ];

    const sorted = index0random.sort((number1, number2) =>
      number1.number < number2.number
        ? 1
        : number1.number > number2.number
        ? -1
        : 0
    );

    setKey0((val) => sorted[0]);
    setKey1((val) => sorted[1]);
    setKey2((val) => sorted[2]);
    setKey3((val) => sorted[3]);
  }, []);

  return (
    <div
      className={
        wordIsSelected ? " animate__animated animate__bounceInLeft" : ""
      }
      ref={mcqCheckWord1Ref}
      style={style}
    >
      <p>
        Good! Now which word best fits in place of the word you have selected
        instead of{" "}
        <strong style={{ color: "red", fontWeight: "bold", textSize: "17px" }}>
          {" "}
          {incorrectWord}
        </strong>
        ?
      </p>
      <IncorrectWordMCQ
        updateStateFunctions={updateStateFunctions}
        mcq={mcq}
        isCorrect={key0.isCorrect}
        text={key0.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        updateStateFunctions={updateStateFunctions}
        mcq={mcq}
        isCorrect={key1.isCorrect}
        text={key1.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        updateStateFunctions={updateStateFunctions}
        mcq={mcq}
        isCorrect={key2.isCorrect}
        text={key2.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        updateStateFunctions={updateStateFunctions}
        mcq={mcq}
        isCorrect={key3.isCorrect}
        text={key3.value}
      ></IncorrectWordMCQ>
    </div>
  );
}

export default MCQ;
