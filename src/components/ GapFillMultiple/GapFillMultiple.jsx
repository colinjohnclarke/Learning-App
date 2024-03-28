import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { myPortableTextComponents } from "../../config/sanity/portableText";
import { PortableText } from "@portabletext/react";
import ImagefromSanity from "../../config/sanity/ImagefromSanity";
import { device } from "../../styles/breakpoints";
import { correctstyle } from "../../styles/colors";
import "animate.css";
import Score from "../Data/CurrentQuestionScores/Score";

function GapFillMultiple({ data }) {
  const gapData = data[0];
  console.log("🚀 ~ GapFillMultiple ~ gapData:", gapData);

  const [correctAnswerIsSelected, setCorrectAnswerIsSelected] = useState();
  const [pointsScored, setPointsScored] = useState(0);

  const total_marks_available = gapData.number_of_statements;
  const index = 1;

  const inputIsCorrect = (input, statement1Input) => {
    const word = input
      .split(", ")
      .map((word) => word.toLowerCase())
      .map((word) =>
        word
          .split("")
          .filter((letter) => letter !== " ")
          .join("")
      );
    return word.includes(statement1Input);
  };

  const [statement1Input, setStatement1Input] = useState("");
  let word1IsCorrect = inputIsCorrect(
    gapData?.statement_1_acceptable_missing_words,
    statement1Input
  );

  const [statement2Input, setStatement2Input] = useState("");
  let word2IsCorrect = inputIsCorrect(
    gapData?.statement_2_acceptable_missing_words,
    statement2Input
  );

  const [statement3Input, setStatement3Input] = useState("");
  const word3IsCorrect = inputIsCorrect(
    gapData?.statement_3_acceptable_missing_words,
    statement3Input
  );

  const [statement4Input, setStatement4Input] = useState("");
  const word4IsCorrect = inputIsCorrect(
    gapData?.statement_4_acceptable_missing_words,
    statement4Input
  );

  const [statement5Input, setStatement5Input] = useState("");

  const word5IsCorrect = inputIsCorrect(
    gapData?.statement_5_acceptable_missing_words,
    statement5Input
  );

  const [statement6Input, setStatement6Input] = useState("");
  const word6IsCorrect = inputIsCorrect(
    gapData?.statement_6_acceptable_missing_words,
    statement6Input
  );

  const maxNumberofStatements = 7;
  let obj = [];
  for (let i = 1; i < maxNumberofStatements; i++) {
    const statementObj = {
      leading: gapData[`statement_${i}_initial_scentence`],
      remainder: gapData[`statement_${i}_remainder`],
      isCorrect: eval(`word${i}IsCorrect`),
      updateInuputState: eval(`setStatement${i}Input`),
    };
    obj.push(statementObj);
  }

  useEffect(() => {
    if (
      word1IsCorrect ||
      word2IsCorrect ||
      word3IsCorrect ||
      word4IsCorrect ||
      word5IsCorrect ||
      word6IsCorrect
    ) {
      setPointsScored((prev) => prev + 1);
    }
  }, [
    word1IsCorrect,
    word2IsCorrect,
    word3IsCorrect,
    word4IsCorrect,
    word5IsCorrect,
    word6IsCorrect,
  ]);

  return (
    <Wrapper>
      <Score
        scoreData={{
          correctAnswerIsSelected,
          pointsScored,
        }}
        totalMarksAvailable={total_marks_available}
        index={index}
      />
      <Container>
        <ImagefromSanity data={gapData.picture}></ImagefromSanity>
        <Question> {gapData.instructions}</Question>
      </Container>

      <Statements>
        {obj.map((item, index) => {
          return (
            <Text key={index}>
              {index + 1}) {item.leading}
              <Input
                disabled={item.isCorrect ? true : false}
                style={{
                  backgroundColor: item.isCorrect
                    ? correctstyle.backgroundColor
                    : "",
                  color: item.isCorrect ? "white" : "",
                  fonWeight: item.isCorrect ? "500" : "",
                }}
                className={
                  item.isCorrect
                    ? "animate__animated animate__rubberBand animate__fast"
                    : ""
                }
                type="text"
                onChange={(e) => {
                  item.updateInuputState(e.target.value.toLowerCase());
                }}
              />
              {item.remainder}
            </Text>
          );
        })}
      </Statements>
    </Wrapper>
  );
}

export default React.memo(GapFillMultiple);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-top: 40px;
  width: 100%;
  min-height: 300px;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const Statements = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  min-height: 300px;
  text-align: left;

  @media ${device.mobileL} {
    height: 100%;
  }
`;

const Input = styled.input`
  transition: 0.5s;
  border-radius: none;
  text-align: center;
  border-radius: 0px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid;
  margin-left: 3px;
  margin-right: 3px;
  height: 20px;
  min-width: 40px;
  max-width: 90px;
  background-color: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid;
  }
`;
const Text = styled.p`
  line-height: 25px;
  position: relative;
  font-size: 15px;
  margin: 10px;
  // padding: 10px;
  text-align: left;

  z-index: 0;
  // padding: 2%, 3%, 2%, 3%;
`;

const Question = styled.p`
  font-weight: 400;
  text-align: center;
`;
