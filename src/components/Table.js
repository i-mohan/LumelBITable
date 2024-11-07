import React, { useState } from "react";
import { data } from "../store/data.js";
import TableItem from "./TableItem.js";
import { store } from "..store/reduxStore";
import { Provider } from "react-redux";

function Table() {
  const [tableData, setTableData] = useState(data.rows);
  const refData = tableData.map((a) => {
    return { ...a, intVal: a.value };
  });
  //debugger;

  return (
    <Provider store={store}>
      <div>
        <table>
          <tr>
            <th>Label</th>
            <th>Value</th>
            <th>Input</th>
            <th>Allocation %</th>
            <th>Allocation Val</th>
            <th>Variance %</th>
          </tr>
          <tbody>
            {refData.length > 0 &&
              refData.map((item, index) => {
                return <TableItem item={item} index={index} />;
              })}
          </tbody>
        </table>
      </div>
    </Provider>
  );
}

export default Table;
