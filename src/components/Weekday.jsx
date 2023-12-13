import React from "react";
import styled from "styled-components";

function Weekday() {
  const currentDate = new Date();
  const dayOfWeekIndex = currentDate.getDay();

  // Create an array of weekday names

  const day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  console.log(day[dayOfWeekIndex]);

  const list = day.map((dayofweek) => {
    let borderStyle = "2px white dotted";

    if (dayofweek === day[dayOfWeekIndex]) {
      borderStyle = "2px white solid";
    }

    return (
      <Day style={{ border: borderStyle }}>
        <p
          style={{
            color: "white",
            fontSize: "12px",
          }}
        >
          {dayofweek}
        </p>
      </Day>
    );
  });

  return <Wrapper> {list}</Wrapper>;
}

export default Weekday;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Day = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  color: red;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 2px;
`;
