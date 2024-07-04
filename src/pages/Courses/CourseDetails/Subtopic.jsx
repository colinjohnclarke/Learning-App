import React, { useContext, useState } from "react";
import styled from "styled-components";
import Lesson from "./Lesson";
import { FcNext } from "react-icons/fc";
import sanityClient from "../../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import {
  ThemeStyles,
  darkThemeMainBoxShadow,
  lightThemeMainBoxShadow,
} from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";

function Subtopic({
  subtopic,
  index,
  setSelectedSubtopics,
  selectedSubtopics,
  completedLessons,
}) {
  const { darkThemeActive } = useContext(UserContext);
  const builder = imageUrlBuilder(sanityClient);
  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const content = subtopic.coverImage ? (
    <img
      alt=""
      style={{
        height: "60px",
        width: "100px",
        position: "relative",
        borderRadius: "16px",
        //   top: "10px",
      }}
      src={imgurlFor(subtopic?.coverImage.asset._ref)}
    />
  ) : null;

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
      darkThemeActive={darkThemeActive}
      className="animate__animated animate__fadeIn"
      onClick={(event) => {
        console.log("index", index);
        handleTopicSelected(index);
        event.stopPropagation();
        console.log(subtopic.subTopicName, " Clicked");
      }}
    >
      <Row>
        <div
          style={{
            display: "flex",
            flexDirection: "row",

            marginTop: selectedSubtopics[index].selected ? "15px" : "0px",
            alignItems: "center",
            color: darkThemeActive
              ? ThemeStyles.lightThemePrimaryFrontColor
              : ThemeStyles.darkThemePrimaryFontColor,
          }}
        >
          <FcNext
            style={{
              marginRight: "10px",
              transition: "0.3s",
              transform: selectedSubtopics[index].selected
                ? "rotate(90deg)"
                : "rotate(0deg)",
            }}
          />
          {subtopic.subTopicName}
        </div>

        {!selectedSubtopics[index].selected && <Image>{content}</Image>}
      </Row>

      {selectedSubtopics[index].selected && (
        <Lessons
          style={{
            color: darkThemeActive
              ? ThemeStyles.lightThemePrimaryFrontColor
              : ThemeStyles.darkThemePrimaryFontColor,
          }}
        >
          {subtopic.lessons?.map((lesson, index) => {
            return (
              // <div key={index}></div>
              <Lesson completedLessons={completedLessons} lesson={lesson}>
                <p
                  style={{
                    color: darkThemeActive
                      ? ThemeStyles.lightThemePrimaryFrontColor
                      : ThemeStyles.darkThemePrimaryFontColor,
                  }}
                >
                  {index + 1}. {subtopic.name}
                </p>
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
  // width: 100%;
  margin: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  &:hover {
    opacity: 0.3;
    border: ${(props) =>
      props.darkThemeActive ? darkThemeMainBoxShadow : lightThemeMainBoxShadow};
  }
  border: 1 px;
  border-radius: 16px;
  // padding: 10px;
  margin-top: 5px;
  padding-left: 40px;
`;

const Row = styled.div`
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  // height: 100%;
`;

const Image = styled.div`
  height: 100%;
  position: relative;
  top: 2px;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  border-radius: 16px;
`;
