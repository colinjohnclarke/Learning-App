import { render, screen } from "@testing-library/react";
import DashboardWelcome from "./DashboardWelcome";
import { UserContext } from "../../../App";
import "@testing-library/jest-dom";

describe.only("Dashboard Welcome", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.only("Welcome message displayed", () => {
    // Mock the UserContext value
    const mockUserContextValue = {
      userData: {
        user: {
          firstName: "John",
        },
      },
      darkThemeActive: true,
    };

    render(
      <UserContext.Provider value={mockUserContextValue}>
        <DashboardWelcome />
      </UserContext.Provider>
    );

    const welcomeMessage = screen.getByText(/Welcome John/i);
    expect(welcomeMessage).toBeInTheDocument();

    const weekdayComponent = screen.getByTestId("dashboard-weekday");
    expect(weekdayComponent).toBeInTheDocument();
  });
});
