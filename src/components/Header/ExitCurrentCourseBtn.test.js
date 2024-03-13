import { render, screen } from "@testing-library/react";
import ExitCurrentCourseModal from "./ExitCurrentCourseModal";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { UserContext } from "../../App";
import { mockUserData } from "../../tesing/context/mockUserData";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";

test("clicking exit course button calls setIsModal fn ", async () => {
  const setModalIsOpen = jest.fn();

  const modalIsOpen = false;
  render(
    <MemoryRouter>
      <UserContext.Provider value={mockUserData}>
        <ExitCurrentCourseModal
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
        ></ExitCurrentCourseModal>
        <ExitBtn data-testid="exitBtn" onClick={setModalIsOpen}>
          {" "}
          <IoMdClose size={24} />
        </ExitBtn>
      </UserContext.Provider>
    </MemoryRouter>
  );
  screen.debug();
  const exitBtn = screen.getByTestId("exitBtn");
  expect(exitBtn).toBeInTheDocument();
  await userEvent.click(exitBtn);
  expect(setModalIsOpen).toHaveBeenCalled();
});

test("modal is rendered when modal set to true  ", async () => {
  const setModalIsOpen = jest.fn();

  const modalIsOpen = true;
  render(
    <MemoryRouter>
      <UserContext.Provider value={mockUserData}>
        <ExitCurrentCourseModal
          setModalIsOpen={setModalIsOpen}
          modalIsOpen={modalIsOpen}
        ></ExitCurrentCourseModal>
        <ExitBtn data-testid="exitBtn" onClick={setModalIsOpen}>
          {" "}
          <IoMdClose size={24} />
        </ExitBtn>
      </UserContext.Provider>
    </MemoryRouter>
  );
  screen.debug();

  const cancel = screen.getByText(/cancel/i);
  expect(cancel).toBeInTheDocument();

  const exitToDashboard = screen.getByText(/Exit to Dashboard/i);
  expect(exitToDashboard).toBeInTheDocument();
});

const ExitBtn = styled.button``;
