import { configureStore } from "@reduxjs/toolkit";

import sliderquestiondataSliceIndex0reducer from "../features/DualSelection/dualselectionquestiondataSliceIndex0";
import sliderquestiondataSliceIndex1reducer from "../features/DualSelection/dualselectionquestiondataSliceIndex1";

import draganddropreducer from "../features/draganddropdataSlice";
import sliderreducerindex0 from "../features/Slider/sliderindex0slice";

export const store = configureStore({
  reducer: {
    sliderquestiondataSliceIndex0reducer,
    sliderquestiondataSliceIndex1reducer,
    draganddropreducer,
    sliderreducerindex0,
  },
});
