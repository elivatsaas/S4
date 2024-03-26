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

export const getEmployee = async (id) => {
  await delay();
  const response = await employeesApi.get(employeeUrlEndpoint + `/${id}`);
  return response.data.data;
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
  const response = await employeesApi.post(employeeUrlEndpoint + "/signup", {
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

  var employeeRes = await getEmployee(employee.id);
  const legacyEmployee = await employeeRes.employee;
  console.log(legacyEmployee);
  if (employee.firstName === undefined) {
    employee["firstName"] == legacyEmployee.firstName;
  }
  if (employee.lastName === undefined) {
    employee["lastName"] == legacyEmployee.lastName;
  }
  if (employee.email === undefined) {
    employee["email"] = legacyEmployee.email;
  }
  if (employee.phoneNumber === undefined) {
    employee["phoneNumber"] = legacyEmployee.phoneNumber;
  }
  if (employee.hireDate === undefined) {
    employee["hireDate"] = legacyEmployee.hireDate;
  }
  if (employee.birthDate === undefined) {
    employee["birthDate"] = legacyEmployee.birthDate;
  }
  if (employee.payRate === undefined) {
    employee["payRate"] = legacyEmployee.payRate;
  }
  const response = await employeesApi.patch(
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
