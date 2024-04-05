import React, { useContext, useState } from "react";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import styled from "styled-components";
import Subtopic from "./Subtopic";
import { FcNext } from "react-icons/fc";

function Topic({ findBlock, topic, index }) {
  const { darkThemeActive } = useContext(UserContext);
  console.log("🚀 ~ Topic ~ topic:", topic);
  const [selected, setSelected] = useState(false);
  return (
    <Text
      onClick={() => {
        setSelected((prev) => !prev);
      }}
    >
      Part&nbsp; {index + 1}) &nbsp;{topic.topicName}
      <Subtopics style={{ display: selected ? "flex" : "none" }}>
        {topic?.subtopic.map((subtopic, index) => {
          return (
            <Subtopic subtopic={subtopic}>
              {index + 1}. {subtopic.subTopicName}
            </Subtopic>
          );
        })}
      </Subtopics>
      <FcNext
        style={{
          transition: "0.3s",
          transform: selected ? "rotate(90deg)" : "rotate(0deg)",
        }}
      />
    </Text>
  );
}

export default Topic;

const Text = styled.p`
  width: 100%;
  height: auto;
  transition: 0.3s;

  border: 1px solid green;

  margin: 2px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: space-between;
  // transition: 0.2s;
  // padding: 10px;
  // font-size: 11px;
  // liststyle: none;
  // padding-left: 10px;
  // text-align: start;
  // font-weight: 400;
`;

const Subtopics = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const ShowSelected = styled.div`
  height: 8px;
  width: 8px;
  margin: 10px;
  border-radius: 50%;
`;

const Selected = styled.div``;
