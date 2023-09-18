import React from "react";
import MCQAnswerButtons from "./MCQAnswerButtons";

function MCQblock(props) {
  let objkey0 = {};
  let objkey1 = {};
  let objkey2 = {};
  let objkey3 = {};

  const getprops = props.item;
  const index = props.index;
  const updateStateFunctions = props.updateStateFunctions;

  const nu1 = Math.random();
  const nu2 = Math.random();
  const nu3 = Math.random();
  const nu4 = Math.random();

  const random = [
    { number: nu1, value: getprops.distractor_1, isCorrect: false },
    { number: nu2, value: getprops.distractor_2, isCorrect: false },
    { number: nu3, value: getprops.distractor_3, isCorrect: false },
    { number: nu4, value: getprops.correct_answer, isCorrect: true },
  ];

  const sorted = random.sort((number1, number2) =>
    number1.number < number2.number
      ? 1
      : number1.number > number2.number
      ? -1
      : 0
  );
  objkey0 = sorted[0];
  objkey1 = sorted[1];
  objkey2 = sorted[2];
  objkey3 = sorted[3];

  return (
    <div>
      <MCQAnswerButtons
        updateStateFunctions={updateStateFunctions}
        index={index}
        isCorrect={objkey0.isCorrect}
        text={objkey0.value}
      ></MCQAnswerButtons>
      <MCQAnswerButtons
        updateStateFunctions={updateStateFunctions}
        index={index}
        isCorrect={objkey1.isCorrect}
        text={objkey1.value}
      ></MCQAnswerButtons>
      <MCQAnswerButtons
        updateStateFunctions={updateStateFunctions}
        index={index}
        isCorrect={objkey2.isCorrect}
        text={objkey2.value}
      ></MCQAnswerButtons>
      <MCQAnswerButtons
        updateStateFunctions={updateStateFunctions}
        index={index}
        isCorrect={objkey3.isCorrect}
        text={objkey3.value}
      ></MCQAnswerButtons>
    </div>
  );
}

export default MCQblock;
