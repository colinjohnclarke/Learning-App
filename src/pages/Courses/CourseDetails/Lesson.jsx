import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatedPercentageScore from "../../Dashboard/AnimatedPercentageScore";
import { ThemeStyles } from "../../../styles/ThemeStyles";
import { UserContext } from "../../../App";
import styled from "styled-components";
import { DiRubyRough } from "react-icons/di";
import { device } from "../../../styles/breakpoints";
import sanityClient from "../../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function Lesson({ lesson }) {
  console.log("🚀 ~ Lesson ~ lesson:", lesson);
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

  // <ShadedCard>
  //   {" "}
  //   <p
  //     style={{
  //       color: "white",
  //       // margin: "4px",
  //       display: "flex",
  //       alignItems: "center",
  //     }}
  //   >
  //     {" "}
  //     <DiRubyRough size={20} fill="rgb(138,43,226)" />
  //     {/* {findBlock?.XPScored} */}
  //   </p>
  // </ShadedCard>;

  return (
    <Wrapper className="animate__animated animate__fadeIn">
      <p style={{ padding: "1px", fontSize: "14px", width: "90%" }}>
        {" "}
        {lesson?.name}
      </p>

      {/* {findBlock && ( */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* <p
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
        </p> */}
        {/* <AnimatedPercentageScore
          color="rgb(0, 240, 245)"
          percentage={findBlock?.percentageScores}
        /> */}
      </div>
      {/* } */}
      {/* <Image>{content}</Image> */}
    </Wrapper>
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

const Wrapper = styled.div`
  height: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;

  &:hover {
    background-color: rgb(220, 220, 220, 0.3);
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
