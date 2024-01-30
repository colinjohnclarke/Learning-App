import React, { useContext } from "react";
import styled from "styled-components";
import LastWeekDates from "./LastWeekDates";
import DataFromPrevWeek from "./DataFromPrevWeek";

export const arrOfDatesQuiZCompletedLastWeek = [];

function FlameDayStreak() {
  const dataFromPrevWeek = DataFromPrevWeek();
  console.log("🚀 ~ FlameDayStreak ~ dataFromPrevWeek:", dataFromPrevWeek);
  const lastWeekDates = LastWeekDates();
  console.log("🚀 ~ FlameDayStreak ~ lastWeekDates:", lastWeekDates);

  if (dataFromPrevWeek) {
    for (let i = 0; i < dataFromPrevWeek.length; i++) {
      if (
        arrOfDatesQuiZCompletedLastWeek.indexOf(
          dataFromPrevWeek[i].timeStamp.substring(0, 10)
        ) === -1
      ) {
        arrOfDatesQuiZCompletedLastWeek.push(
          dataFromPrevWeek[i].timeStamp.substring(0, 10)
        );
      }
    }
  }

  arrOfDatesQuiZCompletedLastWeek.sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  console.log(
    "🚀 ~ FlameDayStreak ~ arrOfDatesQuiZCompletedLastWeek:",
    arrOfDatesQuiZCompletedLastWeek
  );
  // check to see which dates present are in the chronolgical list.
  // const dayStreakList = arrOfDatesQuiZCompletedLastWeek
  //   .map((date, index) => {
  //     if (date === lastWeekDates[index + 1]) return date;
  //   })
  //   .filter((date) => {
  //     return date !== undefined;
  //   });

  // console.log("🚀 ~ FlameDayStreak ~ dayStreakList:", dayStreakList);

  let count = 0;

  for (let index = 0; index < lastWeekDates.length; index++) {
    const element = lastWeekDates[index];
    if (arrOfDatesQuiZCompletedLastWeek.includes(element)) {
      count++;
    } else {
      break;
    }
  }

  console.log("🚀 ~ FlameDayStreak ~ count:", count);
  // const dayStreak = lastWeekDates

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
          <p style={{ fontSize: "12px", color: "white" }}>{count}</p>
        </div>
      </div>
    </Wrapper>
  );

  if (count > 0) {
    content = (
      <Wrapper>
        <div class="flameContainer">
          <div class="red flame"></div>
          <div class="orange flame"></div>
          <div class="yellow flame"></div>
          <div class="white flame">
            {" "}
            <p style={{ fontSize: "11px", color: "white" }}>{count}</p>
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
