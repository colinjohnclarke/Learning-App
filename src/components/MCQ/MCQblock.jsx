import React, { useState, useEffect, useMemo } from "react";
import MCQAnswerButtons from "./MCQAnswerButtons";

function MCQblock(props) {
  const [sortedquestionarr, setSortedQuestionArr] = useState();

  const [objkey0, setObjkey0] = useState({});
  const [objkey1, setObjkey1] = useState({});
  const [objkey2, setObjkey2] = useState({});
  const [objkey3, setObjkey3] = useState({});

  const getprops = props.item;
  const index = props.index;

  const randomise = (getprops) => {
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

    setSortedQuestionArr(sorted);
    setObjkey0(sorted[0]);
    setObjkey1(sorted[1]);
    setObjkey2(sorted[2]);
    setObjkey3(sorted[3]);
  };

  // useEffect(() => {
  //   randomise(getprops);
  // }, []);

  const randomisefun = useMemo(() => randomise(getprops), [getprops]);

  return (
    <div>
      <MCQAnswerButtons
        index={index}
        isCorrect={objkey0.isCorrect}
        text={objkey0.value}
      ></MCQAnswerButtons>
      <MCQAnswerButtons
        index={index}
        isCorrect={objkey1.isCorrect}
        text={objkey1.value}
      ></MCQAnswerButtons>
      <MCQAnswerButtons
        index={index}
        isCorrect={objkey2.isCorrect}
        text={objkey2.value}
      ></MCQAnswerButtons>
      <MCQAnswerButtons
        index={index}
        isCorrect={objkey3.isCorrect}
        text={objkey3.value}
      ></MCQAnswerButtons>
    </div>
  );
}

export default MCQblock;
