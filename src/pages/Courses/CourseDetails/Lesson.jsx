import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedPercentageScore from "../../Dashboard/AnimatedPercentageScore/AnimatedPercentageScore";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import styled from "styled-components";
import { DiRubyRough } from "react-icons/di";
import { device } from "../../../styles/breakpoints";
import sanityClient from "../../../createclient";
import imageUrlBuilder from "@sanity/image-url";
import CalculateXP from "./Caulations/CalculateXP";

function Lesson({ lesson, completedLessons }) {
  const params = useParams();

  const { darkThemeActive } = useContext(UserContext);

  const builder = imageUrlBuilder(sanityClient);
  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const lessonCompleted = completedLessons?.filter((completedLesson) => {
    return completedLesson.blockName === lesson?.name;
  });

  const lessonXp = CalculateXP(lesson);

  return (
    <Link
      to={`/courses/${params.subject}/${params.courseName}/${params.courseCode}/${lesson.name}`}
      className="animate__animated animate__fadeIn"
      style={{
        width: "95%",
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "5px",
      }}
    >
      <Name
        style={{
          width: "100%",
          color: darkThemeActive
            ? ThemeStyles.lightThemePrimaryFrontColor
            : ThemeStyles.darkThemePrimaryFontColor,
        }}
      >
        {lesson?.name}
      </Name>
      {/* {findBlock && ( */}
      {lessonCompleted?.[0]?.percentageScores ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              position: "relative",
              fontSize: "11px",
              margin: "10px",

              color: darkThemeActive
                ? ThemeStyles.lightThemePrimaryFrontColor
                : ThemeStyles.darkThemePrimaryFontColor,
            }}
          >
            <DiRubyRough size={20} fill="rgb(138,43,226)" />
            {lessonXp}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            {" "}
            <p
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: darkThemeActive
                  ? ThemeStyles.lightThemePrimaryFontgroundColor
                  : ThemeStyles.darkThemePrimaryFontColor,
              }}
            >
              {" "}
              Top Score:
            </p>
            <AnimatedPercentageScore
              color="rgb(0, 240, 245)"
              // percentage={findBlock?.percentageScores}
              percentage={lessonCompleted?.[0]?.percentageScores || 0}
              size={"small"}
            />
          </div>
        </div>
      ) : (
        <AnimatedPercentageScore
          color="rgb(0, 240, 245)"
          // percentage={findBlock?.percentageScores}
          percentage={0}
          size={"small"}
        />
      )}

      {/* <Image>{content}</Image>; */}
    </Link>
  );
}

export default Lesson;

const Image = styled.div`
  height: 100%;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  border-radius: 16px;
  @media ${device.mobileL} {
  }
`;

const Box = styled.p`
  width: 100%;
  padding: 10px;
  border-radius: 16px;
`;

const Name = styled.p`
  font-size: 13px;
  height: 100%;
  width: 100%;

  &:hover {
    color: blue;
    font-weight: 400;
    transition: 0.3s;
    transform: translateX(4px);
    text-decoration: underline;
  }
`;

const OverView = styled.div`
  min-height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;

  border-radius: 16px;

  font-weight: 500;

  color: ${(props) =>
    props.darkThemeActive
      ? ThemeStyles.lightThemePrimaryFrontColor
      : ThemeStyles.darkThemePrimaryFontColor};
  margin-bottom: 10px;
  margin-top: 10px;
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
