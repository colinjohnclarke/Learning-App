import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  position: 0,
  completedTextSlideShow: false,
};

export const textslideshowslice = createSlice({
  name: "textslideshowslice",
  initialState,
  reducers: {
    updatePosition: (state) => {
      state.position += 1;
    },

    updateCompletedSlideShow: (state) => {
      state.completedTextSlideShow = true;
    },
    moveDesktopPositionForward: (state) => {
      state.position = state.position + 1;
    },
    moveDesktopPositionBack: (state) => {
      state.position = state.position - 1;
    },
    resetPosition: (state) => {
      state.position = 0;
    },
    settoLastSlide: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const {
  updatePosition,
  updateCompletedSlideShow,
  moveDesktopPositionForward,
  moveDesktopPositionBack,
  resetPosition,
  settoLastSlide,
} = textslideshowslice.actions;

export default textslideshowslice.reducer;
