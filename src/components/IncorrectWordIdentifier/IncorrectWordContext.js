import { createContext } from "react";

const initialState = [
  {
    // word selection from text
    index0word1selectioncorrect: false,
    index0word2selectioncorrect: false,

    // mcq

    index0mcq1selectioncorrect: false,
    index0mcq1selectionIncorrect: false,

    index0mcq2selectioncorrect: false,
    index0mcq2selectionIncorrect: false,
  },
];

export const IncorrectWordContext = createContext(initialState);
