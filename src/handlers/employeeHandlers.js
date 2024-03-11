const mysql = require('mysql2');
const dotenv = require('dotenv');

const availabilityHandler = require('./../handlers/availabilityHandlers');
const employeeStoreHandler = require('./../handlers/employeeStoreHandlers');
const employeeRoleHandler = require('./../handlers/employeeRoleHandlers');
const dshHandler = require('./../handlers/dshHandlers');

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllEmployees() {
  const [employees] = await db.query(`SELECT * FROM Employee`);
  return employees;
}

async function getEmployee(id) {
  const [employee] = await db.query(
    `SELECT *
  FROM Employee
  WHERE id = ?
  `,
    [id]
  );

  return employee[0];
}

async function createEmployee(
  firstName,
  lastName,
  email,
  phoneNumber,
  hireDate,
  birthDate,
  payRate
) {
  const [newEmployee] = await db.query(
    `
    INSERT INTO Employee (firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate]
  );
  return getEmployee(newEmployee.insertId);
}

async function updateEmployee(
  firstName,
  lastName,
  email,
  phoneNumber,
  hireDate,
  birthDate,
  payRate,
  id
) {
  await db.query(
    `
    UPDATE Employee
    SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), email = IFNULL(?, email), phoneNumber = IFNULL(?,phoneNumber), hireDate = IFNULL(?,hireDate), birthDate = IFNULL(?, birthDate), payRate = IFNULL(?, payRate)
    WHERE id = ?
    `,
    [firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate, id]
  );
  return getEmployee(id);
}

async function deleteEmployee(id) {
  const deletedEmployee = getEmployee(id);
  await availabilityHandler.deleteAvailabilityByEmployee(id);
  await employeeStoreHandler.deleteEmployeeStoresByEmployee(id);
  await employeeRoleHandler.deleteEmployeeRolesByEmployee(id);
  await dshHandler.deleteDesiredShiftHourByEmployee(id);

  await db.query(
    `
    DELETE FROM Employee
    WHERE id = ?
    `,
    [id]
  );

  return deletedEmployee;
}

module.exports = {
  getAllEmployees: getAllEmployees,
  getEmployee: getEmployee,
  createEmployee: createEmployee,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee,
};
