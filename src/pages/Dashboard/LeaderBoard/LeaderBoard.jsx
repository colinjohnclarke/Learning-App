import React from "react";

import styled from "styled-components";
import LeaderBoardSelect from "./LeaderBoardSelect";
import Border from "../../../components/Border";

function LeaderBoard() {
  return (
    <Wrapper>
      <Border>
        <LeaderBoardSelect />
      </Border>
    </Wrapper>
  );
}

export default LeaderBoard;

const Wrapper = styled.div`
  width: 100%;
`;
