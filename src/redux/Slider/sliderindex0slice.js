import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSlidersCorrect: false,
  slider0correct: false,
  slider1correct: false,
  slider2correct: false,
  slider3correct: false,
};

export const sliderindex0Slice = createSlice({
  name: "sliderSliceIndex0reducer",
  initialState,
  reducers: {
    setAllSlidersCorrect: (state) => {
      state.allSlidersCorrect = true;
    },
    setslider0correct: (state) => {
      state.slider0correct = true;
    },
    setslider1correct: (state) => {
      state.slider1correct = true;
    },
    setslider2correct: (state) => {
      state.slider2correct = true;
    },
    setslider3correct: (state) => {
      state.slider3correct = true;
    },
    setslider0Incorrect: (state) => {
      state.slider0correct = false;
    },
    setslider1Incorrect: (state) => {
      state.slider1correct = false;
    },
    setslider2Incorrect: (state) => {
      state.slider2correct = false;
    },
    setslider3Incorrect: (state) => {
      state.slider3correct = false;
    },
  },
});

export const {
  setAllSlidersCorrect,
  setslider0correct,
  setslider1correct,
  setslider2correct,
  setslider3correct,
  setslider0Incorrect,
  setslider1Incorrect,
  setslider2Incorrect,
  setslider3Incorrect,
} = sliderindex0Slice.actions;

export default sliderindex0Slice.reducer;
