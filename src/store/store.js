import { configureStore } from "@reduxjs/toolkit";
import dataTableReducer from "../reducStore/reduxSlice";

export const store = configureStore({
  reducer: {
    dataTable: dataTableReducer,
  },
});
