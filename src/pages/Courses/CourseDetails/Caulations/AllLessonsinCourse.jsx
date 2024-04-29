import React from "react";

function AllLessonsinCourse(course) {
  const lessons = [];

  const topics = course[0];

  const ordered = topics?.topics.sort((a, b) => {
    return a.topicPositionInCourse - b.topicPositionInCourse;
  });

  ordered?.forEach((topic) => {
    topic.subtopic?.forEach((subtopic) => {
      subtopic.lessons?.forEach((lesson) => lessons.push(lesson.name));
    });
  });

  return lessons;
}

export default AllLessonsinCourse;
