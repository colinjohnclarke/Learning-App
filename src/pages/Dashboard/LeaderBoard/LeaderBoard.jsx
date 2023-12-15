import React from "react";
import UserLeaderBoard from "./StudentLeaderBoard";
import SchoolLeaderBoard from "./SchoolLeaderBoard";
import styled from "styled-components";
import LeaderBoardSelect from "./LeaderBoardSelect";

function LeaderBoard() {
  return (
    <Wrapper>
      <LeaderBoardSelect />
    </Wrapper>
  );
}

export default LeaderBoard;

const Wrapper = styled.div`
  // margin: 7px;
  width: 100%;
`;
