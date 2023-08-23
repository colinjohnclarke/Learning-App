import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { recentCourseList } from "./RecentCourseList";

import { device } from "../../styles/breakpoints";

function RecentCourse() {
  return (
    <Wrapper>
      <Header>
        <h2 style={{ fontSize: "13px", fontWeight: "500" }}>Recent Courses</h2>
        <SeeAllBtn>
          <p style={{ fontSize: "13px", fontWeight: "500" }}> see all</p>
        </SeeAllBtn>
      </Header>
      <List>
        {recentCourseList.map((item) => {
          return (
            <Box>
              <Text>
                {" "}
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
          );
        })}
      </List>
    </Wrapper>
  );
}

export default RecentCourse;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Box = styled.a`
  height: 70px;
  width: 100%;
  min-width: 310px;
  // max-width: 420px;
  margin: 4px;
  border-radius: 5px;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 1px 0px;
  background-color: rgb(255, 255, 255);
  transition: 0.4s;

  &:hover {
    transform: translateY(-2px);
    background-color: rgba(0, 200, 200, 0.3);
    transition: 0.4s;
  }

  @media ${device.tablet} {
    width: 49%;
    height: 100px;
    transition: 0s;
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
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border-radius: 5px;
`;

const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const SeeAllBtn = styled.button`
  // // display: flex;

  // // justify-content: center;
  border: none;

  background-color: rgb(240, 245, 250);
`;
