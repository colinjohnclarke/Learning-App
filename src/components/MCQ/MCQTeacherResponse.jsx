import React, { useState, useEffect } from "react";
import styled from "styled-components";

function MCQTeacherResponse(props) {
  const [response, setResponse] = useState("");

  return (
    <div>
      <p> {response}</p>
    </div>
  );
}

export default MCQTeacherResponse;
