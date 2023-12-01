import React, { useState, useEffect } from "react";
import styled from "styled-components";
import StudentLeaderBoard from "./StudentLeaderBoard";
import SchoolLeaderBoard from "./SchoolLeaderBoard";
import { device } from "../../../styles/breakpoints";

function LeaderBoardSelect() {
  const [schoolLeaderBoardSelected, setSchoolLeaderBoardSelected] =
    useState(false);

  const [studentLeaderBoardSelected, setStudentLeaderBoardSelected] =
    useState(true);

  const handleSchoolLeaderBoardClick = () => {
    setSchoolLeaderBoardSelected((val) => !val);
    setStudentLeaderBoardSelected((val) => !val);
  };

  const handleStudentLeaderBoardClick = () => {
    setStudentLeaderBoardSelected((val) => !val);
    setSchoolLeaderBoardSelected((val) => !val);
  };

  const selected = {
    fontWeight: "500",
    transition: "0.3s",
    color: "rgb(78, 78, 78)",
    textAlign: "center",
    // color: "red",
  };
  const unselected = {
    fontWeight: "500",
    transition: "0.3s",
    color: "#D3D3D3",
    textAlign: "center",
  };

  const selectionbarLeft = {
    transition: "ease-in-out 0.3s",
  };

  const selectionbarRight = {
    transform: "translateX(100%)",
    transition: " ease-in-out 0.3s",
  };

  return (
    <Wrapper>
      <Tags>
        <Select
          style={studentLeaderBoardSelected ? selected : unselected}
          onClick={handleSchoolLeaderBoardClick}
        >
          Student Leaderboard
        </Select>

        <Select
          style={schoolLeaderBoardSelected ? selected : unselected}
          onClick={handleStudentLeaderBoardClick}
        >
          School Leaderboard
        </Select>
      </Tags>

      <SelectionBar
        style={schoolLeaderBoardSelected ? selectionbarRight : selectionbarLeft}
      ></SelectionBar>

      <Main>
        {schoolLeaderBoardSelected && <SchoolLeaderBoard></SchoolLeaderBoard>}

        {studentLeaderBoardSelected && (
          <StudentLeaderBoard></StudentLeaderBoard>
        )}
      </Main>
    </Wrapper>
  );
}

export default LeaderBoardSelect;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justifty-content: flex-start;
`;

const Tags = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justifty-content: flex-start;
`;

const Select = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  @media ${device.tablet} {
    width: 50%;
  }
`;

const SelectionBar = styled.div`
  border-radius: 10px;
  height: 4px;
  width: 50%;
  background: linear-gradient(
    225deg,
    rgba(39, 106, 245, 1) 0%,
    rgba(0, 200, 200, 1) 100%
  );

  @media ${device.tablet} {
    width: 50%;
  }
`;

const Main = styled.div``;
