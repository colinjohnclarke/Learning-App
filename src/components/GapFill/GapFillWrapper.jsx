import React from "react";
import GapFill from "./GapFill";

function GapFillWrapper({ data }) {
  return data?.map((item, index) => (
    <GapFill key={item._key} index={index} data={item}></GapFill>
  ));
}

export default React.memo(GapFillWrapper);
