import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  correct: [],
  renderCompleted: false,
};

export const sliderindex0Slice = createSlice({
  name: "sliderSliceIndex0reducer",
  initialState,
  reducers: {
    index0correctanswerselected: (state, action) => {
      state.value.push(true);
      // state.correct.push(action.payload);
    },
    index0correctanswerUNselected: (state) => {
      state.value.pop(true);
    },
    index0EmptyArr: (state) => {
      state.value = [];
    },
    initialRenderCompleted: (state) => {
      state.renderCompleted = true;
    },
  },
});

export const {
  index0correctanswerselected,
  index0correctanswerUNselected,
  index0EmptyArr,
  initialRenderCompleted,
} = sliderindex0Slice.actions;

export default sliderindex0Slice.reducer;
