import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const employeesApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const employeeUrlEndpoint = "/employees";

export const getEmployees = async () => {
  await delay();
  const response = await employeesApi.get(employeeUrlEndpoint);
  return response.data.data;
};

export const addEmployee = async ({ startDate, endDate, employeeName }) => {
  await delay();
  const response = await employeesApi.post(employeeUrlEndpoint, {
    startDate,
    endDate,
    employeeName,
  });
  return response.data;
};

export const updateEmployee = async (employee) => {
  await delay();
  const response = await employeesApi.patch(
    `${employeesUrlEndpoint}/${employee.id}`,
    employee
  );
  return response.data;
};

export const deleteEmployee = async ({ id }) => {
  await delay();
  const response = await employeesApi.delete(`${employeeUrlEndpoint}/${id}`);
  return response.data;
};
