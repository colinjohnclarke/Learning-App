import React, { useContext } from "react";
import styled from "styled-components";
import LastWeekDates from "./LastWeekDates";
import DataFromPrevWeek from "./DataFromPrevWeek";

function FlameDayStreak() {
  const dataFromPrevWeek = DataFromPrevWeek();
  const lastWeekDates = LastWeekDates();

  const uniqueArray = [];

  if (dataFromPrevWeek) {
    for (let i = 0; i < dataFromPrevWeek.length; i++) {
      if (
        uniqueArray.indexOf(dataFromPrevWeek[i].timeStamp.substring(0, 10)) ===
        -1
      ) {
        uniqueArray.push(dataFromPrevWeek[i].timeStamp.substring(0, 10));
      }
    }
  }

  uniqueArray.sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  // check to see which dates present are in the chronolgical list.
  const dayStreakList = uniqueArray
    .map((date, index) => {
      if (date === lastWeekDates[index]) return date;
    })
    .filter((date) => {
      return date !== undefined;
    });

  let content = (
    <Wrapper>
      {" "}
      <div class="flameContainerOff">
        <div style={{ opacity: "0.2" }} class="red flame "></div>
        <div style={{ opacity: "0.2" }} class="orange flame "></div>
        <div style={{ opacity: "0.2" }} class="yellow flame"></div>
        <div class="white flame">
          {" "}
          <div></div>
          <p style={{ fontSize: "12px", color: "white" }}>
            {dayStreakList.length}
          </p>
        </div>
      </div>
    </Wrapper>
  );

  if (dayStreakList.length) {
    content = (
      <Wrapper>
        <div class="flameContainer">
          <div class="red flame"></div>
          <div class="orange flame"></div>
          <div class="yellow flame"></div>
          <div class="white flame">
            {" "}
            <p style={{ fontSize: "11px", color: "white" }}>
              {dayStreakList.length}
            </p>
          </div>
        </div>
        <p style={{ fontSize: "12px" }}> &nbsp; </p>
      </Wrapper>
    );
  }

  return content;
}

export default FlameDayStreak;

const Wrapper = styled.div`
  display: flex;
`;
