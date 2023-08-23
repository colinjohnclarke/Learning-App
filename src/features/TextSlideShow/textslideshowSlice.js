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
  },
});

export const { updatePosition, updateCompletedSlideShow } =
  textslideshowslice.actions;

export default textslideshowslice.reducer;
