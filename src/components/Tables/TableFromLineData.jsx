import React, { useState, useEffect, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CS

// component generates a table using the library AG Grid https://www.ag-grid.com/react-data-grid/getting-started//. Schema shown under script.

function LargeTable(props) {
  const standard_tables = props.standard_tables;
  const standard_table_variable_names = props.standard_table_variable_names;
  const variable_1_name = standard_table_variable_names?.variable1_name;
  const variable_2_name = standard_table_variable_names?.variable2_name;

  const columnDefs = [
    {
      field: variable_1_name,
      filter: false,
    },
    {
      field: variable_2_name,
      filter: false,
    },
  ];

  // create two arrays from each data variable
  const variable1Arr = [];

  standard_tables?.map((element) => {
    return variable1Arr.push({ [variable_1_name]: element.variable1_value });
  });

  const variable2Arr = [];

  standard_tables?.map((element) => {
    return variable2Arr.push({ [variable_2_name]: element.variable2_value });
  });

  const tableDatatoRender = [];

  let check = [];

  for (let index = 0; index < standard_tables?.length; index++) {
    const variable1ArrElement = variable1Arr[index];
    const variable2ArrElement = variable2Arr[index];

    check = { ...variable1ArrElement, ...variable2ArrElement };
    tableDatatoRender.push(check);
  }

  // DefaultColDef sets props common to all Columns

  const defaultColDef = useMemo(() => ({
    sortable: true,
  }));

  const cellClickedListener = () => {};

  return (
    <div>
      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact
          rowData={tableDatatoRender} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
        />
      </div>
    </div>
  );
}

export default LargeTable;

// defineField({
//   name: 'standard_table_variable_names',
//   title: 'table_variable_names',
//   type: 'object',
//   fields: [
//     {type: 'string', name: 'variable1_name'},
//     {type: 'string', name: 'variable2_name'},
//     {type: 'string', name: 'variable3_name'},
//     {type: 'string', name: 'variable4_name'},
//     {type: 'string', name: 'variable5_name'},
//   ],
// }),

// defineField({
//   name: 'standard_tables',
//   type: 'array',
//   title: 'standard_tables',
//   of: [
//     defineArrayMember({
//       type: 'object',
//       name: 'tag',
//       fields: [
//         {type: 'string', name: 'variable1_value'},
//         {type: 'string', name: 'variable2_value'},
//         {type: 'string', name: 'variable3_value'},
//         {type: 'string', name: 'variable4_value'},
//         {type: 'string', name: 'variable5_value'},
//       ],
//     }),
//   ],
// }),
