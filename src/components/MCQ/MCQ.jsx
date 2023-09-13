import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";
import ScoreMCQ from "../Data/CurrentQuestionScores/ScoreMCQ";
import { MCQcontext } from "./MCQContext";

function MCQ({ data }) {
  const [index0ItemClickedisCorrect, setindex0ItemClickedIsCorrect] =
    useState(false);

  const [index1ItemClickedisCorrect, setindex1ItemClickedIsCorrect] =
    useState(false);

  const [index0ItemClickedisInCorrect, setIndex0ItemSelectionIsInCorrect] =
    useState(false);

  const [index1ItemClickedisInCorrect, setIndex1ItemSelectionIsInCorrect] =
    useState(false);

  const contextObj = {
    index0ItemClickedisCorrect,
    setindex0ItemClickedIsCorrect,
    index1ItemClickedisCorrect,
    setindex1ItemClickedIsCorrect,
    index0ItemClickedisInCorrect,
    setIndex0ItemSelectionIsInCorrect,
    index1ItemClickedisInCorrect,
    setIndex1ItemSelectionIsInCorrect,
  };

  return (
    <Wrapper>
      {data?.map((item, index) => {
        return (
          <Main key={item._key}>
            <Question>{item.question}</Question>
            <MCQcontext.Provider value={contextObj}>
              <ScoreMCQ
                totalMarksAvailable={item.total_marks_available}
                index={index}
              />
              <MCQblock item={item} index={index} />
            </MCQcontext.Provider>

            <MCQTeacherResponse item={item} />
          </Main>
        );
      })}
    </Wrapper>
  );
}

export default MCQ;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Main = styled.div`
  border-top: 0.5px solid lightblue;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Question = styled.p`
  margin: 60px;
  width: 80%;
  text-align: center;
  font-weight: 400;
  
`;
