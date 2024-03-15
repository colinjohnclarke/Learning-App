import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const drawerSlice = createSlice({
  name: "drawerSlice",
  initialState,
  reducers: {
    setDrawerIsOpen: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setDrawerIsOpen } = drawerSlice.actions;

export default drawerSlice.reducer;
