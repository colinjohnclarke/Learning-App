import { createSlice } from "@reduxjs/toolkit";

const nobtnselected = { left: false, right: false };

const initialState = {
  // set initial state for number of correct questions scored in a row
  value: 0,
  // set in itoial state for left and right boxes selction to be false for all indexes
  index0position0selected: nobtnselected,
  index0position1selected: nobtnselected,
  index0position2selected: nobtnselected,
  index0position3selected: nobtnselected,
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

    // set button selections to true/false
    index0position0selected: (state, action) => {
      state.index0position0selected = action.payload;
    },
    index0position1selected: (state, action) => {
      state.index0position1selected = action.payload;
    },
    index0position2selected: (state, action) => {
      state.index0position2selected = action.payload;
    },
    index0position3selected: (state, action) => {
      state.index0position3selected = action.payload;
    },

    // reset actions
    resetposition0selection: (state) => {
      state.index0position0selected = nobtnselected;
    },
    resetposition1selection: (state) => {
      state.index0position1selected = nobtnselected;
    },
    resetposition2selection: (state) => {
      state.index0position2selected = nobtnselected;
    },
    resetposition3selection: (state) => {
      state.index0position3selected = nobtnselected;
    },
  },
});

export const {
  incrementindex0,
  decrementindex0,
  settozeroindex0,
  index0position0selected,
  index0position1selected,
  index0position2selected,
  index0position3selected,
  resetposition0selection,
  resetposition1selection,
  resetposition2selection,
  resetposition3selection,
} = sliderquestiondataSliceIndex0.actions;

export default sliderquestiondataSliceIndex0.reducer;

const test = () => {};
// CHANGE d
