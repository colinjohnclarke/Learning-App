import React from "react";
import Plot from "react-plotly.js";
import Line from "./Line";
import styled from "styled-components";

// component generates a line chart from the  schema shown underscript using plotly

function LineChart(props) {
  const data = props.data;

  return data?.map((item, index) => {
    return <Line key={item._key} index={index} data={item}></Line>;
  });
}

export default LineChart;

// defineField({
//   name: 'line_graph_data',
//   type: 'array',
//   description: 'add trace values',
//   title: 'line_graph_data',
//   of: [
//     defineArrayMember({
//       type: 'object',
//       name: 'tag',
//       fields: [
//         {
//           title: 'chart_title',
//           type: 'string',
//           name: 'chart_title',
//         },
//         {
//           title: 'trace_number',
//           type: 'string',
//           name: 'trace_number',
//         },
//         {
//           title: 'x_axis_name',
//           type: 'string',
//           name: 'x_axis_name',
//         },
//         {
//           title: 'y_axis_name',
//           type: 'string',
//           name: 'y_axis_name',
//         },
//         {
//           title: 'trace_1_label',
//           type: 'string',
//           name: 'trace_1_label',
//         },
//         {
//           title: 'trace_1_x_values',
//           type: 'string',
//           name: 'trace_1_x_values',
//         },
//         {
//           title: 'trace_1_y_values',
//           type: 'string',
//           name: 'trace_1_y_values',
//         },
//         {
//           title: 'trace_2_label',
//           type: 'string',
//           name: 'trace_2_label',
//         },
//         {
//           title: 'trace_2_x_values',
//           type: 'string',
//           name: 'trace_2_x_values',
//         },
//         {
//           title: 'trace_2_y_values',
//           type: 'string',
//           name: 'trace_2_y_values',
//         },
//         {
//           title: 'trace_3_label',
//           type: 'string',
//           name: 'trace_3_label',
//         },
//         {
//           title: 'trace_3_x_values',
//           type: 'string',
//           name: 'trace_3_x_values',
//         },

//         {
//           title: 'trace_3_y_values',
//           type: 'string',
//           name: 'trace_3_y_values',
//         },
//         {
//           title: 'trace_4_label',
//           type: 'string',
//           name: 'trace_4_label',
//         },
//         {
//           title: 'trace_4_x_values',
//           type: 'string',
//           name: 'trace_4_x_values',
//         },
//         {
//           title: 'trace_4_y_values',
//           type: 'string',
//           name: 'trace_4_y_values',
//         },
//       ],
//     }),
//   ],
// }),
