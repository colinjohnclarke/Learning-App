import { createSlice } from "@reduxjs/toolkit";

/// needs to be store in DB

const initialState = {
  totalXP: 234,
  //   coursesCompleted: [],
  //   completedBlockData: [],
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
