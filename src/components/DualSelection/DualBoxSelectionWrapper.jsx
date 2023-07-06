import React from "react";

import DualBoxSelection from "./DualBoxSelection";

function DualSelectionWrapper(props) {
  const data = props.slider;

  return data?.map((item, index) => {
    return <DualBoxSelection key={item._key} index={index} data={item} />;
  });
}

export default DualSelectionWrapper;
