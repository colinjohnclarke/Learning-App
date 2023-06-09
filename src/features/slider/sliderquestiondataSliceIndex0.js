import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const sliderquestiondataSliceIndex0 = createSlice({
  name: "sliderquestiondataSliceIndex0reducer",
  initialState,
  reducers: {
    incrementindex0: (state) => {
      state.value += 1;
    },
    decrementindex0: (state) => {
      state.value -= 1;
    },
    settozeroindex0: (state) => {
      state.value = 0;
    },
  },
});

export const { incrementindex0, decrementindex0, settozeroindex0 } =
  sliderquestiondataSliceIndex0.actions;

export default sliderquestiondataSliceIndex0.reducer;
