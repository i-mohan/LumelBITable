import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementByPercent,
  incrementByAmount,
} from "../reducStore/reduxSlice";

function TableChildItem({ parentIndex, index }) {
  const childData = useSelector((state) => {
    const [parentIdx, childIdx] = index.split("_").map(Number);
    return state.dataTable[parentIdx].children[childIdx];
  });

  // const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [val, setVal] = useState(null);

  const handelBtnClick = (e) => {
    const userVal = parseFloat(val);
    const btnClick = e.target.name;

    if (btnClick === "1") {
      dispatch(
        incrementByPercent({
          val: userVal,
          clickon: "c",
          parentIndex,
          index,
        })
      );
    } else {
      dispatch(
        incrementByAmount({
          val: userVal,
          clickon: "c",
          parentIndex,
          index,
        })
      );
    }
  };

  return (
    <tr>
      <td>--{childData.label}</td>
      <td>{childData.value}</td>
      <td>
        <input
          onChange={(e) => setVal(e.target.value)}
          type="textnumber"
          placeholder="Enter value"
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
          onClick={handelBtnClick}
          disabled={val > 0 ? false : true}
        />
      </td>
      <td>{childData.Variance} %</td>
    </tr>
  );
}

export default TableChildItem;
