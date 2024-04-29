import React from "react";

function FindNextLessonInCourse({ LessonsinCourse, completedLessons }) {
  let nextLesson = "";
  let courseCompleted = false;

  for (let index = 0; index < LessonsinCourse.length; index++) {
    courseCompleted = completedLessons.some(
      (completedLesson) => completedLesson.blockName === LessonsinCourse[index]
    );

    if (!courseCompleted) {
      nextLesson = LessonsinCourse[index];

      break;
    } else if (courseCompleted) {
      nextLesson = undefined;
    }
  }

  return { nextLesson, courseCompleted };
}

export default FindNextLessonInCourse;
