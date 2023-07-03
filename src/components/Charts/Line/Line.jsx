import React from "react";
import Plot from "react-plotly.js";

// component to generate Line Graph from schema using plotly

function Line(props) {
  const linedata = props.data;

  const trace_number = linedata.trace_number;

  let trace1 = {};
  let trace2 = {};
  let trace3 = {};
  let trace4 = {};

  let linedataarr = [];

  trace3 = {
    x: linedata.trace_3_x_values?.split(", "),
    y: linedata.trace_3_y_values?.split(", "),
    type: "scatter",
    name: linedata.trace_3_label,
  };

  trace4 = {
    x: linedata.trace_4_x_values?.split(", "),
    y: linedata.trace_4_y_values?.split(", "),
    type: "scatter",
    name: linedata.trace_4_label,
  };

  trace1 = {
    x: linedata.trace_1_x_values?.split(", "),
    y: linedata.trace_1_y_values?.split(", "),
    type: "scatter",
    name: linedata.trace_1_label,
  };

  trace2 = {
    x: linedata.trace_2_x_values?.split(", "),
    y: linedata.trace_2_y_values?.split(", "),
    type: "scatter",
    name: linedata.trace_2_label,
  };

  switch (trace_number) {
    case undefined:
      linedataarr = [];
      break;
    case "1":
      linedataarr.push(trace1);
      break;
    case "2":
      linedataarr.push(trace1, trace2);
      break;
    case "3":
      linedataarr.push(trace1, trace2, trace3);
      break;
    case "4":
      linedataarr.push(trace1, trace2, trace3, trace4);
      break;
    default:
      linedataarr = [];
  }

  var layout = {
    title: `${linedata.chart_title}`,
    xaxis: {
      title: `${linedata.x_axis_name}`,
    },
    yaxis: {
      title: `${linedata.y_axis_name}`,
    },
    width: "50%",
    font: {
      family: "Montserrat",
      size: 10,
      color: "rgb(37,37,37)",
    },
  };

  return (
    <div>
      <Plot data={linedataarr} layout={layout}></Plot>
    </div>
  );
}

export default Line;

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
