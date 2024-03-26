import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateBlockCompleted,
  resetUserScore,
  resetAllSlidesSeen,
  resetBlockedCompleted,
  resetPointsAvailableArr,
  resetSlideNumber,
  updatePercentage,
} from "../../../redux/CurrentBlockProgressData/currentblockprogressdata";

import { updateProgressPercentage } from "../../../redux/ProgressBar/ProgressBar";

function MainUpdate({
  displayedComponentCount,
  courseLength,
  userId,
  subject,
  blockName,
  courseName,
  updateUserDataFN,
  updateEnrolledCourseFN,
  showPointsSummary,
}) {
  const [blockDataSubmittedtoDB, setBlockDataSubmittedtoDB] = useState(false);
  const startTimeRef = useRef(Date.now());
  const dispatch = useDispatch();

  let currentblockprogressdata = useSelector(
    (state) => state.currentblockprogressdata
  );

  let slideVal = 0;
  let calculateProgress = 0;
  let numOfDisplayedItems = 0;
  let totalLengthofCourse = courseLength + currentblockprogressdata.slideNumber;

  // calculate current poistion in text Slideshow

  useEffect(() => {
    console.log(currentblockprogressdata.calculateProgress);
    if (currentblockprogressdata.allSlidesSeen) {
      slideVal = currentblockprogressdata.slideNumber;
    } else slideVal = currentblockprogressdata.currentSlide;

    let currentPositioninCourse = 0;

    currentPositioninCourse = displayedComponentCount - 2 + slideVal;

    if (!showPointsSummary) {
      calculateProgress = (currentPositioninCourse / totalLengthofCourse) * 100;
      console.log("🚀 ~ useEffect ~ calculateProgress:", calculateProgress);
    } else {
      calculateProgress = 100;
    }

    // dispatch(updatePercentage(calculateProgress));

    dispatch(updateProgressPercentage({ calculateProgress }));

    const updatedDetails = {
      id: userId,
      Subject: subject,
      updateXP: currentblockprogressdata.userScore,
      updateTimeElapsed: Date.now() - startTimeRef.current,
      updatePercentageScore:
        (currentblockprogressdata.userScore /
          currentblockprogressdata.pointsAvailable) *
        100,
    };

    if (showPointsSummary) {
      dispatch(
        updatePercentage(
          (currentblockprogressdata.userScore /
            currentblockprogressdata.pointsAvailable) *
            100
        )
      );
      console.log("submit to DB");
      // setShowPointsSummary((val) => true);

      const updateUserDataFunction = async () => {
        await updateEnrolledCourseFN(updatedDetails);

        // await updateUserData returns user to update local storage after respone

        await updateUserDataFN({
          id: userId,
          updateTimeElapsed: Date.now() - startTimeRef.current,
          quizScores: [
            {
              updateQuizId: blockName,
              updateSubject: subject,
              updateCourseName: courseName,
              updateScore: currentblockprogressdata.userScore,
              // updateCompletionStatus: showPointsSummary,
              updateQuestionsAttempted:
                currentblockprogressdata.questionsAttempted,
              updatePercentageScore:
                (currentblockprogressdata.userScore /
                  currentblockprogressdata.pointsAvailable) *
                100,
            },
          ],
        });
      };
      updateUserDataFunction();
      setBlockDataSubmittedtoDB((val) => true);
    }
  }, [displayedComponentCount, currentblockprogressdata, calculateProgress]);

  // useEffect(() => {
  //   // setSelectedNav((prevState) => ({ courseView: "false" }));
  //   if (blockDataSubmittedtoDB) {
  //     dispatch(updateBlockCompleted());
  //     dispatch(resetUserScore());
  //     dispatch(resetAllSlidesSeen());
  //     dispatch(resetBlockedCompleted());
  //     dispatch(resetPointsAvailableArr());
  //     dispatch(resetSlideNumber());
  //   }
  // }, [blockDataSubmittedtoDB]);

  return null;
}

export default MainUpdate;
