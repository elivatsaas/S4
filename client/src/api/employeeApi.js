import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const employeesApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const employeeUrlEndpoint = "/employees";

export const getEmployees = async () => {
  await delay();
  const response = await employeesApi.get(employeeUrlEndpoint);
  return response.data.data.employees; // Updated response data structure
};

export const getEmployee = async (id) => {
  await delay();
  const response = await employeesApi.get(`${employeeUrlEndpoint}/${id}`);
  return response.data.data.employee; // Updated response data structure
};

export const addEmployee = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  hireDate,
  birthDate,
  payRate,
  password,
  passwordConfirm,
}) => {
  await delay();
  const response = await employeesApi.post(employeeUrlEndpoint, {
    // Updated endpoint for adding employee
    firstName,
    lastName,
    email,
    phoneNumber,
    hireDate,
    birthDate,
    payRate,
    password,
    passwordConfirm,
  });
  return response.data;
};

export const updateEmployee = async (employee) => {
  await delay();

  const response = await employeesApi.patch(
    // Updated endpoint for updating employee
    `${employeeUrlEndpoint}/${employee.id}`,
    employee
  );
  return response.data;
};

export const deleteEmployee = async (id) => {
  await delay();
  const response = await employeesApi.delete(`${employeeUrlEndpoint}/${id}`);
  return response.data;
};
