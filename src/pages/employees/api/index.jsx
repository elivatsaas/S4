"use client";
//import EmployeeList from "../../components/employees/EmployeeList";
import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  employeeUrlEndpoint as cacheKey,
} from "../../../api/employeesApi";

import React from "react";
import useSWR from "swr";

const newEmployee = {
  firstName: "newfrontend",
  lastName: "employee",
  email: "newtest232@example.com",
  phoneNumber: "9283920394",
  hireDate: "2010-01-02",
  birthDate: "1972-02-08",
  payRate: "25",
  password: "frontendtestpass",
  passwordConfirm: "frontendtestpass",
};

const updatedEmployee = {
  id: "20",
  firstName: "updateFrontend",
};
function App() {
  //const { isLoading, error, data, mutate } = useSWR(cacheKey, addEmployee(newEmployee));

  // const { isLoading, error, data, mutate } = useSWR(
  //   cacheKey,
  //   updateEmployee(updatedEmployee)
  // );
  //console.log(result);
  //deleteEmployee(20);
  //return <EmplosyeeList />;
  return <>Employees API </>;
}

export default App;
