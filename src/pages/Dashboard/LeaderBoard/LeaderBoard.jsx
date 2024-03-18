import React from "react";

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
  width: 100%;
`;
