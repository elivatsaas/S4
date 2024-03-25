// "use client";
// import React, { useState } from "react";

// import useSWR from "swr";

// import {
//   getEmployees,
//   addEmployee,
//   updateEmployee,
//   deleteEmployee,
//   employeeUrlEndpoint as cacheKey,
// } from "../../api/employeesApi";
// import {
//   addEmployeeOptions,
//   updateEmployeeOptions,
//   deleteEmployeeOptions,
// } from "../../api/employeesSWROptions";

// const EmployeeList = () => {
//   const [newEmployee, setNewEmployee] = useState("");

//   const { isLoading, error, data, mutate } = useSWR(cacheKey, getEmployees);
//   const Employees = JSON.stringify(data);
//   let employee = { firstName: 'frontend',
//   lastName: 'employee',
//   email: 'newtest232@example.com',
//   phoneNumber: '9283920394',
//   hireDate: '2010-01-02',
//   birthDate: '1972-02-08',
//   payRate: '25' }
//   await mutate(
//     addEmployee(employee),
//     addEmployeeOptions(employee)
//   )
//     console.log("added employee");
//     let updatedEmployee = {  id: '15',
//     firstName: 'updatedfrontend',
//     lastName: 'employee',
//     email: 'newtest232@example.com',
//     phoneNumber: '9283920394',
//     hireDate: '2010-01-02',
//     birthDate: '1972-02-08',
//     payRate: '25'
//  }

//     console.log("updated employee");
//   const updateEmployeeMutation = async ({ updatedEmployee}) => {
//     await mutate(
//       updateEmployee(updatedEmployee),
//       updateEmployeeOptions(updatedEmployee)
//     )

//       console.log("updated employee");
//   }
//   const deleteEmployeeMutation = async ({ id }) => {
//     await mutate(
//       deleteEmployee({ id }),
//       deleteEmployeeOptions({ id })
//   )
//   console.log("deleted employee");
//     }
//   updateEmployeeMutation(updatedEmployee);
//   deleteEmployeeMutation(15);

//   return (
//     <div>
//       <h1>Employee data </h1>
//       {Employees}
//     </div>
//   );
// };

// export default EmployeeList;
