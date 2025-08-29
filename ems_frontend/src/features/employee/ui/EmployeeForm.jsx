// src/features/employee/ui/EmployeeForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { EMPLOYEE_ROLES, DEPARTMENTS } from "../model/types";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string(),
  department: z.string(),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  joiningDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  status: z.enum(["active", "inactive"]),
  address: z.string().min(5, "Address must be at least 5 characters"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date of birth",
  }),
  gender: z.enum(["Male", "Female", "Other"]),
  employeeId: z.string().min(3, "Employee ID required"),
  designation: z.string().min(2, "Designation required"),
  reportingManager: z.string().min(2, "Reporting Manager required"),
  salary: z.string().regex(/^\d+$/, "Salary must be a number"),
  kycDocument: z.any(),
  emergencyContactName: z.string().min(2, "Emergency contact name required"),
  emergencyContactPhone: z
    .string()
    .regex(/^\d{10}$/, "Emergency contact phone must be 10 digits"),
  joiningType: z.enum(["Full-time", "Part-time", "Intern", "Contract"]),
  workLocation: z.enum(["Onsite", "Remote", "Hybrid"]),
  bankAccount: z.string().min(5, "Bank account required"),
  ifsc: z.string().min(5, "IFSC required"),
  pan: z.string().min(5, "PAN/Aadhaar/SSN required"),
  notes: z.string().optional(),
  profilePicture: z.any(),
});

const EmployeeForm = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label>Name</label>
        <input {...register("name")} className="border p-2 w-full" />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} className="border p-2 w-full" />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div>
        <label>Role</label>
        <select {...register("role")} className="border p-2 w-full">
          {EMPLOYEE_ROLES.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Department</label>
        <select {...register("department")} className="border p-2 w-full">
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Phone</label>
        <input
          {...register("phone")}
          className="border p-2 w-full"
          placeholder="10 digit number"
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}
      </div>

      <div>
        <label>Joining Date</label>
        <input
          type="date"
          {...register("joiningDate")}
          className="border p-2 w-full"
        />
        {errors.joiningDate && (
          <span className="text-red-500">{errors.joiningDate.message}</span>
        )}
      </div>

      <div>
        <label>Status</label>
        <select {...register("status")} className="border p-2 w-full">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        {errors.status && (
          <span className="text-red-500">{errors.status.message}</span>
        )}
      </div>

      <div>
        <label>Address</label>
        <textarea {...register("address")} className="border p-2 w-full" />
        {errors.address && (
          <span className="text-red-500">{errors.address.message}</span>
        )}
      </div>

      <div>
        <label>Date of Birth</label>
        <input type="date" {...register("dob")} className="border p-2 w-full" />
        {errors.dob && (
          <span className="text-red-500">{errors.dob.message}</span>
        )}
      </div>

      <div>
        <label>Gender</label>
        <select {...register("gender")} className="border p-2 w-full">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </div>

      <div>
        <label>Employee ID</label>
        <input {...register("employeeId")} className="border p-2 w-full" />
        {errors.employeeId && (
          <span className="text-red-500">{errors.employeeId.message}</span>
        )}
      </div>

      <div>
        <label>Designation/Job Title</label>
        <input {...register("designation")} className="border p-2 w-full" />
        {errors.designation && (
          <span className="text-red-500">{errors.designation.message}</span>
        )}
      </div>

      <div>
        <label>Reporting Manager</label>
        <input
          {...register("reportingManager")}
          className="border p-2 w-full"
          placeholder="Manager name"
        />
        {errors.reportingManager && (
          <span className="text-red-500">
            {errors.reportingManager.message}
          </span>
        )}
      </div>

      <div>
        <label>Salary/CTC</label>
        <input {...register("salary")} className="border p-2 w-full" />
        {errors.salary && (
          <span className="text-red-500">{errors.salary.message}</span>
        )}
      </div>

      <div>
        <label>KYC/Document Upload</label>
        <input
          type="file"
          {...register("kycDocument")}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Emergency Contact Name</label>
        <input
          {...register("emergencyContactName")}
          className="border p-2 w-full"
        />
        {errors.emergencyContactName && (
          <span className="text-red-500">
            {errors.emergencyContactName.message}
          </span>
        )}
      </div>

      <div>
        <label>Emergency Contact Phone</label>
        <input
          {...register("emergencyContactPhone")}
          className="border p-2 w-full"
          placeholder="10 digit number"
        />
        {errors.emergencyContactPhone && (
          <span className="text-red-500">
            {errors.emergencyContactPhone.message}
          </span>
        )}
      </div>

      <div>
        <label>Joining Type</label>
        <select {...register("joiningType")} className="border p-2 w-full">
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Intern">Intern</option>
          <option value="Contract">Contract</option>
        </select>
        {errors.joiningType && (
          <span className="text-red-500">{errors.joiningType.message}</span>
        )}
      </div>

      <div>
        <label>Work Location</label>
        <select {...register("workLocation")} className="border p-2 w-full">
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        {errors.workLocation && (
          <span className="text-red-500">{errors.workLocation.message}</span>
        )}
      </div>

      <div>
        <label>Bank Account</label>
        <input {...register("bankAccount")} className="border p-2 w-full" />
        {errors.bankAccount && (
          <span className="text-red-500">{errors.bankAccount.message}</span>
        )}
      </div>

      <div>
        <label>IFSC</label>
        <input {...register("ifsc")} className="border p-2 w-full" />
        {errors.ifsc && (
          <span className="text-red-500">{errors.ifsc.message}</span>
        )}
      </div>

      <div>
        <label>PAN/Aadhaar/SSN</label>
        <input {...register("pan")} className="border p-2 w-full" />
        {errors.pan && (
          <span className="text-red-500">{errors.pan.message}</span>
        )}
      </div>

      <div>
        <label>Notes/Remarks</label>
        <textarea {...register("notes")} className="border p-2 w-full" />
      </div>

      <div>
        <label>Profile Picture</label>
        <input
          type="file"
          {...register("profilePicture")}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
