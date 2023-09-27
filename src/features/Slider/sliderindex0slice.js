import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allSlidersCorrect: false,
  slider1correct: false,
  slider2correct: false,
  slider3correct: false,
  slider4correct: false,
  refreshRenderRequired: false,
  correct: false,
  firstRenderCompleted: false,
  secondRenderCompleted: false,
};

export const sliderindex0Slice = createSlice({
  name: "sliderSliceIndex0reducer",
  initialState,
  reducers: {
    setAllSlidersCorrect: (state) => {
      state.allSlidersCorrect = true;
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
    setslider4correct: (state) => {
      state.slider4correct = true;
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
    setslider4Incorrect: (state) => {
      state.slider4correct = false;
    },

    refreshRenderRequired: (state) => {
      state.refreshRenderRequired = true;
    },
    rerunRandomiseNOTRequired: (state) => {
      state.rerunRandomiseRequired = false;
    },

    setfirstRenderCompleted: (state) => {
      state.firstRenderCompleted = true;
    },
    setSecondRenderCompleted: (state) => {
      state.secondRenderCompleted = true;
    },
    resetRenderCompleted: (state) => {
      state.renderCompleted = false;
    },
  },
});

export const {
  setAllSlidersCorrect,
  setslider1correct,
  setslider2correct,
  setslider3correct,
  setslider4correct,
  setslider1Incorrect,
  setslider2Incorrect,
  setslider3Incorrect,
  setslider4Incorrect,
  setfirstRenderCompleted,
  refreshRenderRequired,
  rerunRandomiseNOTRequired,
  resetRenderCompleted,
  setSecondRenderCompleted,
} = sliderindex0Slice.actions;

export default sliderindex0Slice.reducer;
