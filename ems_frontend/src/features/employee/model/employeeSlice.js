// src/features/employee/model/employeeSlice.js

import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEmployees(state, action) {
      state.list = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    addEmployee(state, action) {
      state.list.push({ ...action.payload, id: Date.now().toString() });
    },
  },
  // ...existing code...
});

export const { setEmployees, setLoading, setError, addEmployee } =
  employeeSlice.actions;

export default employeeSlice.reducer;
