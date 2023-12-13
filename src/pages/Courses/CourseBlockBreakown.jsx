import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
// import CourseBlockBreakown from "./CourseBlockBreakown";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { device } from "../../styles/breakpoints";

import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function CourseBlockBreakown({ data }) {
  console.log("data TEST", data);

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const blocks = data.map((block, index) => {
    const content = block.coverImage ? (
      <img
        alt=""
        style={{
          height: "100px",
          width: "80px",
          position: "realative",
          top: "10px",
        }}
        src={imgurlFor(block.coverImage.asset._ref)}
      />
    ) : null;
    return (
      <Block>
        <Text style={{ padding: "7px", fontSize: "12px", textAlign: "left" }}>
          {index + 1}.{block.blockName} <p> </p>
        </Text>
        <Image>{content}</Image>
      </Block>
      // <div style={{ height: "10px", width: "100%" }}></div>
    );
  });

  return (
    <Wrapper>
      <Outline>
        <OverView> OverView</OverView>
        <OverView> Text </OverView>
        <OverView> Text </OverView>
      </Outline>
      {blocks}
    </Wrapper>
  );
}

export default CourseBlockBreakown;

const Wrapper = styled.div`
  display: none;
  transition: 0.3s;
  position: relative;
  z-index: 100;

  @media ${device.tablet} {
    width: 400px;
    padding-top: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    background-color: white;
    min-height: 500px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  }
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 0.2s;

  &:hover {
    background-color: rgba(0, 200, 200, 0);
    color: white;
    transition: 0.2s;
  }
`;

const Outline = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const Block = styled.div`
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  border-radius: 4px;
  background-color: rgba(250, 250, 250, 0.7);

  &:hover {
    background-color: rgba(0, 200, 200, 0.7);
    color: white;
    transition: 0.2s;
  }
`;

const Image = styled.div`
  height: 100%;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  @media ${device.mobileL} {
  }
`;

const OverView = styled.div`
  height: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  // padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  border-radius: 4px;
  background-color: rgba(250, 250, 250, 0.7);

  &:hover {
    background-color: rgba(0, 200, 200, 0.7);
    color: white;
    transition: 0.2s;
  }
`;
