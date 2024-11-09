import React from "react";
import { useSelector } from "react-redux";
import TableItem from "./TableItem";

function Table() {
  const data = useSelector((state) => state.dataTable);
  // const dispatch = useDispatch();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Value</th>
            <th>Input</th>
            <th>% Accum</th>
            <th>Value Accum</th>
            <th>Variance</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((a, i) => <TableItem key={i} child={a} index={i} />)}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
