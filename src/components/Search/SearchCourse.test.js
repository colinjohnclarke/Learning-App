import { render, screen } from "@testing-library/react";
import SearchCourse from "./SearchCourse";
import { mockUserData } from "../../tesing/context/mockUserData";
import { MemoryRouter } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";

test("search bar terms causes navigation to course page", async () => {
  const navigateMock = jest.fn();
  const mockDarkThemeActive = true;
  const setSearchedResult = jest.fn();
  const searchedResult = "";
  const displaySearchResults = false;

  render(
    <MemoryRouter>
      <UserContext.Provider value={mockUserData}>
        <Outer>
          <Main>
            <Wrapper
              onSubmit={(e) => {
                navigateMock();
              }}
            >
              <div>
                <BsSearch />
              </div>
              <Input
                onChange={(e) => {
                  setSearchedResult(e.target.value);
                }}
                type="text"
                placeholder="Search our courses..."
              ></Input>
              <h1>{searchedResult}</h1>
            </Wrapper>

            {displaySearchResults && (
              <CourseSearchResult data={searchedResult} />
            )}
          </Main>
        </Outer>
      </UserContext.Provider>
    </MemoryRouter>
  );

  screen.debug();

  const form = screen.getByRole("textbox");
  expect(form).toBeInTheDocument();
  const user = userEvent.setup();
  await user.click(form);
  await user.type(form, "test");
  expect(setSearchedResult).toHaveBeenCalled();

  // cant correctly submit the form

  user.type(form, "bio{enter}");
  expect(navigateMock).toHaveBeenCalled();
});

const Wrapper = styled.form``;

const Input = styled.input``;

const Main = styled.div``;

const Box = styled.a``;

const SuggestedCourse = styled.div``;

const Outer = styled.div``;

const SuggestCourseMobile = styled.div``;

const NoResultDesktop = styled.div``;

const NoResultMobile = styled.div``;
