import React from "react";
import { memo } from "react";


const Text = memo(function Text(props) {
  return <p >{props.text}</p>;
});

export default Text;
