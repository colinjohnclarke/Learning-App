import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const draganddropSlice = createSlice({
  name: "numitemscorrectorder",
  initialState,
  reducers: {
    increment: (state) => (state.value += 1),
  },
});

export const { increment } = draganddropSlice.actions;

export default draganddropSlice.reducer;
