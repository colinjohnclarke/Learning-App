import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const sliderquestiondataSliceIndex1 = createSlice({
  name: "sliderquestiondataSliceIndex0reducer",
  initialState,
  reducers: {
    correctAnswerSelectedIndex1: (state) => {
      state.value.push(true);
    },
    correctAnswerUNSelectedIndex1: (state) => {
      state.value.pop(true);
    },
    resetSliderSelectionIndex1: (state) => {
      state.value = [];
    },
  },
});

export const {
  correctAnswerSelectedIndex1,
  correctAnswerUNSelectedIndex1,
  resetSliderSelectionIndex1,
} = sliderquestiondataSliceIndex1.actions;

export default sliderquestiondataSliceIndex1.reducer;
