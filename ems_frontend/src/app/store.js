import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "../features/employee";
import authReducer from "../features/auth/model/authSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    auth: authReducer,
  },
});

export default store;
