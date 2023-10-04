import React, { useEffect, useState } from "react";
import sanityClient from "../createclient";
import BlockText from "../config/sanity/BlockText";

function Testmath() {
  const [data, setData] = useState();

  // let content_from_api = "algebra";
  // let content_name = "test";

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "algebra"]`)
      .then((result) => setData(result[0]))
      .catch(console.error);
  }, []);

  return <BlockText data={data}></BlockText>;
}

export default Testmath;
