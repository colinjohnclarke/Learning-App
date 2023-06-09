import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const sliderquestiondataSliceIndex1 = createSlice({
  name: "sliderquestiondataSliceIndex0reducer",
  initialState,
  reducers: {
    incrementindex1: (state) => {
      state.value += 1;
    },
    decrementindex1: (state) => {
      state.value -= 1;
    },
    settozeroindex1: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementindex1, decrementindex1, settozeroindex1 } =
  sliderquestiondataSliceIndex1.actions;

export default sliderquestiondataSliceIndex1.reducer;
