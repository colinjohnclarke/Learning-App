import { configureStore } from "@reduxjs/toolkit";
import sliderquestiondataSliceIndex0reducer from "../redux/DualSelection/dualselectionquestiondataSliceIndex0";
import sliderquestiondataSliceIndex1reducer from "../redux/DualSelection/dualselectionquestiondataSliceIndex1";
import draganddropreducer from "../redux/draganddropdataSlice";
import sliderSliceIndex0reducer from "../redux/Slider/sliderindex0slice";
import progressbarreducer from "../redux/ProgressBar/ProgressBar";
import drawerSlice from "../redux/Drawer/DrawerSlice";
import currentblockprogressdata from "../redux/CurrentBlockProgressData/currentblockprogressdata";
import mathsMCQSlice from "../redux/MCQ/mathsMCQSlice";
import { userDataSlice } from "../redux/api/UserData/userDataSlice";
import { enrolledCourseDataSlice } from "../redux/api/UserData/enrolledCourseDataSlice";
import { dailyXpGoalSlice } from "../redux/api/UserData/dailyXPGoal";
import { userSchoolSlice } from "../redux/api/UserData/userSchool";
import { updateUserSchoolSlice } from "../redux/api/UserData/updateUserSchool";
import { schoolXPpointsSlice } from "../redux/api/UserData/SchoolData/schoolXPoints";
import { updatePersonalInformationSlice } from "../redux/api/UserData/updatePersonalInformation";
import { updateUserNamesSlice } from "../redux/api/UserData/updateUserNames";

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
