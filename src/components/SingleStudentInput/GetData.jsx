import React, { useState, useEffect } from "react";

import sanityClient from "../../createclient";
import StudentInputForm from "./StudentInputForm";

function GetData() {
  const [data, setData] = useState({});
  const content_from_api = "single_user_answer_input_test";
  const content_name = "mass_units";

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == '${content_from_api}' && name == '${content_name}']`)
      .then((result) => setData(result[0]));
  }, []);



  return <StudentInputForm data={data} />;
}

export default GetData;
