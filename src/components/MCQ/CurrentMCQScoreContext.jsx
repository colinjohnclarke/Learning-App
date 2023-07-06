import { createContext } from "react";



const initialState = [
  {
    index0ItemClickedisCorrect: false,
    index0ItemClickedisInCorrect: false,
    index1ItemClickedisCorrect: false,
    index1ItemClickedisInCorrect: false,
    index2ItemClickedisCorrect: false,
    index2ItemClickedisInCorrect: false,
  },
];

export const MCQcontext = createContext(initialState);


