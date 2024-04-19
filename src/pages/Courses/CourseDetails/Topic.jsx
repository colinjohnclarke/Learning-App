import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../../App";
import styled from "styled-components";
import Subtopic from "./Subtopic";
import { FcNext } from "react-icons/fc";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import "animate.css";

function Topic({ findBlock, topic, index, setSelectedTopics, selectedTopics }) {
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);

  const subtopicstoRender = topic?.subtopic.map((subtopic) => {
    return { ...subtopic, selected: false };
  });

  useEffect(() => {
    if (topic) {
      setSelectedSubtopics(subtopicstoRender);
    }
  }, [topic]);

  // console.log("🚀 ~ subtopicstoRender ~ subtopicstoRender:", subtopicstoRender);
  const { darkThemeActive } = useContext(UserContext);

  const handleTopicSelected = (index) => {
    setSelectedTopics((prev) => {
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
      style={{
        transition: "0.3s",
        minHeight: "30px",
        boxShadow: darkThemeActive
          ? ThemeStyles.lightThemeMainBoxShadow
          : ThemeStyles.darkThemeMainBoxShadow,
      }}
      onClick={() => {
        handleTopicSelected(index);
        console.log("Topic Clicked");
      }}
    >
      <Row>
        {" "}
        Part&nbsp; {index + 1}) &nbsp;{topic?.topicName}{" "}
        <FcNext
          style={{
            marginLeft: "10px",
            transition: "0.3s",
            transform: topic.selected ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
      </Row>

      {selectedTopics[index].selected && (
        <Subtopics>
          {subtopicstoRender?.map((subtopic, index) => {
            return (
              <Subtopic
                className="animate__animated animate__fadeIn"
                setSelectedSubtopics={setSelectedSubtopics}
                selectedSubtopics={selectedSubtopics}
                key={index}
                subtopic={subtopic}
                index={index}
              >
                {index + 1}. {subtopic.subTopicName}
              </Subtopic>
            );
          })}
        </Subtopics>
      )}
    </Wrapper>
  );
}

export default Topic;

const Wrapper = styled.div`
  transition: 0.3s;
  border-radius: 16px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  font-size: 14px;
  liststyle: none;
`;

const Subtopics = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding: 15px;
`;

const ShowSelected = styled.div`
  height: 8px;
  width: 8px;
  margin: 10px;
  border-radius: 50%;
`;

const Selected = styled.div``;
