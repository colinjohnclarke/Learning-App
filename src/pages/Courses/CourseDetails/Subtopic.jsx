import React, { useState } from "react";
import styled from "styled-components";
import Lesson from "./Lesson";
import { FcNext } from "react-icons/fc";

function Subtopic({ subtopic }) {
  console.log("🚀 ~ Subtopic ~ subtopic:", subtopic);

  const [selected, setSelected] = useState(false);

  return (
    <Wrapper
      onClick={() => {
        setSelected((prev) => !prev);
      }}
    >
      {subtopic.subTopicName}
      <Lessons>
        {subtopic.lessons?.map((lesson, index) => {
          return (
            <div></div>
            // <Lesson lesson={lesson}>
            //   {index + 1}. {subtopic.name}
            // </Lesson>
          );
        })}
      </Lessons>
      <FcNext
        style={{
          transition: "0.3s",
          transform: selected ? "rotate(90deg)" : "rotate(0deg)",
        }}
      />
    </Wrapper>
  );
}

export default Subtopic;

const Lessons = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid;
  margin: 10px;
  z-index: 100;
`;
