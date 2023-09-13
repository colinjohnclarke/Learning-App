import { createContext } from "react";

const initialState = {
  rerunRandomiseRequired: false,
  index0AnswerisCorrect: false,
  index0AnswerisInCorrect: false,
  index1AnswerisCorrect: false,
  index1AnswerisInCorrect: false,
};

export const SliderContext = createContext(initialState);
