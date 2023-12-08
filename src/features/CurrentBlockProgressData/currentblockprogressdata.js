import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // provide data from user navigating through slides so can uodate progress bar and render quiz when last slide has been observed
  currentSlide: 0,
  allSlidesSeen: false,
  slideNumber: 0,
  // set initial state for number of correct questions scored in a row
  userScore: 0,
  pointsAvailable: 0,
  //save array of scores in arr with object with block name and score
  blockCompleted: false,
  percentageScore: 0,
  questionsAttempted: 0,
};

export const currentblockprogressdata = createSlice({
  name: "currentblockprogressdata",
  initialState,
  reducers: {
    userScore: (state, action) => {
      state.userScore = action.payload;
    },
    updateUserScore: (state) => {
      state.userScore += 1;

      // need to update action
    },
    updatePointsAvailable: (state, action) => {
      return {
        ...state,
        pointsAvailable: state.pointsAvailable + action.payload,
      };
    },
    reverseUpdatePointsAvailable: (state, action) => {
      return {
        ...state,
        pointsAvailable: state.pointsAvailable - action.payload,
      };
    },

    updatePercentage: (state, action) => {
      state.percentageScore = action.payload;
    },
    updateQuestionsAttempted: (state, action) => {
      state.questionsAttempted += 1;
    },

    updateBlockCompleted: (state) => {
      state.blockCompleted = true;
    },
    updateCurrentSlide: (state, action) => {
      state.currentSlide = action.payload;
    },
    updateAllSlidesSeen: (state) => {
      state.allSlidesSeen = true;
    },
    updateSlideNumber: (state, action) => {
      state.slideNumber = action.payload;
    },

    resetUserScore: (state) => {
      state.userScore = 0;
    },
    resetAllSlidesSeen: (state) => {
      state.allSlidesSeen = false;
    },
    resetBlockedCompleted: (state) => {
      state.blockCompleted = false;
    },
    resetPointsAvailableArr: (state) => {
      state.pointsAvaiableArr = [];
    },
    resetSlideNumber: (state) => {
      state.slideNumber = 0;
    },
  },
});

export const {
  // slide show updater functions
  updateCurrentSlide,
  updateAllSlidesSeen,
  updateSlideNumber,
  updateStartQuiz,

  //
  userScore,
  updateUserScore,
  updatePointsAvailable,
  totalScore,
  updatePercentage,
  reverseUpdatePointsAvailable,
  updateQuestionsAttempted,
  updateDisplayAnimatedBlockScore,
  updateDisplayPostBlockPointsReveal,
  updateBlockCompleted,

  // reset State
  resetUserScore,
  resetAllSlidesSeen,
  resetBlockedCompleted,
  resetPointsAvailableArr,
  resetSlideNumber,
} = currentblockprogressdata.actions;

export default currentblockprogressdata.reducer;
