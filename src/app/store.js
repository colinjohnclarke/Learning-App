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
import { dailyXpGoalSlice } from "../features/api/UserData/dailyXPGoal";
import { userSchoolSlice } from "../features/api/UserData/userSchool";
import { updateUserSchoolSlice } from "../features/api/UserData/updateUserSchool";
import { schoolXPpointsSlice } from "../features/api/UserData/SchoolData/schoolXPoints";
import { updatePersonalInformationSlice } from "../features/api/UserData/updatePersonalInformation";
import { updateUserNamesSlice } from "../features/api/UserData/updateUserNames";

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
    [dailyXpGoalSlice.reducerPath]: dailyXpGoalSlice.reducer,
    [userSchoolSlice.reducerPath]: userSchoolSlice.reducer,
    [updateUserSchoolSlice.reducerPath]: updateUserSchoolSlice.reducer,
    [schoolXPpointsSlice.reducerPath]: schoolXPpointsSlice.reducer,
    [updatePersonalInformationSlice.reducerPath]:
      updatePersonalInformationSlice.reducer,
    [updateUserNamesSlice.reducerPath]: updateUserNamesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userDataSlice.middleware,
      enrolledCourseDataSlice.middleware,
      dailyXpGoalSlice.middleware,
      userSchoolSlice.middleware,
      updateUserSchoolSlice.middleware,
      schoolXPpointsSlice.middleware,
      updatePersonalInformationSlice.middleware,
      updateUserNamesSlice.middleware
    ),
});
