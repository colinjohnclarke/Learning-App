import React from "react";
import { useState, useEffect } from "react";
import test_api from "../../services/test_api";

function SubjectsList() {
  const [data, setData] = useState();

  let content_from_api = "subjects";

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const url = `https://bkqykpjz.api.sanity.io/v2021-10-21/data/query/production?query=*%20%5B_type%20%3D%3D%20'${content_from_api}'%20%5D%20%0A`;

    const response = await test_api(url);

    setData(response);
  };

  return (
    <div>
      {data?.map((item) => {
        return (
          <div key={item._id}>
            <h2>{item.name}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default SubjectsList;
