import { createContext } from "react";

const initialState = [
  {
    index0AnswerisCorrect: false,
    index0AnswerisInCorrect: false,
    index1AnswerisCorrect: false,
    index1AnswerisInCorrect: false,
  },
];

export const TableFillMissingValuesContext = createContext({ initialState });
