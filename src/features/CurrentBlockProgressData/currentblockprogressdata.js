import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // set initial state for number of correct questions scored in a row
  userScore: 0,
  pointsAvaiableArr: [],
  //save array of scores in arr with object with block name and score
  totalScore: [],
  blockCompleted: false,
  percentageScore: 0,
  questionsAttempted: 0,
  displayAnimatedBlockScore: false,
  diplayPostBlockPointsReveal: false,
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
    updatePointsAvaiableArr: (state, action) => {
      state.pointsAvaiableArr.push(action.payload);
      // create array of all the marks available for each question this will mean that if there are 3 MCQ questions in a row for then 3 potential points will be added to the array
    },
    updatePercentage: (state, action) => {
      state.percentageScore = action.payload;
    },
    updateQuestionsAttempted: (state, action) => {
      state.questionsAttempted += 1;
    },
    updateDisplayAnimatedBlockScore: (state) => {
      state.displayAnimatedBlockScore = !state.displayAnimatedBlockScore;
    },
    updateDisplayPostBlockPointsReveal: (state) => {
      state.diplayPostBlockPointsReveal = !state.diplayPostBlockPointsReveal;
    },
    updateBlockCompleted: (state) => {
      state.blockCompleted = true;
    },
  },
});

export const {
  userScore,
  updateUserScore,
  updatePointsAvaiableArr,
  totalScore,
  updatePercentage,
  updateQuestionsAttempted,
  updateDisplayAnimatedBlockScore,
  updateDisplayPostBlockPointsReveal,
  updateBlockCompleted,
} = currentblockprogressdata.actions;

export default currentblockprogressdata.reducer;
