import React, { useState, useEffect } from "react";
import styled from "styled-components";

function MCQTeacherResponse(props) {
  const [response, setResponse] = useState("hsjdj");

  // console.log("PROPSRESPONSE", props);

  return (
    <div>
      <p> {response}</p>
    </div>
  );
}

export default MCQTeacherResponse;
