import React from "react";
import FetchLessonIncorrectAnswersOnly from "../../Courses/FetchfromSanityFns/FetchLessonIncorrectAnswersOnly";

function IncorrectAnswersMain() {
  const incorrectAnswers = FetchLessonIncorrectAnswersOnly();
  console.log(
    "🚀 ~ IncorrectAnswersMain ~ incorrectAnswers:",
    incorrectAnswers
  );

  return <div>IncorrectAnswersMain</div>;
}

export default IncorrectAnswersMain;
