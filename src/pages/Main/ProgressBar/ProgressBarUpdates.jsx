import { useSelector } from "react-redux";

import React from "react";

function ProgressBarUpdates() {
  const currentblockprogressdata = useSelector(
    (state) => state.currentblockprogressdata
  );

  let slideVal = 0;
  let calculateProgress = 0;
  let numOfDisplayedItems = 0;
  let totalLengthofCourse = null;

  // calculate current poistion in text Slideshow

  // if (currentblockprogressdata.allSlidesSeen) {
  //   slideVal = currentblockprogressdata.slideNumber;
  // } else slideVal = currentblockprogressdata.currentSlide;

  // if (itemDisplayed.length) {
  //   totalLengthofCourse =
  //     itemDisplayed.length + currentblockprogressdata.slideNumber;
  // }

  // displayedItems.forEach((item) => {
  console.log("🚀 ~ currentblockprogressdata:", currentblockprogressdata);
  //   if (item.displayed) {
  //     numOfDisplayedItems++;
  //   }
  // });

  // let currentPositioninCourse = 0;

  // currentPositioninCourse = numOfDisplayedItems + slideVal;

  // if (!showPointsSummary) {
  //   calculateProgress =
  //     ((currentPositioninCourse - 1) / totalLengthofCourse) * 100;
  // } else {
  //   calculateProgress = 100;
  // }

  // useEffect(() => {
  //   dispatch(
  //     updatePercentage(
  //       (currentblockprogressdata.userScore /
  //         currentblockprogressdata.pointsAvailable) *
  //         100
  //     )
  //   );

  //   dispatch(updatePercentage(calculateProgress));

  //   dispatch(updateProgressPercentage({ calculateProgress }));
  return <div>ProgressBarUpdates</div>;
}

export default ProgressBarUpdates;
