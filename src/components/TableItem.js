import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TableChildItem from "./TableChildItem";
import {
  incrementByPercent,
  incrementByAmount,
} from "../reducStore/reduxSlice";

function TableItem({ index }) {
  const parentData = useSelector((state) => state.dataTable[index]);
  // const inputRef = useRef(null);
  const [val, setVal] = useState(null);
  const dispatch = useDispatch();

  const handelBtnClick = (e) => {
    const userVal = parseFloat(val);
    const btnClick = e.target.name;

    if (btnClick === "1")
      dispatch(
        incrementByPercent({ val: userVal, clickon: "p", parentIndex: index })
      );
    else
      dispatch(
        incrementByAmount({ val: userVal, clickon: "p", parentIndex: index })
      );
  };

  return (
    <>
      <tr>
        <td>{parentData.label}</td>
        <td>{parentData.value}</td>
        <td>
          <input
            type="number"
            placeholder="Enter value"
            onChange={(e) => setVal(e.target.value)}
            pattern="^[1-9]$^\d+(\.\d+)?$"
          />
        </td>
        <td>
          <input
            type="button"
            value="% Accum"
            name="1"
            onClick={handelBtnClick}
            disabled={val > 0 ? false : true}
          />
        </td>
        <td>
          <input
            type="button"
            value="Val Accum"
            name="2"
            disabled={val > 0 ? false : true}
            onClick={handelBtnClick}
          />
        </td>
        <td>{parentData.Variance} %</td>
      </tr>
      <>
        {parentData.children &&
          parentData.children.map((a, i) => (
            <TableChildItem
              key={`${index}_${i}`}
              child={a}
              parentIndex={index}
              index={`${index}_${i}`}
            />
          ))}
      </>
    </>
  );
}

export default TableItem;
