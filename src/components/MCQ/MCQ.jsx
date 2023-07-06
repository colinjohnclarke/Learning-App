import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";
import Score from "../scores/Score";
import { MCQcontext } from "./CurrentMCQScoreContext";

function MCQ({ data }) {
  // const length = data?.length;
  // console.log("🚀 ~ file: MCQ.jsx:8 ~ MCQ ~ length:", length);

  // const CurrentMCQScoreContext = useContext(CurrentMCQScoreContext);
  // const [currentScore, setCurrentScore] = useState(0);
  // const [selectionisCorrect, setSelectionIsCorrect] = useState(false);
  const [index0ItemClickedisInCorrect, setIndex0ItemSelectionIsInCorrect] =
    useState(false);

  const [index1ItemClickedisInCorrect, setIndex1ItemSelectionIsInCorrect] =
    useState(false);

  // const providerValue = useMemo(
  //   () => ({ currentScore, setCurrentScore }),
  //   [currentScore, setCurrentScore]
  // );

  return (
    <Wrapper>
      {data?.map((item, index) => {
        return (
          <Main key={item._key}>
            <Score />
            <Question>{item.question}</Question>
            <MCQcontext.Provider
              value={{
                index0ItemClickedisInCorrect,
                setIndex0ItemSelectionIsInCorrect,
                index1ItemClickedisInCorrect,
                setIndex1ItemSelectionIsInCorrect,
              }}
            >
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
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  position: relative;
`;

const Question = styled.div`
  padding-top: 50px;
`;
