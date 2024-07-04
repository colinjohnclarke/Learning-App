import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../../App";
import styled from "styled-components";
import Subtopic from "./Subtopic";
import { FcNext } from "react-icons/fc";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import "animate.css";
import sanityClient from "../../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import { device } from "../../../styles/breakpoints";
import Border from "../../../components/Border";

function Topic({
  findBlock,
  topic,
  index,
  setSelectedTopics,
  selectedTopics,
  completedLessons,
}) {
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);

  const builder = imageUrlBuilder(sanityClient);
  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const content = topic.coverImage ? (
    <img
      alt=""
      style={{
        height: "70px",
        width: "100px",
        position: "relative",
        borderRadius: "16px",
        //   top: "10px",
      }}
      src={imgurlFor(topic?.coverImage.asset._ref)}
    />
  ) : null;

  const subtopicstoRender = topic?.subtopic?.map((subtopic) => {
    return { ...subtopic, selected: false };
  });

  useEffect(() => {
    if (topic) {
      setSelectedSubtopics(subtopicstoRender);
    }
  }, [topic]);

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
    <Border
      style={{
        transition: "0.3s",
        minHeight: "50px",
        marginTop: "5px",

        boxShadow: darkThemeActive
          ? ThemeStyles.lightThemeMainBoxShadow
          : ThemeStyles.darkThemeMainBoxShadow,
      }}
    >
      <Wrapper
        onClick={() => {
          handleTopicSelected(index);
          console.log("Topic Clicked");
        }}
        darkThemeActive={darkThemeActive}
      >
        <Row>
          {" "}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px",

              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            <FcNext
              style={{
                marginLeft: "10px",
                marginRight: "10px",
                transition: "0.3s",
                transform: topic.selected ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
            Part&nbsp; {index + 1}) &nbsp;{topic?.topicName}{" "}
          </div>
          {!selectedTopics[index].selected && <Image>{content}</Image>}
        </Row>
        {selectedTopics[index].selected && (
          <Subtopics>
            {subtopicstoRender?.map((subtopic, index) => {
              return (
                <Subtopic
                  className="animate__animated animate__fadeIn"
                  setSelectedSubtopics={setSelectedSubtopics}
                  selectedSubtopics={selectedSubtopics}
                  completedLessons={completedLessons}
                  key={index}
                  subtopic={subtopic}
                  index={index}
                >
                  <p
                    style={{
                      color: darkThemeActive
                        ? ThemeStyles.lightThemePrimaryFrontColor
                        : ThemeStyles.darkThemePrimaryFontColor,
                    }}
                  >
                    {index + 1}. {subtopic.subTopicName}
                  </p>
                </Subtopic>
              );
            })}
          </Subtopics>
        )}
      </Wrapper>
    </Border>
  );
}

export default Topic;

const Wrapper = styled.div`
  transition: 0.3s;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100%;

  height: auto;
  font-size: 14px;
  list-style: none;
  transition: 0.2s;

  background-color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryBackgroundColor
      : ThemeStyles.darkThemePrimaryBackgroundColor};
  &:hover {
    opacity: 0.8;
  }
`;

const Subtopics = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 0px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;

  font-weight: 700;
`;

const ShowSelected = styled.div`
  height: 8px;
  width: 8px;
  margin: 10px;
  border-radius: 50%;
`;

const Selected = styled.div``;

const Image = styled.div`
  // height: 100%;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  border-radius: 16px;
`;

const ShadedCard = styled.p`
  height: 100%;
  width: 33.3%;
  border-radius: 16px;
  max-width: 100px;
  display: flex;
  align-items: end;
  justify-content: end;
  font-size: 10px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  /* Fallback for older browsers */
  background: -webkit-linear-gradient(
    top left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  background: -moz-linear-gradient(
    top left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  background: -o-linear-gradient(top left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  background: linear-gradient(
    to bottom right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1)
  );
  opacity: 1;
  color: white;
  position: absolute;
  right: 0px;
  z-index: 22;
`;
