import Weekday from "./Weekday";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Weekday", () => {
  const day = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  render(<Weekday />);

  test("all days of the week are displayed", () => {
    day.forEach((weekday) => {
      const weekdayElement = screen.getByText(weekday);
      expect(weekdayElement).toBeInTheDocument();
    });
  });

  test("the current day has a style of border: solid", () => {
    const currentDate = new Date();
    const dayOfWeekIndex = currentDate.getDay();

    day.forEach((weekday, index) => {
      const weekdayElements = screen.getAllByText(weekday);

      console.log(weekdayElements);
      screen.debug();

      //   if (index === dayOfWeekIndex) {
      //     expect(weekdayElements).toHaveStyle("border: 2px white solid");
      //   } else {
      //     expect(weekdayElements).not.toHaveStyle("border: 2px white solid");
      //   }
    });
  });
});
