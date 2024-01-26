import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../../styles/breakpoints";
import { UserContext } from "../../App";

function FlameDayStreak() {
  const { userData } = useContext(UserContext);
  // console.log("🚀 ~ FlameDayStreak ~ userData: FLAME", userData);

  // const timestamp = Date.now();
  // const date = new Date(timestamp);
  // console.log("🚀 ~ FlameDayStreak ~ date:", date);

  // const day = date.getDate();
  // console.log("🚀 ~ FlameDayStreak ~ day:", day);

  // const month = date.getMonth();
  // console.log("🚀 ~ FlameDayStreak ~ month:", month + 1);
  // let correctedMonth;

  const monthMapping = {
    0: "01",
    1: "02",
    2: "03",
    3: "04",
    4: "05",
    5: "06",
    6: "07",
    7: "08",
    9: "10",
    10: "11",
    11: "12",
  };

  // const year = date.getFullYear();
  // console.log("🚀 ~ FlameDayStreak ~ year:", year);

  // let dayStreakCount = 0;

  // // function calculates how many blocks completed today
  // userData?.user?.quizScores.forEach((date) => {
  //   const quizData = date?.timeStamp?.substring(0, 10);

  //   const getCorrectMonth = monthMapping[month];

  //   console.log(`date ${year}-${getCorrectMonth}-${day}`);

  //   console.log("quizData", quizData);

  //   if (quizData === `${year}-${getCorrectMonth}-${day}`) {
  //     dayStreakCount++;
  //   }
  // });

  // console.log("dayStreakCount", dayStreakCount);

  // create array of dates for prev 7 days

  const currentDate = new Date();
  const previousDates = [];

  for (let i = 0; i < 7; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - i);
    previousDates.push(previousDate.toISOString().substring(0, 10));
  }

  console.log(previousDates);
  // filter the quiz scores for objects which have a time stamp of last 7 days,

  const filteredData = userData?.user.quizScores.filter((score) => {
    console.log("timstamp in quiz", score.timeStamp.substring(0, 10));

    // if (score.timestamp) {
    return previousDates.includes(score.timeStamp.substring(0, 10));
    // }
    // return false;
  });
  console.log("🚀 ~ filteredData ~ filteredData:", filteredData);

  const uniqueArray = [];

  if (filteredData) {
    for (let i = 0; i < filteredData.length; i++) {
      if (
        uniqueArray.indexOf(filteredData[i].timeStamp.substring(0, 10)) === -1
      ) {
        uniqueArray.push(filteredData[i].timeStamp.substring(0, 10));
      }
    }
  }

  console.log("uniqueArray", uniqueArray);

  let content = (
    <Wrapper>
      {" "}
      <div class="flameContainerOff">
        <div class="red flame "></div>
        <div class="orange flame "></div>
        <div class="yellow flame"></div>
        <div class="white flame">
          {" "}
          <div></div>
          <p style={{ fontSize: "13px", color: "white" }}>
            {uniqueArray.length}
          </p>
        </div>
      </div>
    </Wrapper>
  );

  if (uniqueArray.length) {
    content = (
      <Wrapper>
        <div class="flameContainer">
          <div class="red flame"></div>
          <div class="orange flame"></div>
          <div class="yellow flame"></div>
          <div class="white flame">
            {" "}
            <div></div>
            <p style={{ fontSize: "13px", color: "white" }}>
              {uniqueArray.length}
            </p>
          </div>
        </div>
        <p style={{ fontSize: "13px" }}> &nbsp; </p>
        <Mobile> days</Mobile>
        <Streak> day streak</Streak>
      </Wrapper>
    );
  }

  return content;
}

export default FlameDayStreak;

const Wrapper = styled.div`
  display: flex;
`;

const Streak = styled.p`
  display: none;

  @media (min-width: 500px) {
    display: block;
    font-size: 13px;
  }
`;

const Mobile = styled.p`
  font-size: 13px;

  @media (min-width: 500px) {
    display: none;
  }
`;
