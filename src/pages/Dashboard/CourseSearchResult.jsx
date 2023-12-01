import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";
import { defaultCoursesImages } from "./CourseFilter/DefaultCourseImages";

function CourseSearchResult({ data }) {
  const newArr = data ? [...data] : [];

  const searchResults = newArr?.map((item) => {
    let imgurl = defaultCoursesImages.find((subItem) => {
      return subItem.subject === item.subject;
    });

    return (
      <Wrapper>
        <Link
          style={{ display: "flex", width: "100%", textDecoration: "none" }}
          to={"/courses/biology"}
        >
          <Box>
            <Text>
              <p
                style={{
                  fontSize: "13px",
                  listStyle: "none",
                  paddingLeft: "10px",
                  fontWeight: "600",
                }}
              >
                {item.subject} :
              </p>
              <p
                style={{
                  fontSize: "13px",
                  listStyle: "none",
                  paddingLeft: "10px",
                }}
              >
                {item.courseName}
              </p>
            </Text>

            <Image
              src={
                imgurl
                  ? imgurl.imageUrl
                  : "https://stpauls.fra1.digitaloceanspaces.com/wp-content/uploads/2022/04/28130914/SPS-logo-centred-POS.png"
              }
            ></Image>
          </Box>
        </Link>
      </Wrapper>
    );
  });

  return searchResults;
}

export default CourseSearchResult;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Box = styled.a`
  height: 60px;
  width: 100%;
  min-width: 290px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  background-color: rgb(255, 255, 255);
  transition: 0.4s;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200);
    transition: 0.4s;
  }
`;

const Text = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Image = styled.img`
  height: 100%;
  width: 33.3%;
  border-radius: 5px;
  max-width: 100px;
  min-width: 100px;

  @media ${device.mobileL} {
    max-width: 100px;
    min-width: 100px;
  }
`;
