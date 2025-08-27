// src/features/employee/api/employeeApi.js
import http from '../../../shared/api/http';

export const fetchEmployees = async () => {
  const res = await http.get('/employees');
  return res.data;
};


export const createEmployee = async (data) => {

  // For file uploads, use FormData
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof FileList) {
      // Append each file in FileList
      Array.from(value).forEach((file) => formData.append(key, file));
    } else {
      formData.append(key, value);
    }
  });

  const res = await http.post('/employees', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
	
  return res.data;
};
