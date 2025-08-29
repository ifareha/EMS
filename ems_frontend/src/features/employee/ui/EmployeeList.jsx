// src/features/employee/ui/EmployeeList.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const EmployeeList = () => {
  const employees = useSelector((state) => state.employee.list);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <ul className="space-y-2">
        {employees.map((emp) => (
          <li key={emp.id} className="border p-2 rounded">
            <div className="font-semibold text-lg">{emp.name} ({emp.employeeId})</div>
            <div className="text-sm text-gray-700 mb-1">{emp.designation} - {emp.role} - {emp.department}</div>
            <div className="text-xs text-gray-500 mb-1">Status: {emp.status} | Joining: {emp.joiningDate} | DOB: {emp.dob}</div>
            <div className="text-xs text-gray-500 mb-1">Gender: {emp.gender} | Phone: {emp.phone} | Email: {emp.email}</div>
            <div className="text-xs text-gray-500 mb-1">Manager: {emp.reportingManager} | Salary: {emp.salary}</div>
            <div className="text-xs text-gray-500 mb-1">Location: {emp.workLocation} | Type: {emp.joiningType}</div>
            <div className="text-xs text-gray-500 mb-1">Bank: {emp.bankAccount} | IFSC: {emp.ifsc}</div>
            <div className="text-xs text-gray-500 mb-1">PAN/Aadhaar/SSN: {emp.pan}</div>
            <div className="text-xs text-gray-500 mb-1">Emergency: {emp.emergencyContactName} ({emp.emergencyContactPhone})</div>
            <div className="text-xs text-gray-500 mb-1">Address: {emp.address}</div>
            <div className="text-xs text-gray-500 mb-1">Notes: {emp.notes}</div>

						{/* kyc doc */}
            <div className="text-xs text-gray-500 mb-1">KYC Document: {
              emp.kycDocument && emp.kycDocument[0]
                ? (
                    <>
                      <span>{emp.kycDocument[0].name}</span>
                      <a
                        href={URL.createObjectURL(emp.kycDocument[0])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 underline"
                      >View</a>
                      <a
                        href={URL.createObjectURL(emp.kycDocument[0])}
                        download={emp.kycDocument[0].name}
                        className="ml-2 text-green-600 underline"
                      >Download</a>
                    </>
                  )
                : 'N/A'
            }</div>

						{/* profile pic */}
            <div className="text-xs text-gray-500 mb-1">Profile Picture: {
              emp.profilePicture && emp.profilePicture[0]
                ? (
                    <>
                      <img
                        src={URL.createObjectURL(emp.profilePicture[0])}
                        alt={emp.name + ' profile'}
                        className="w-16 h-16 object-cover rounded-full border mt-2"
                      />
                      <a
                        href={URL.createObjectURL(emp.profilePicture[0])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-blue-600 underline"
                      >View</a>
                      <a
                        href={URL.createObjectURL(emp.profilePicture[0])}
                        download={emp.profilePicture[0].name}
                        className="ml-2 text-green-600 underline"
                      >Download</a>
                    </>
                  )
                : 'N/A'
            }</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
