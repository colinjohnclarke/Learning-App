import React, { useEffect, useState } from "react";
import sanityClient from "../../../createclient";

function FetchCoursefromSanity() {
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "Blocks"]`)
      .then((result) => setQueryResult((res) => result))
      .catch(console.error);
  }, []);

  return queryResult;
}

export default FetchCoursefromSanity;
