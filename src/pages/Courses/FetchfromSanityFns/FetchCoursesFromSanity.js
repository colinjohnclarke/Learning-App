import { useEffect, useState } from "react";
import sanityClient from "../../../createclient";

function FetchCoursesFromSanity() {
  const [queryResult, setQueryResult] = useState([]);
  console.log("🚀 ~ FetchCoursesFromSanity ~ queryResult:", queryResult);

  useEffect(() => {
    sanityClient
      .fetch(
        // `*[_type == 'courses'] {topicName, subject []->, subject_skills []->, education_level []->, exam_board []->, coverImage }`

        `*[_type == 'courses'] { courseCode,  courseName, topics[]->, subject[]->, subjectSkills[], educationLevel[]->, examBoard[]->, coverImage }`
      )
      .then((result) => setQueryResult((res) => result))
      .catch(console.error);
  }, []);

  return queryResult;
}

export default FetchCoursesFromSanity;
