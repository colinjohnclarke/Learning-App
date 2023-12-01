import React, { useRef, useState } from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";
import Score from "../Data/CurrentQuestionScores/Score";
import { useSelector } from "react-redux";
import { device } from "../../styles/breakpoints";

function MCQ({ data }) {
  // console.log("🚀 ~ file: MCQ.jsx:9 ~ MCQ ~ data:", data);
  // const index0AnswerisCorrect = useSelector(
  //   (state) => state.mcqslice.index0CorrectAnswerSelected
  // );

  // const index1AnswerisCorrect = useSelector(
  //   (state) => state.mcqslice.index1CorrectAnswerSelected
  // );

  const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState(false);
  const [incorrectAnswerIsSelected, setIncorrectAnswerIsSelected] =
    useState(false);

  const updateStateFunctions = {
    correctAnswerIsSelected,
    setCorrectAnswerIsSelected,
    incorrectAnswerIsSelected,
    setIncorrectAnswerIsSelected,
  };

  return (
    <Wrapper>
      {data &&
        Array.isArray(data) &&
        data.map((item, index) => (
          <Main key={item._key}>
            <Score
              scoreData={{
                correctAnswerIsSelected,
              }}
              totalMarksAvailable={item.total_marks_available}
              index={index}
            />

            <Question>{item.question}</Question>

            <MCQblock
              updateStateFunctions={updateStateFunctions}
              item={item}
              index={index}
            />

            <MCQTeacherResponse item={item} />
          </Main>
        ))}
    </Wrapper>
  );
}

export default React.memo(MCQ);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media ${device.mobileL} {
    height: 100%;
  }
`;

const Main = styled.div`
  border-top: 0.5px solid lightblue;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media ${device.mobileL} {
    height: 100%;
  }
`;

const Question = styled.p`
  margin: 60px;
  width: 80%;
  text-align: center;
  font-weight: 400;
`;
