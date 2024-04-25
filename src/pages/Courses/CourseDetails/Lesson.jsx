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

function Lesson({ lesson }) {
  console.log("🚀 ~ Lesson ~ lesson:", lesson);
  const params = useParams();
  console.log("🚀 ~ params:", params);
  const { darkThemeActive } = useContext(UserContext);

  const builder = imageUrlBuilder(sanityClient);
  const imgurlFor = (source) => {
    return builder.image(source);
  };
  // const content = block.coverImage ? (
  //   <img
  //     alt=""
  //     style={{
  //       height: "60px",
  //       width: "100px",
  //       position: "relative",
  //       borderRadius: "16px",
  //       //   top: "10px",
  //     }}
  //     src={imgurlFor(block?.coverImage.asset._ref)}
  //   />
  // ) : null;

  <ShadedCard>
    {" "}
    <p
      style={{
        color: "white",
        // margin: "4px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {" "}
      <DiRubyRough size={20} fill="rgb(138,43,226)" />
      {/* {findBlock?.XPScored} */}
    </p>
  </ShadedCard>;

  // to={`course/${params.subject}/${params.courseName}/${params.courseCode}/${lesson.name}`}
  return (
    <Link
      to={`/courses/${params.subject}/${params.courseName}/${params.courseCode}/${lesson.name}`}
      className="animate__animated animate__fadeIn"
      style={{
        height: "50px",
        width: "100%",
        textDecoration: "none",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: "5px",
      }}
    >
      <Name style={{ width: "100%" }}>{lesson?.name}</Name>
      {/* {findBlock && ( */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
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
          percentage={100}
          size={"small"}
        />
      </div>
      {/* <Image>{content}</Image> */};
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
