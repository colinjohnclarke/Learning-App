import { useEffect, useState } from "react";
import sanityClient from "../../../createclient";

function FetchCourseBreakdownFromSanity(courseName, courseCode) {
  const [queryResult, setQueryResult] = useState([]);
  console.log(
    "🚀 ~ FetchCourseBreakdownFromSanity ~ queryResult:",
    queryResult
  );

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'courses' && courseName == '${courseName}' && courseCode == '${courseCode}' ] {
            courseName, 
            coverImage, 
              subject[]->{name}, 
            topics[]-> {
            topicName,
            coverImage, 
            topicPositionInCourse,
            subtopic[]->{
                subTopicName,
                subTopicPosition,
                coverImage, 
                lessons[]->{name,coverImage}
              }
            }, 
             
          }`
      )
      .then((result) => setQueryResult((res) => result))
      .catch(console.error);
  }, []);

  return queryResult;
}

export default FetchCourseBreakdownFromSanity;
