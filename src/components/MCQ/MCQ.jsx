import React, { useRef, useState } from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";
import Score from "../Data/CurrentQuestionScores/Score";
import { useSelector } from "react-redux";

function MCQ({ data }) {
  const index0AnswerisCorrect = useSelector(
    (state) => state.mcqslice.index0CorrectAnswerSelected
  );

  const index1AnswerisCorrect = useSelector(
    (state) => state.mcqslice.index1CorrectAnswerSelected
  );

  return (
    <Wrapper>
      {data?.map((item, index) => {
        return (
          <Main key={item._key}>
            <Score
              scoreData={{ index0AnswerisCorrect, index1AnswerisCorrect }}
              totalMarksAvailable={item.total_marks_available}
              index={index}
            />
            <Question>{item.question}</Question>
            <MCQblock item={item} index={index} />
            <MCQTeacherResponse item={item} />
          </Main>
        );
      })}
    </Wrapper>
  );
}

export default React.memo(MCQ);

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
