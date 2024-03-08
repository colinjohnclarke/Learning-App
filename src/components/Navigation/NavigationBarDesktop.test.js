import NavigationBarDesktop from "./NavigationBarDesktop";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

test("displays Navigation", () => {
  render(
    <MemoryRouter>
      <NavigationBarDesktop />
    </MemoryRouter>
  );
  screen.debug();
  const links = screen.getAllByRole("link");
  expect(links.length).toBe(3);

  const dashLink = screen.getByRole("link", { name: /dashboard/i });
  expect(dashLink).toHaveAttribute("href");
  userEvent.click(dashLink);
});
