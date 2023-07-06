import React from "react";
import MovingSlider from "./MovingSlider";

function MovingSliderWrapper(props) {
  const data = props.data;

  return data?.map((item, index) => {
    return (
      <MovingSlider key={item._key} data={item} index={index}></MovingSlider>
    );
  });
}

export default MovingSliderWrapper;
