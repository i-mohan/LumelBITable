// dataTableSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { data } from "../store/data";

const initialState = JSON.parse(JSON.stringify(data.rows));

const addInitialValueToChildren = (data) => {
  // Function to add initialValue and initialPercent
  data.forEach((parent) => {
    // Add initialValue and initialPercent to the parent object
    parent.initialValue = parent.value;
    parent.initialPercent = 100;
    parent.Variance = 0; // Parent percent is always 100%

    // Iterate through children to add initialValue and initialPercent
    parent.children.forEach((child) => {
      child.initialValue = child.value;
      child.initialPercent = parseFloat(
        ((child.value / parent.value) * 100).toFixed(2)
      ); // Calculate percentage
      child.Variance = 0;
    });
  });
};

addInitialValueToChildren(initialState);

const recalc = (state, clickon, parentIndex, index) => {
  const parent = state[parentIndex];

  if (clickon === "p") {
    // Parent value has changed, update children's values based on their initial percentage of the parent's initial value
    parent.children.forEach((child) => {
      const childPercent = (child.initialValue / parent.initialValue) * 100;
      child.value = parseFloat(
        ((parent.value * childPercent) / 100).toFixed(2)
      );

      // Recalculate the child's variance
      child.Variance = parseFloat(
        (
          ((child.value - child.initialValue) / child.initialValue) *
          100
        ).toFixed(2)
      );
    });

    // Recalculate the parent's variance
    parent.Variance = (
      ((parent.value - parent.initialValue) / parent.initialValue) *
      100
    ).toFixed(2);
  } else {
    // A child's value has changed, update the parent's value by summing all children's values
    const childIndex = index.split("_")[1];
    const child = parent.children[childIndex];

    // Recalculate the parent value by summing the children's values
    const newParentValue = parent.children.reduce(
      (acc, child) => acc + child.value,
      0
    );
    parent.value = parseFloat(newParentValue.toFixed(2));

    // Recalculate the parent's variance
    parent.Variance = parseFloat(
      (
        ((parent.value - parent.initialValue) / parent.initialValue) *
        100
      ).toFixed(2)
    );

    // Recalculate the variance for the modified child
    child.Variance = parseFloat(
      (((child.value - child.initialValue) / child.initialValue) * 100).toFixed(
        2
      )
    );

    // Recalculate all children’s variances if one child value changed
    parent.children.forEach((child) => {
      child.Variance = parseFloat(
        (
          ((child.value - child.initialValue) / child.initialValue) *
          100
        ).toFixed(2)
      );
    });
  }
};

export const dataTableSlice = createSlice({
  name: "dataTable",
  initialState,
  reducers: {
    incrementByPercent: (state, action) => {
      const { val, clickon, parentIndex, index } = action.payload;

      if (clickon === "p") {
        state[parentIndex].value = parseFloat(
          (
            state[parentIndex].value +
            (state[parentIndex].value * val) / 100
          ).toFixed(2)
        );
      } else {
        let childVal = state[parentIndex].children[index.split("_")[1]].value;
        state[parentIndex].children[index.split("_")[1]].value = parseFloat(
          (childVal + (childVal * val) / 100).toFixed(2)
        );
      }
      recalc(state, clickon, parentIndex, index);

      // state.forEach((row) => {
      //   // Adjust the calculation based on btnClick and val
      //   if (btnClick === "p") {
      //     row.value = parseFloat(val);
      //   } else {
      //     row.value = parseFloat(val);
      //   }

      //   if (row.children) {
      //     row.children.forEach((child) => {
      //       if (btnClick === "someCondition") {
      //         child.value = parseFloat(val);
      //       } else {
      //         child.value = parseFloat(val);
      //       }
      //     });
      //   }
      // });
    },
    incrementByAmount: (state, action) => {
      const { val, clickon, parentIndex, index } = action.payload;

      if (clickon === "p") {
        state[parentIndex].value = parseFloat(val.toFixed(2));
      } else {
        state[parentIndex].children = state[parentIndex].children.map(
          (child, idx) =>
            idx === parseInt(index.split("_")[1])
              ? { ...child, value: parseFloat(val.toFixed(2)) }
              : child
        );
      }

      recalc(state, clickon, parentIndex, index);
    },
  },
});

export const { incrementByPercent, incrementByAmount } = dataTableSlice.actions;
export default dataTableSlice.reducer;
