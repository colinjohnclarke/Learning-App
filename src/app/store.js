import { configureStore } from "@reduxjs/toolkit";

import sliderquestiondataSliceIndex0reducer from "../features/slider/sliderquestiondataSliceIndex0";
import sliderquestiondataSliceIndex1reducer from "../features/slider/sliderquestiondataSliceIndex1";
import draganddropreducer from "../features/draganddropdataSlice";

export const store = configureStore({
  reducer: {
    sliderquestiondataSliceIndex0reducer,
    sliderquestiondataSliceIndex1reducer,
    draganddropreducer,
  },
});
