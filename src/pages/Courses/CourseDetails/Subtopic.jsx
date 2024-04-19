import React, { useState } from "react";
import styled from "styled-components";
import Lesson from "./Lesson";
import { FcNext } from "react-icons/fc";

function Subtopic({
  subtopic,
  index,
  setSelectedSubtopics,
  selectedSubtopics,
}) {
  console.log("🚀 ~ Subtopic ~ selectedSubtopics:", selectedSubtopics);
  console.log("🚀 ~ Subtopic ~ subtopic22:", subtopic);

  const handleTopicSelected = (index) => {
    setSelectedSubtopics((prev) => {
      const newState = [...prev];
      newState[index] = {
        ...newState[index],
        selected: !newState[index].selected,
      };
      return newState;
    });
  };

  return (
    <Wrapper
      className="animate__animated animate__fadeIn"
      onClick={(event) => {
        console.log("index", index);
        handleTopicSelected(index);
        event.stopPropagation();
        console.log(subtopic.subTopicName, " Clicked");
      }}
    >
      <Row>
        {" "}
        {subtopic.subTopicName}
        <FcNext
          style={{
            marginLeft: "10px",
            transition: "0.3s",
            transform: selectedSubtopics[index].selected
              ? "rotate(90deg)"
              : "rotate(0deg)",
          }}
        />
      </Row>

      {selectedSubtopics[index].selected && (
        <Lessons
          style={{
            minHeight: "30px",
          }}
        >
          {subtopic.lessons?.map((lesson, index) => {
            return (
              // <div key={index}></div>
              <Lesson lesson={lesson}>
                {index + 1}. {subtopic.name}
              </Lesson>
            );
          })}
        </Lessons>
      )}
    </Wrapper>
  );
}

export default Subtopic;

const Lessons = styled.div``;

const Wrapper = styled.div`
  width: 100%;
  // border: 1px solid;
  padding: 10px;
  
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  // height: 100%;
`;
