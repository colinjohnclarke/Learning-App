import React from "react";
import styled from "styled-components";
import MCQblock from "./MCQblock";
import MCQTeacherResponse from "./MCQTeacherResponse";

function MCQ({ data }) {
  return (
    <ExampleQuiz>
      <h1>Example quiz</h1>
      {data?.map((item, index) => {
        return (
          <div key={item._key}>
            <h1>{item.question}</h1>
            <MCQblock item={item} index={index} />
            <MCQTeacherResponse item={item} />
          </div>
        );
      })}
    </ExampleQuiz>
  );
}

export default MCQ;

const ExampleQuiz = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  border: 0.5px solid;
  // justify-content: center;
  // align-items: center;
  // margin: 5px;
`;
