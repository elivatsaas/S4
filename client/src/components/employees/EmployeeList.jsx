"use client";
import React, { useState } from "react";

import useSWR from "swr";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  employeeUrlEndpoint as cacheKey,
} from "../../api/employeesApi";

import {
  addEmployeeOptions,
  updateEmployeeOptions,
  deleteEmployeeOptions,
} from "../../api/employeesSWROptions";

const EmployeeList = () => {
  const [newEmployee, setNewEmployee] = useState("");

  const { isLoading, error, data, mutate } = useSWR(cacheKey, getEmployees);
  const Employees = JSON.stringify(data);
  return (
    <div>
      <h1>Employee data </h1>
      {Employees}
    </div>
  );
};

export default EmployeeList;
