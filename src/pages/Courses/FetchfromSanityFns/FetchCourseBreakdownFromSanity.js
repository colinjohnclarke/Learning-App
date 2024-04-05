import { useEffect, useState } from "react";
import sanityClient from "../../../createclient";

function FetchCourseBreakdownFromSanity(courseName, courseCode) {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'courses' && courseName == '${courseName}' && courseCode == '${courseCode}' ] {
            courseName, 
              subject[]->{name}, 
            topics[]-> {
            topicName,
            topicPositionInCourse,
            subtopic[]->{
                subTopicName,
                subTopicPosition,
                lessons[]->{name}
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
