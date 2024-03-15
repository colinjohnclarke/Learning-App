import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // set initial state for number of correct questions scored in a row
  value: [],
};

export const sliderquestiondataSliceIndex0 = createSlice({
  name: "sliderquestiondataSliceIndex0reducer",
  initialState,
  reducers: {
    correctAnswerSelectedIndex0: (state) => {
      state.value.push(true);
    },

    correctAnswerUNSelectedIndex0: (state) => {
      state.value.pop(true);
    },
    resetSliderSelectionIndex0: (state) => {
      state.value = [];
    },
  },
});

export const {
  correctAnswerSelectedIndex0,
  correctAnswerUNSelectedIndex0,
  resetSliderSelectionIndex0,
} = sliderquestiondataSliceIndex0.actions;

export default sliderquestiondataSliceIndex0.reducer;
