const employeeHandlers = require("../../handlers/employeeHandlers");

jest.mock("../../handlers/availabilityHandlers", () => ({
  deleteAvailabilityByEmployee: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/employeeStoreHandlers", () => ({
  deleteEmployeeStoresByEmployee: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/employeeRoleHandlers", () => ({
  deleteEmployeeRolesByEmployee: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/dshHandlers", () => ({
  deleteDesiredShiftHourByEmployee: jest.fn().mockResolvedValue(),
}));

describe("Employee Handlers", () => {
  let createdEmployeeId;
  let updatedEmployeeId;
  test("should return all employees from the database", async () => {
    const employees = await employeeHandlers.getAllEmployees();

    expect(Array.isArray(employees)).toBe(true);
    expect(employees.length).toBeGreaterThan(0);
    expect(employees[0]).toHaveProperty("id");
    expect(employees[0]).toHaveProperty("firstName");
    expect(employees[0]).toHaveProperty("lastName");
    expect(employees[0]).toHaveProperty("email");
    expect(employees[0]).toHaveProperty("phoneNumber");
    expect(employees[0]).toHaveProperty("hireDate");
    expect(employees[0]).toHaveProperty("birthDate");
    expect(employees[0]).toHaveProperty("firstName");
  });

  test("should return an employee from the database", async () => {
    const employee = await employeeHandlers.getEmployee(1);
    expect(employee).toHaveProperty("id");
    expect(employee).toHaveProperty("firstName");
    expect(employee).toHaveProperty("lastName");
    expect(employee).toHaveProperty("email");
    expect(employee).toHaveProperty("phoneNumber");
    expect(employee).toHaveProperty("hireDate");
    expect(employee).toHaveProperty("birthDate");
    expect(employee).toHaveProperty("firstName");
  });

  test("should return an employee by email from the database", async () => {
    const employee = await employeeHandlers.getEmployeeByEmail(
      "test@example.com"
    );
    expect(employee).toHaveProperty("id");
    expect(employee).toHaveProperty("firstName");
    expect(employee).toHaveProperty("lastName");
    expect(employee).toHaveProperty("email");
    expect(employee).toHaveProperty("phoneNumber");
    expect(employee).toHaveProperty("hireDate");
    expect(employee).toHaveProperty("birthDate");
    expect(employee).toHaveProperty("firstName");
  });

  test("should create a new employee in the database", async () => {
    const newEmployee = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      hireDate: "2024-04-29",
      birthDate: "1990-01-01",
      payRate: 15,
      password: "password",
    };

    const createdEmployee = await employeeHandlers.createEmployee(
      newEmployee.firstName,
      newEmployee.lastName,
      newEmployee.email,
      newEmployee.phoneNumber,
      newEmployee.hireDate,
      newEmployee.birthDate,
      newEmployee.payRate,
      newEmployee.password
    );

    createdEmployeeId = createdEmployee.id;

    expect(createdEmployee).toBeDefined();
    expect(createdEmployee.firstName).toBe(newEmployee.firstName);
    expect(createdEmployee.lastName).toBe(newEmployee.lastName);
    expect(createdEmployee.email).toBe(newEmployee.email);
    expect(createdEmployee.phoneNumber).toBe(newEmployee.phoneNumber);
    expect(createdEmployee.hireDate.toISOString().substring(0, 10)).toBe(
      newEmployee.hireDate
    );
    expect(createdEmployee.birthDate.toISOString().substring(0, 10)).toBe(
      newEmployee.birthDate
    );
    expect(createdEmployee.payRate).toBe(newEmployee.payRate);
    expect(createdEmployee).not.toHaveProperty("password");
  });

  test("should update an existing employee in the database", async () => {
    if (!createdEmployeeId) {
      throw new Error("No employee created to update");
    }

    const updatedEmployeeData = {
      firstName: "Updated John",
      lastName: "Updated Doe",
      email: "updated.john.doe@example.com",
      phoneNumber: "9876543210",
      hireDate: "2023-01-01",
      birthDate: "1990-01-01",
      payRate: 20,
    };

    const updatedEmployee = await employeeHandlers.updateEmployee(
      updatedEmployeeData.firstName,
      updatedEmployeeData.lastName,
      updatedEmployeeData.email,
      updatedEmployeeData.phoneNumber,
      updatedEmployeeData.hireDate,
      updatedEmployeeData.birthDate,
      updatedEmployeeData.payRate,
      createdEmployeeId
    );
    updatedEmployeeId = updatedEmployee.id;
    expect(updatedEmployee).toBeDefined();
    expect(updatedEmployee.firstName).toBe(updatedEmployeeData.firstName);
    expect(updatedEmployee.lastName).toBe(updatedEmployeeData.lastName);
    expect(updatedEmployee.email).toBe(updatedEmployeeData.email);
    expect(updatedEmployee.phoneNumber).toBe(updatedEmployeeData.phoneNumber);
    expect(updatedEmployee.hireDate.toISOString().substring(0, 10)).toBe(
      updatedEmployeeData.hireDate
    );
    expect(updatedEmployee.birthDate.toISOString().substring(0, 10)).toBe(
      updatedEmployeeData.birthDate
    );
    expect(updatedEmployee.payRate).toBe(updatedEmployeeData.payRate);
    expect(updatedEmployee).not.toHaveProperty("password");
  });

  test("should delete the created employee from the database", async () => {
    if (!createdEmployeeId) {
      throw new Error("No employee created to delete");
    }

    const deletedEmployee = await employeeHandlers.deleteEmployee(
      updatedEmployeeId
    );
    expect(deletedEmployee).toBeDefined();
    expect(deletedEmployee.id).toBe(updatedEmployeeId);
  });

  afterAll(async () => {
    await employeeHandlers.closeConnectionPool();
  });
});
