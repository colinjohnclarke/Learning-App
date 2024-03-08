import { render, screen } from "@testing-library/react";
import DashboardHeader from "./DashboardHeader";
import "@testing-library/jest-dom";
import { UserContext } from "../../../App";
import { mockUserData } from "../../../tesing/context/mockUserData";
import { MemoryRouter } from "react-router-dom";

describe("Dashboard Welcome", () => {
  test("Logo is visible", () => {
    render(
      <UserContext.Provider value={mockUserData}>
        <MemoryRouter>
          {" "}
          <DashboardHeader />
        </MemoryRouter>
      </UserContext.Provider>
    );

    screen.debug();

    const logo = screen.getByTestId("logo");
    expect(logo).toBeInTheDocument();
  });
});
