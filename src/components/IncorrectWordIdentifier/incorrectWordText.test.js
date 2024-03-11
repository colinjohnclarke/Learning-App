import { render, screen } from "@testing-library/react";
import IncorrectWordText from "./IncorrectWordText";
import UserContext from "../../App";
import { mockUserData } from "../../tesing/context/mockUserData";
import {mockIncorrectWordData} from './mockIncorrectWordData'


test("if correct word is selected mcq1 is displayed", () => {
  const mockFunction = jest.fn();

  render(
    <UserContext.Provider value={mockUserData}>
      <IncorrectWordText
        updateStateFunctions={mockFunction}
        data={mockIncorrectWordData}
        index={1}
      />
    </UserContext.Provider>
  );
});
