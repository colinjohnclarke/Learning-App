import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // set initial state for number of correct questions scored in a row
  index0CorrectAnswerSelected: false,
  index0INCorrectAnswerSelected: false,
  index1CorrectAnswerSelected: false,
  index1INCorrectAnswerSelected: false,
};

export const mcqslice = createSlice({
  name: "mcqslice",
  initialState,
  reducers: {
    updateIndex0CorrectAnswerSelected: (state) => {
      state.index0CorrectAnswerSelected = true;
    },
    updateIndex0INCorrectAnswerSelected: (state) => {
      state.index0INCorrectAnswerSelected = true;
    },
    updateIndex1CorrectAnswerSelected: (state) => {
      state.index1CorrectAnswerSelected = true;
    },
    updateindex1INCorrectAnswerSelected: (state) => {
      state.index1INCorrectAnswerSelected = true;
    },
  },
});

export const {
  updateIndex0CorrectAnswerSelected,
  updateIndex0INCorrectAnswerSelected,
  updateIndex1CorrectAnswerSelected,
  updateindex1INCorrectAnswerSelected,
} = mcqslice.actions;

export default mcqslice.reducer;
