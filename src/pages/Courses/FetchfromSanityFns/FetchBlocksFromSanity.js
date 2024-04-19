import { useEffect, useState } from "react";
import sanityClient from "../../../createclient";

function FetchBlocksfromSanity() {
  const [queryResult, setQueryResult] = useState([]);
  console.log("🚀 ~ FetchBlocksfromSanity ~ queryResult:", queryResult)

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "Blocks"]`)
      .then((result) => setQueryResult((res) => result))
      .catch(console.error);
  }, []);

  return queryResult;
}

export default FetchBlocksfromSanity;
