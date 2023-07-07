import { createContext } from "react";

const initialState = [
  {
    index0ItemisCorrect: false,
    index0ItemisInCorrect: false,
    index1ItemisCorrect: false,
    index1ItemisInCorrect: false,
    index2ItemisCorrect: false,
    index2ItemisInCorrect: false,
  },
];

export const MCQcontext = createContext(initialState);
