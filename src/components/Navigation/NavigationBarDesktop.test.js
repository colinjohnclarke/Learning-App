import NavigationBarDesktop from "./NavigationBarDesktop";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("displays Navigation", () => {
  render(
    <MemoryRouter initialEntries={["/dashboard"]}>
      <NavigationBarDesktop />
    </MemoryRouter>
  );
  screen.debug();
  const links = screen.getAllByRole("link");
  expect(links.length).toBe(3);

  const dashLink = screen.getByRole("link", { name: /courses/i });
  expect(dashLink).toHaveAttribute("href");
});
