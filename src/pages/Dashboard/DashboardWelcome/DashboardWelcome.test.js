import { render, screen } from "@testing-library/react";
import DashboardWelcome from "./DashboardWelcome";
import { UserContext } from "../../../App";
import "@testing-library/jest-dom";
import { mockUserData } from "../../../tesing/context/mockUserData";

describe("Dashboard Welcome", () => {
  test("Welcome message displayed", () => {
    render(
      <UserContext.Provider value={mockUserData}>
        <DashboardWelcome />
      </UserContext.Provider>
    );

    screen.debug();
    const welcomeMessage = screen.getByText(/Welcome testFirstName/i);
    expect(welcomeMessage).toBeInTheDocument();

    const weekdayComponent = screen.getByTestId("dashboard-weekday");
    expect(weekdayComponent).toBeInTheDocument();
  });
});
