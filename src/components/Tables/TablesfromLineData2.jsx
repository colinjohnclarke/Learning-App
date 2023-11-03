import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Geogebra from "react-geogebra";
// import { GGBApplet } from "react-geogebra";
// import { GeoGebraBook } from "geogebra-embed-api";
// import { GGBApplet } from "geogebra-ggbapplet";
import Test from "../Geogebra/Test";

// export default Test;

function TablesfromLineData2({ data }) {
  const [clicked, setClicked] = useState("");
  const xValues = [];
  const yValues = [];

  let content = [];
  let xAxisHeading;
  let yAxisHeading;

  let tableContent;

  if (data) {
    content = data.map(
      ({
        trace_1_label,
        trace_1_x_values,
        trace_1_y_values,
        trace_2_label,
        trace_2_x_values,
        trace_2_y_values,
        trace_3_label,
        trace_3_x_values,
        trace_3_y_values,
        trace_4_label,
        trace_4_x_values,
        trace_4_y_values,
        trace_number,
        x_axis_name,
        y_axis_name,
      }) => {
        xAxisHeading = x_axis_name;
        yAxisHeading = y_axis_name;

        const valuesSplitArr = [
          {
            label: trace_1_label,
            points: ["A", "B", "C", "D"],
            xValues: trace_1_x_values ? trace_1_x_values.split(", ") : [],
            yValues: trace_1_y_values ? trace_1_y_values.split(", ") : [],
          },
          {
            label: trace_2_label,
            points: ["E", "F", "G", "H"],
            xValues: trace_2_x_values ? trace_2_x_values.split(", ") : [],
            yValues: trace_2_y_values ? trace_2_y_values.split(", ") : [],
          },
          {
            label: trace_3_label,
            points: ["I", "J", "K", "L"],
            xValues: trace_3_x_values ? trace_3_x_values.split(", ") : [],
            yValues: trace_3_y_values ? trace_3_y_values.split(", ") : [],
          },
          {
            label: trace_4_label,
            points: ["M", "N", "O", "P"],
            xValues: trace_4_x_values ? trace_4_x_values.split(", ") : [],
            yValues: trace_4_y_values ? trace_4_y_values.split(", ") : [],
          },
        ];

       

        tableContent = (
          <Table>
            <tbody>
              <Tr>
                <th colSpan={valuesSplitArr.length + 1}>{xAxisHeading}</th>
              </Tr>
              <Tr>
                <Td
                  style={{ writingMode: "vertical-rl" }}
                  rowspan={valuesSplitArr.length + 1}
                >
                  {yAxisHeading}
                </Td>
                <Td></Td>
                {valuesSplitArr[0].xValues.map((val) => (
                  <Td
                    key={val}
                    onClick={() => {
                     
                      setClicked(val);
                    }}
                    //  the heading X values
                  >
                    <strong>{val}</strong>
                  </Td>
                ))}
              </Tr>
              {valuesSplitArr.map((item, index) => {
                // map through each item in valuesSplitArr and then map again through Y values creating table elements
                return (
                  <tr key={index}>
                    <Td>
                      {" "}
                      <strong>{item.label}</strong>
                    </Td>
                    {item.yValues.map((value, valueIndex) => (
                      <Td
                        key={valueIndex}
                        onClick={() => {
                          setClicked(value);
                        }}
                      >
                        {value}
                      </Td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        );

        // console.log("tableContent", tableContent);
        // const tableContent = (
        //   <Table>
        //     <tbody>
        //       <Tr>
        //         <th colSpan={trace_number + 1}>{x_axis_name}</th>
        //       </Tr>

        //       <Tr>
        //         <Td
        //           style={{ writingMode: "vertical-rl" }}
        //           rowspan={trace_number + 1}
        //         >
        //           {" "}
        //           {y_axis_name}{" "}
        //         </Td>
        //         <Td></Td>
        //         {trace_1_x_values &&
        //           valuesSplitArr.split_trace_1_x_values.map((val) => (
        //             <Td
        //               onClick={() => {
        //               
        //                 setClicked(val);
        //               }}
        //             >
        //               <strong>{val}</strong>
        //             </Td>
        //           ))}
        //       </Tr>
        //       <Tr>
        //         {trace_1_label && (
        //           <Td>
        //             <strong>{trace_1_label}</strong>
        //           </Td>
        //         )}
        //         {trace_1_y_values &&
        //           valuesSplitArr.split_trace_1_y_values.map((val) => (
        //             <Td
        //               onClick={() => {
        //                
        //                 setClicked(val);
        //               }}
        //             >
        //               {val}
        //             </Td>
        //           ))}
        //       </Tr>
        //       <Tr>
        //         {trace_2_label && (
        //           <Td>
        //             {" "}
        //             <strong>{trace_2_label}</strong>
        //           </Td>
        //         )}
        //         {trace_2_y_values &&
        //           valuesSplitArr.split_trace_2_y_values.map((val) => (
        //             <Td
        //               onClick={() => {
        //                
        //                 setClicked(val);
        //               }}
        //             >
        //               {val}
        //             </Td>
        //           ))}
        //       </Tr>
        //       <Tr>
        //         {trace_3_label && (
        //           <Td>
        //             {" "}
        //             <strong>{trace_3_label}</strong>
        //           </Td>
        //         )}
        //         {trace_3_y_values &&
        //           valuesSplitArr.split_trace_3_y_values.map((val) => (
        //             <Td
        //               onClick={() => {
        //               
        //                 setClicked(val);
        //               }}
        //             >
        //               {val}
        //             </Td>
        //           ))}
        //       </Tr>
        //       <Tr>
        //         {trace_4_label && (
        //           <Td>
        //             {" "}
        //             <strong>{trace_4_label}</strong>
        //           </Td>
        //         )}
        //         {trace_4_y_values &&
        //           valuesSplitArr.split_trace_4_y_values.map((val) => (
        //             <Td
        //               onClick={() => {
        //                
        //                 setClicked(val);
        //               }}
        //             >
        //               {val}
        //             </Td>
        //           ))}
        //       </Tr>
        //     </tbody>
        //   </Table>
        // );

       

        // const app = window.ggbApplet;

        // const lettersArr = [
        //   "A",
        //   "B",
        //   "C",
        //   "D",
        //   "E",
        //   "F",
        //   "G",
        //   "H",
        //   "I",
        //   "J",
        //   "K",
        //   "L",
        //   "M",
        //   "N",
        //   "O",
        //   "P",
        // ];

        // const handleClick = () => {
        //   const app = window.ggbApplet;

        //   var applet1 = new GGBApplet(
        //     { material_id: "17499", borderColor: "#55FF00" },
        //     true
        //   );

        // app.evalCommand("SetAxesAutoZoom(true)");

        // valuesSplitArr.forEach((trace) => {
        //   trace.xValues.forEach((val, index) => {
        //     app.evalCommand(
        //       `setCoords("${trace.label}", ${val}, ${trace.yValues[index]}  )`
        //     );
        //   });
        // });

        // valuesSplitArr.forEach((trace, mainIndex) => {
        //   trace.yValues.forEach((coord, index) => {
        //     const letter = lettersArr[mainIndex * 4 + index];
        //     app.evalCommand(`${letter}=(${trace.xValues[index]},${coord})`);
        //     // console.log(`${letter}=(${trace.xValues[index]},${coord})`);
        //   });
        // });

        // valuesSplitArr.forEach((trace) => {
        //   app.evalCommand(
        //     `FitLine(${trace.points[0]},${trace.points[1]},${trace.points[2]},${trace.points[3]})`
        //   );
        // });

        // valuesSplitArr.forEach((trace, index) => {

        //   const pointIndex = index;
        //   app.evalCommand(`setColor(${trace.points[pointIndex]},1)`);
        // });

        // valuesSplitArr.forEach((item) => {
        //   app.evalCommand(`setPointStyle()`);
        // });

        // Set the label for the x-axis
        // Set the visibility of the x-axis
        // app.evalCommand("setAxesVisible(true, true)");
        // };

        // const handleClick = () => {
        // const app = window.ggbApplet;

        // var applet1 = new GGBApplet(
        //   { material_id: "17499", borderColor: "#55FF00" },
        //   true
        // );

        //  when used with Math Apps Bundle, uncomment this:
        //  applet1.setHTML5Codebase('GeoGebra/HTML5/5.0/web/');
        // Create applet for file ../ggb/sine-curves.ggb
        // The second parameter forces not to use webSimple (this is necessary when multiple applets are used on one page, if one cannot use webSimple).

        //  when used with Math Apps Bundle, uncomment this:
        //  applet2.setHTML5Codebase('GeoGebra/HTML5/5.0/web/');
        // window.onload = function () {
        //   applet1.inject("applet_container1");
        // };

        // const applet1 = new GGBApplet(
        //   { material_id: "17499", borderColor: "#55FF00" },
        //   true
        // );

        // applet1.inject("applet_container1");
        // // };

        // var applet1 = new GGBApplet(
        //   { material_id: "17499", borderColor: "#55FF00" },
        //   true
        // );

        // window.onload = function () {
        //   applet1.inject("applet_container1");
        // };

        // return (

        // );
      }
    );
  }
  let material_id = "x3frstxn";
  return (
    <Wrapper>
      {/* {content} */}
      {tableContent}
      <p>Selected {clicked}</p>

      <Test material_id={material_id}></Test>
    </Wrapper>
  );
}

// const x_axis_nameTEST = "x-axis";
// const y_axis_nameTEST = "y-axis";

// const objectName = "objectsTST";
// const objects = [
//   { name: "A", x: 2, y: 3 },
//   { name: "B", x: 4, y: 5 },
//   { name: "C", x: 6, y: 7 },
// ];

// const objStyle = 1;

// const xCoord = 0.4;
// const yCoord = -1;

// const app = window.ggbApplet;

// const handleClick = () => {
//   valuesSplitArr.forEach((trace) => {
//     trace.yValues.forEach((coord, index) => {
//       const letters = ["A", "B", "C", "D", "E"];
//       const app = window.ggbApplet;
//       app.evalCommand(`${letters[index]}=(${trace.xValues[index]},${coord})`);
//     });
//   });
// };

// function onClickHandler() {
//   const app = window.ggbApplet;
//   // objects.forEach((coord) => {
//   //   app.evalCommand(`${coord.name}=(${coord.x},${coord.y})`);
//   // });
// valuesSplitArr.trace_1_x_values.forEach((val) => {
//   app.evalCommand(`${coord.name}=(${coord.x},${coord.y})`);
// })
//   app.evalCommand("FitLine({A, B, C})");
//   // app.setLabelStyle(objectName, objStyle);
//   // app.setLabelVisible(objectName, true);
//   // app.setAxisLabels("2", x_axis_nameTEST, y_axis_nameTEST);
//   app.setAxisLabels(3, "larg", "long", "area");
//   // app.setAxisLabels("x", x_axis_nameTEST, "y", y_axis_nameTEST);
//   // objects.forEach((coord) => {
//   //   app.evalCommand(`${coord.name}=(${coord.x},${coord.y})`);
//   // });
//   // app.evalCommand("FitLine({A, B, C})");
//   // app.setLabelStyle(objectName, objStyle);
//   // app.setLabelVisible(objectName, true);
//   // app.setAxisLabels("x", x_axis_nameTEST, "y", y_axis_nameTEST);
// }

// function testFn() {
//   const app = window.ggbApplet;
//   app.evalCommand("SetValue(A, (2, 3))");
// }

export default TablesfromLineData2;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // // max-width: 90%;
  // border: 1px solid;
`;
const Table = styled.table`
  text-align: center;
  padding: 2px;
  border-color: black;
  border-style: solid;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  text-align: center;
  border-color: black;
  border-style: solid;
  border-width: 1px;
`;

const Td = styled.td`
  border-color: black;
  border-style: solid;
  border-width: 1px;
  padding: 4px;
`;
