import React, { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";
import ScoreMCQ from "../scores/ScoreMCQ";
import { MCQcontext } from "./MCQContext";

function MCQ({ data }) {
  // const length = data?.length;
  // console.log("🚀 ~ file: MCQ.jsx:8 ~ MCQ ~ length:", length);

  // const CurrentMCQScoreContext = useContext(CurrentMCQScoreContext);
  // const [currentScore, setCurrentScore] = useState(0);
  // const [selectionisCorrect, setSelectionIsCorrect] = useState(false);

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
  // const providerValue = useMemo(
  //   () => ({ currentScore, setCurrentScore }),
  //   [currentScore, setCurrentScore]
  // );

  return (
    <Wrapper>
      {data?.map((item, index) => {
        return (
          <Main key={item._key}>
            <Question>{item.question}</Question>
            <MCQcontext.Provider value={contextObj}>
              <ScoreMCQ index={index} />
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
  // padding: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  position: relative;
  // padding-top: 30px;
`;

const Question = styled.div`
  padding: 60px;
`;
