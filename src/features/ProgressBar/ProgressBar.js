import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // set initial state for number of correct questions scored in a row
  percentage: 0,
};

export const progressbarSlice = createSlice({
  name: "progressbarreducer",
  initialState,
  reducers: {
    updateProgressPercentage: (state, action) => {
      state.percentage = action.payload;
    },
  },
});

export const { updateProgressPercentage } = progressbarSlice.actions;

export default progressbarSlice.reducer;
