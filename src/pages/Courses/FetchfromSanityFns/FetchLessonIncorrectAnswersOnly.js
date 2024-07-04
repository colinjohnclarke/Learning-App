import { useEffect, useState } from "react";
import sanityClient from "../../../createclient";

function FetchLessonIncorrectAnswersOnly() {
  const [queryResult, setQueryResult] = useState([]);
  console.log(
    "🚀 ~ FetchLessonIncorrectAnswersOnly ~ queryResult:",
    queryResult
  );

  const lessonName = "1.1.1 Eukaryotes and prokaryotes";

  const courseName = "BiologyGCSEAQA";

  const incorrectAnswer_keyArray = ["9a15225c6edd", "1501390924b0"];

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "${courseName}" && lessonName == "${lessonName}"]`)
      .then((result) => setQueryResult((res) => result[0]))
      .catch(console.error);
  }, []);

  let incorrectAnswerData = [];

  if (queryResult.MCQ_INPUTS) {
    incorrectAnswerData.push(
      ...queryResult.MCQ_INPUTS.filter((item) =>
        incorrectAnswer_keyArray.includes(item._key)
      )
    );
  }

  if (queryResult.incorrect_words_from_text) {
    incorrectAnswerData.push(
      ...queryResult.incorrect_words_from_text.filter((item) =>
        incorrectAnswer_keyArray.includes(item._key)
      )
    );
  }

  console.log("incorrectAnswerData212", incorrectAnswerData);

  return queryResult;
}

export default FetchLessonIncorrectAnswersOnly;
