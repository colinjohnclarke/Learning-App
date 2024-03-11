import React, { useState } from "react";
import MCQAnswerButtons from "./MCQAnswerButtons";
import ImagefromSanity from "../../config/sanity/ImagefromSanity";
import styled from "styled-components";

function MCQblock({ item, index, updateStateFunctions }) {
  const {
    distractor_1,
    distractor_2,
    distractor_3,
    correct_answer,
    picture,
    isAlgebra,
  } = item;

  // Shuffle the answer options randomly
  let options = [distractor_1, distractor_2, distractor_3, correct_answer]
    .map((value) => ({
      value,
      isCorrect: value === correct_answer,
      number: Math.random(),
    }))
    .sort((a, b) => b.number - a.number);

  const [shuffledOptions, setShuffledOptions] = useState(options);

  return (
    <Wrapper>
      <ImagefromSanity data={picture}></ImagefromSanity>
      {shuffledOptions.map((option, optionIndex) => (
        <MCQAnswerButtons
   
          key={optionIndex}
          isAlgebra={isAlgebra}
          updateStateFunctions={updateStateFunctions}
          index={index}
          isCorrect={option.isCorrect}
          text={option.value}
        />
      ))}
    </Wrapper>
  );
}

export default React.memo(MCQblock);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
