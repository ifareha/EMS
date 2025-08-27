import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { EmployeeList, EmployeeForm } from "../features/employee";
import {
  setEmployees,
  addEmployee,
  setLoading,
  setError,
} from "../features/employee/model/employeeSlice";
import {
  fetchEmployees,
  createEmployee,
} from "../features/employee/api/employeeApi";

const EmployeePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getEmployees = async () => {
      dispatch(setLoading(true));
      try {
        const employees = await fetchEmployees();
        dispatch(setEmployees(employees));
      } catch (err) {
        dispatch(setError(err.response?.data?.error || err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };
    getEmployees();
  }, [dispatch]);

  const handleAddEmployee = async (data) => {
    dispatch(setLoading(true));
    try {
      const newEmployee = await createEmployee(data);
      dispatch(addEmployee(newEmployee));
    } catch (err) {
      dispatch(setError(err.response?.data?.error || err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
      <EmployeeForm onSubmit={handleAddEmployee} />
      <EmployeeList />
    </div>
  );
};

export default EmployeePage;
