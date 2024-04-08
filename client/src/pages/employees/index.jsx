"use client";
//import EmployeeList from "../../components/employees/EmployeeList";
import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  employeeUrlEndpoint as cacheKey,
} from "../../api/employeesApi";

import React from "react";
import useSWR from "swr";

function App() {
  return <>Employees Stuff </>;
}

export default App;
