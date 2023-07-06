import React from "react";
import GapFill from "./GapFill";

function GapFillWrapper(props) {
  const data = props.data;

  return data?.map((item, index) => (
    <GapFill key={item._key} index={index} item={item}></GapFill>
  ));
}

export default GapFillWrapper;
