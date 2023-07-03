import React from "react";
import Plot from "react-plotly.js";

// scatter graph from table data on sanity, only for two variables not suitable!!

function Scatter(props) {
  const standard_tables = props.standard_tables;

  const standard_table_variable_names = props.standard_table_variable_names;
  const variable_1_name = standard_table_variable_names?.variable1_name;
  const variable_2_name = standard_table_variable_names?.variable2_name;

  const namearr = [variable_1_name, variable_2_name];

  const columnDefs = [];

  //   for (let index = 0; namearr[index] !== undefined; index++) {
  //     columnDefs.push({
  //       field: namearr[index],
  //     });
  //   }

  // create two arrays from each data variable
  const variable1Arr = [];
  standard_tables?.map((element) => {
    return variable1Arr.push(element.variable1_value);
  });

  const variable2Arr = [];
  standard_tables?.map((element) => {
    return variable2Arr.push(element.variable2_value);
  });

  let trace1 = {
    x: variable1Arr,
    y: variable2Arr,
    name: "testtrace",
    type: "scatter",
    marker: { color: "red" },
  };

  var layout = {
    title: "",
    xaxis: {
      title: variable_1_name,
    },
    yaxis: {
      title: variable_2_name,
    },
    // width: "100%",
    // height: 400,
    font: {
      family: "Montserrat",
      size: 16,
      color: "rgb(37,37,37)",
    },
  };

  let scatterdataarr = [trace1];

  return (
    <div>
      <Plot data={scatterdataarr} layout={layout}></Plot>
    </div>
  );
}

export default Scatter;
