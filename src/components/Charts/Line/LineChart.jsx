import React from "react";

import Line from "./Line";


// component generates a line chart from the  schema shown underscript using plotly

function LineChart(props) {
  const data = props.data;

  return data?.map((item, index) => {
    return <Line key={item._key} index={index} data={item}></Line>;
  });
}

export default LineChart;
