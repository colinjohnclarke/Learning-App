import { configureStore } from "@reduxjs/toolkit";

import sliderquestiondataSliceIndex0reducer from "../features/DualSelection/dualselectionquestiondataSliceIndex0";
import sliderquestiondataSliceIndex1reducer from "../features/DualSelection/dualselectionquestiondataSliceIndex1";

import draganddropreducer from "../features/draganddropdataSlice";
import sliderSliceIndex0reducer from "../features/Slider/sliderindex0slice";
import progressbarreducer from "../features/ProgressBar/ProgressBar";
import drawerSlice from "../features/Drawer/DrawerSlice";
import currentblockprogressdata from "../features/CurrentBlockProgressData/currentblockprogressdata";

import mathsMCQSlice from "../features/MCQ/mathsMCQSlice";

import { userDataSlice } from "../features/api/UserData/userDataSlice";
import { enrolledCourseDataSlice } from "../features/api/UserData/enrolledCourseDataSlice";

export const store = configureStore({
  reducer: {
    sliderquestiondataSliceIndex0reducer,
    sliderquestiondataSliceIndex1reducer,
    draganddropreducer,
    sliderSliceIndex0reducer,
    progressbarreducer,
    drawerSlice,
    currentblockprogressdata,
    mathsMCQSlice,
    [userDataSlice.reducerPath]: userDataSlice.reducer,
    [enrolledCourseDataSlice.reducerPath]: enrolledCourseDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userDataSlice.middleware,
      enrolledCourseDataSlice.middleware
    ),
});
