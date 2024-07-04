import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../App";
import { ThemeStyles } from "../../../styles/ThemeStyles";

function Weekday() {
  const { darkThemeActive } = useContext(UserContext);
  const currentDate = new Date();
  const dayOfWeekIndex = currentDate.getDay();
  // Create an array of weekday names

  const day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  const list = day.map((dayofweek, index) => {
    let borderStyle = "2px rgb(99,90,255)  dotted";

    if (dayOfWeekIndex === index) {
      borderStyle = "2px solid rgb(99,90,255)";
    }

    return (
      <Day
        data-testid={dayofweek}
        key={dayofweek}
        style={{ border: borderStyle }}
      >
        <p
          data-testid="weekday-day"
          style={{
            color: darkThemeActive
              ? ThemeStyles.lightThemePrimaryFrontColor
              : ThemeStyles.darkThemePrimaryFontColor,
            fontSize: "12px",
          }}
        >
          {dayofweek}
        </p>
      </Day>
    );
  });

  return <Wrapper data-testid="dashboard-weekday"> {list}</Wrapper>;
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
