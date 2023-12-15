import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
// import CourseBlockBreakown from "./CourseBlockBreakown";
import DashboardHeader from "../Dashboard/DashboardHeader";
import { device } from "../../styles/breakpoints";
import "animate.css";

import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function CourseBlockBreakown({ data, controllers }) {
  const { breakdownDisplayed, setBreakdownIsDisplayed } = controllers;

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
      <Box>
        <Text style={{ fontSize: "12px", fontWeight: "500" }}>
          Part&nbsp; {index + 1}) &nbsp;{block.blockName}
        </Text>
        <Image>{content}</Image>
      </Box>
      // <div style={{ height: "10px", width: "100%" }}></div>
    );
  });

  <Wrapper>
    <OverView> Overview of course...</OverView>
    <Outline>
      {/* <OverView> Text </OverView>
        <OverView> Text </OverView> */}
    </Outline>
    {blocks}
  </Wrapper>;
}

export default CourseBlockBreakown;

const Wrapper = styled.div`
  transition: 0.3s;

  @media ${device.tablet} {
    padding: 10px;
    width: 400px;
    padding-top: 50px;
    // display: ${(props) => (props.breakdownDisplayed ? "flex" : "none")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    background-color: white;
    box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
    border-radius: 5px;
    padding: 15px;
  }
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  transition: 0.2s;
  padding: 10px;
`;

const Outline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  width: 96%;
`;

const Box = styled.a`
  height: 50px;
  width: 100%;
  min-width: 290px;
  padding: 4px;
  margin: 3px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 30px 4px rgba(174, 196, 216, 0.25);
  background-color: rgb(255, 255, 255);

  &:hover {
    box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
      rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;
    background-color: rgb(39, 106, 245, 0.05);
  }
`;

const Image = styled.div`
  height: 100%;
  clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
  border-radius: 5px;
  @media ${device.mobileL} {
  }
`;

const OverView = styled.div`
  min-height: 50px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  padding: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  border-radius: 5px;
  box-shadow: rgb(0, 255, 255) 0px 0px 2px 1px,
    rgb(39, 106, 245, 0.7) 2px 2px 2px 1px;

  // color: white;
  font-weight: 500;
`;
