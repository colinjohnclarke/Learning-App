import React, { useState } from "react";
import { styled } from "styled-components";
import IncorrectWordText from "./IncorrectWordText";
import { IncorrectWordContext } from "./IncorrectWordContext";
import Score from "../Data/CurrentQuestionScores/Score";

function IncorrectWordWrapper({ data }) {
  const [index0word1selectioncorrect, setindex0Word1SelectionCorrect] =
    useState(false);
  const [index0mcq1selectioncorrect, setindex0MCQ1SelectionCorrect] =
    useState(false);
  const [index0mcq1selectionIncorrect, index0setMCQ1SelectionInCorrect] =
    useState(false);
  const [index0word2selectioncorrect, setindex0Word2SelectionCorrect] =
    useState(false);
  const [index0mcq2selectioncorrect, setindex0MCQ2SelectionCorrect] =
    useState(false);
  const [index0mcq2selectionIncorrect, setindex0MCQ2SelectionInCorrect] =
    useState(false);

  const contextObj = {
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
  };

  return (
    data &&
    Array.isArray(data) &&
    data?.map((item, index) => {
      return (
        <IncorrectWordContext.Provider value={contextObj}>
          <IncorrectWordText
            key={item._key}
            data={item}
            index={index}
          ></IncorrectWordText>
        </IncorrectWordContext.Provider>
      );
    })
  );
}

export default React.memo(IncorrectWordWrapper);
