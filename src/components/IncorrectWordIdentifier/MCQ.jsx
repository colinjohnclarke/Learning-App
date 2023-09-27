import React, { useEffect, useState } from "react";
import IncorrectWordMCQ from "./IncorrectWordMCQ";

function MCQ({
  data,
  style,
  wordIsSelected,
  incorrectWord,
  mcqCheckWord1Ref,
  index,
  MCQoptionsforreplacementword,
  correctWord,
  mcq,
}) {
  const [key0, setKey0] = useState([]);
  const [key1, setKey1] = useState([]);
  const [key2, setKey2] = useState([]);
  const [key3, setKey3] = useState([]);

  //  randomise

  console.log(wordIsSelected);

  console.log("data", data);

  // function to randomise the possible answers for the MCQ

  console.log(data.correct_word_1);

  useEffect(() => {
    const index0nu1 = Math.random();
    const index0nu2 = Math.random();
    const index0nu3 = Math.random();
    const index0nu4 = Math.random();

    const index0random = [
      {
        number: index0nu1,
        value: MCQoptionsforreplacementword[0],
        isCorrect: false,
      },
      {
        number: index0nu2,
        value: MCQoptionsforreplacementword[1],
        isCorrect: false,
      },
      {
        number: index0nu3,
        value: MCQoptionsforreplacementword[2],
        isCorrect: false,
      },
      { number: index0nu4, value: correctWord, isCorrect: true },
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
        mcq={mcq}
        index={index}
        isCorrect={key0.isCorrect}
        text={key0.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={mcq}
        index={index}
        isCorrect={key1.isCorrect}
        text={key1.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={mcq}
        index={index}
        isCorrect={key2.isCorrect}
        text={key2.value}
      ></IncorrectWordMCQ>
      <IncorrectWordMCQ
        mcq={mcq}
        index={index}
        isCorrect={key3.isCorrect}
        text={key3.value}
      ></IncorrectWordMCQ>
    </div>
  );
}

export default MCQ;
