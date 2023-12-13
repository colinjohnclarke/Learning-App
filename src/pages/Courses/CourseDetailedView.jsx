import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import FetchCoursefromSanity from "../Dashboard/CourseFilter/FetchCoursefromSanity";
import CourseBlockBreakown from "./CourseBlockBreakown";
import DashboardHeader from "../Dashboard/DashboardHeader";

import sanityClient from "../../createclient";
import imageUrlBuilder from "@sanity/image-url";

function CourseDetailedView() {
  const { subject, courseName } = useParams();

  const builder = imageUrlBuilder(sanityClient);

  const imgurlFor = (source) => {
    return builder.image(source);
  };

  const course = FetchCoursefromSanity();

  // const img = (
  //   <img
  //     alt=""
  //     style={{
  //       height: "100px",
  //       width: "100px",
  //     }}
  //     src={imgurlFor(item.coverImage.asset._ref)}
  //   />
  // );

  const blocks = course.filter((course) => {
    return course.courseName === courseName;
  });

  console.log(
    "🚀 ~ file: CourseDetailedView.jsx:18 ~ blocks ~ blocks:",
    blocks
  );

  return (
    <Main>
      <DashboardHeader />
      <Wrapper>
        <CourseBlockBreakown data={blocks}></CourseBlockBreakown>{" "}
        <Header>
          <h1 style={{ fontWeight: "500", fontSize: "1.5rem" }}>
            {subject} : {courseName}
          </h1>
          
        </Header>
      </Wrapper>
    </Main>
  );
}

export default CourseDetailedView;

const Wrapper = styled.div`
  background-color: white;
  padding-top: 50px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  // border: 10px solid yellow;
`;

const Main = styled.div`
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  border: 2px solid green;
  padding-top: 50px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // // align-items:
  flex-direction: column;
`;
