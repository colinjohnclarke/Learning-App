import React from "react";
import { useState } from "react";
import test_api from "../../services/test_api";

function Testingapi() {
  const [data, setData] = useState();

  let content_from_api = "subjects";

  const url = `https://bkqykpjz.api.sanity.io/v2021-10-21/data/query/production?query=*%20%5B_type%20%3D%3D%20'${content_from_api}'%20%5D%20%0A`;

  const getdata = test_api(url);

  // setData(getdata);

  return (
    <div>
      <h1>djfdkjfk</h1>

    
    </div>
  );
}

export default Testingapi;
