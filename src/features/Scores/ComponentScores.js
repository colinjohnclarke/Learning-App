import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const componentScore = createSlice({
  name: "componentScore",
  initialState,
  reducers: {
    increment: (state) => (state.value += 1),
  },
});

export const { increment } = componentScore.actions;

export default componentScore.reducer;
