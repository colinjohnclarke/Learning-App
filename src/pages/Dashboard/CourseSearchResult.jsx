import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { device } from "../../styles/breakpoints";

function CourseSearchResult({ data }) {
  const newArr = data ? [...data] : [];

  const searchResults = newArr?.map((item) => {
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
                  fontSize: "12px",
                  listStyle: "none",
                  paddingLeft: "10px",
                  fontWeight: "600",
                }}
              >
                {item.subject} :
              </p>
              <p
                style={{
                  fontSize: "12px",
                  listStyle: "none",
                  paddingLeft: "10px",
                }}
              >
                {item.courseName}
              </p>
            </Text>

            <Image src={item.imageUrl}></Image>
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
  // border: 1px solid;
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

  border-radius: 5px;
  max-width: 70px;
  min-width: 70px;

  @media ${device.mobileL} {
    max-width: 100px;
    min-width: 100px;
  }
`;
