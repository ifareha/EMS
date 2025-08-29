import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Example page imports (to be created in src/pages)
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import EmployeePage from "../pages/EmployeePage";
import LoginPage from "../pages/LoginPage";

const AppShell = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/employees" element={<EmployeePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default AppShell;
