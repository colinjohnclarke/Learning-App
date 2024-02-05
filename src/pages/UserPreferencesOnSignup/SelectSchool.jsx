import React, { useState } from "react";
import { useGetUserSchoolQuery } from "../../features/api/UserData/userSchool";

function SelectSchool() {
  const [schoolQuery, setSchoolQuery] = useState("");

  useGetUserSchoolQuery();

  const handleChange = async () => {};

  return (
    <div>
      <input
        onChange={
          ((e) => {
            setSchoolQuery(e.target.value);
          },
          handleChange())
        }
        type="text"
      />
    </div>
  );
}

export default SelectSchool;
