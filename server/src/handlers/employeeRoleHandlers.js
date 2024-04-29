const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllEmployeeRoles() {
  const [result] = await db.query(`SELECT * FROM EmployeeRoles`);

  return result;
}

async function getEmployeeRole(Employee_id, Role_id) {
  const [result] = await db.query(
    `SELECT *
    FROM EmployeeRoles
    WHERE Role_id = ?
    AND Employee_id = ?
    `,
    [Role_id, Employee_id]
  );

  return result[0];
}
async function getEmployeeRolesByRole(Role_id) {
  const [result] = await db.query(
    `SELECT *
    FROM EmployeeRoles
    WHERE Role_id = ?
    `,
    [Role_id]
  );

  return result[0];
}

async function getEmployeeRoleByEmployee(id) {
  const [result] = await db.query(
    `SELECT *
    FROM EmployeeRoles
    WHERE Employee_id = ?
    `,
    [id]
  );

  return result;
}

async function createEmployeeRole(Employee_id, Role_id) {
  const [result] = await db.query(
    `
    INSERT INTO EmployeeRoles (Employee_id, Role_id) 
    VALUES (?, ?)
    `,
    [Employee_id, Role_id]
  );

  const id = result.insertId;
  return getEmployeeRole(Employee_id, Role_id);
}

async function deleteEmployeeRole(Employee_id, Role_id) {
  const result = getAEmployeeRoleByEmployee(id);

  await db.query(
    `
    DELETE FROM EmployeeRoles
    WHERE Employee_id = ?
    AND Role_id = ?
    `,
    [Employee_id, Role_id]
  );

  return result;
}

async function deleteEmployeeRolesByEmployee(id) {
  const result = getEmployeeRoleByEmployee(id);

  await db.query(
    `
    DELETE FROM EmployeeRoles
    WHERE employee_id = ?
    `,
    [id]
  );

  return result;
}
async function deleteEmployeeRolesByRole(id) {
  const result = getEmployeeRolesByRole(id);

  await db.query(
    `
    DELETE FROM EmployeeRoles
    WHERE Role_id = ?
    `,
    [id]
  );

  return result;
}

module.exports = {
  getAllEmployeeRoles: getAllEmployeeRoles,
  getEmployeeRole: getEmployeeRole,
  getEmployeeRoleByEmployee: getEmployeeRoleByEmployee,
  createEmployeeRole: createEmployeeRole,
  deleteEmployeeRole: deleteEmployeeRole,
  deleteEmployeeRolesByRole: deleteEmployeeRolesByRole,
  deleteEmployeeRolesByEmployee: deleteEmployeeRolesByEmployee,
};
