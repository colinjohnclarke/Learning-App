import React from "react";
import styled from "styled-components";
import LastWeekDates from "./LastWeekDates";
import DataFromPrevWeek from "./DataFromPrevWeek";


export const arrOfDatesQuizCompletedLastWeek = [];

function FlameDayStreak() {
  const dataFromPrevWeek = DataFromPrevWeek();
  const lastWeekDates = LastWeekDates();

  if (dataFromPrevWeek) {
    for (let i = 0; i < dataFromPrevWeek.length; i++) {
      if (
        arrOfDatesQuizCompletedLastWeek.indexOf(
          dataFromPrevWeek[i].timeStamp.substring(0, 10)
        ) === -1
      ) {
        arrOfDatesQuizCompletedLastWeek.push(
          dataFromPrevWeek[i].timeStamp.substring(0, 10)
        );
      }
    }
  }

  arrOfDatesQuizCompletedLastWeek.sort((a, b) => {
    return new Date(b) - new Date(a);
  });
 
  let count = 0;

  const date = new Date();
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  const year = date.getFullYear();
  const today = `${year}-${month}-${day}`;

  if (arrOfDatesQuizCompletedLastWeek.includes(today)) {
    for (let index = 0; index < lastWeekDates.length; index++) {
      const element = lastWeekDates[index];
      if (arrOfDatesQuizCompletedLastWeek.includes(element)) {
        count++;
      } else {
        break;
      }
    }
  } else {
    for (let index = 1; index < lastWeekDates.length; index++) {
      const element = lastWeekDates[index];
      if (arrOfDatesQuizCompletedLastWeek.includes(element)) {
        count++;
      } else {
        break;
      }
    }
  }

  let content = (
    <Wrapper>
      {" "}
      <div class="flameContainerOff">
        <div style={{ opacity: "0.4" }} class="red flame "></div>
        <div style={{ opacity: "0.4" }} class="orange flame "></div>
        <div style={{ opacity: "0.4" }} class="yellow flame"></div>
        <div class="white flame">
          {" "}
          <div> </div>
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
