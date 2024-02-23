import { useEffect, useState } from "react";
import sanityClient from "../../createclient";;

function FetchCoursesFromSanity() {

  const [queryResult, setQueryResult] = useState([]);


  useEffect(() => {
    sanityClient
      .fetch(`*[_type == 'Courses'] {courseName, subject []->, subject_skills []->, education_level []->, examboard []->, coverImage }`)
      .then((result) => setQueryResult((res) => result))
      .catch(console.error);
  }, []);

  return queryResult;
}



export default FetchCoursesFromSanity;
