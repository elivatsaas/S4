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

async function getAllEmployeeStores() {
  const [result] = await db.query(`SELECT * FROM EmployeeStores`);

  return result;
}

async function getEmployeeStore(Employee_id, Store_id) {
  const [result] = await db.query(
    `SELECT *
    FROM EmployeeStores
    WHERE Employee_id = ?
    AND Store_id = ?
    `,
    [Employee_id, Store_id]
  );

  return result[0];
}
async function getEmployeeStoreByEmployee(Employee_id) {
  const [result] = await db.query(
    `SELECT *
    FROM EmployeeStores
    WHERE Employee_id = ?
    `,
    [Employee_id]
  );

  return result[0];
}
async function getEmployeeStoreByStore(Store_id) {
  const [result] = await db.query(
    `SELECT *
    FROM EmployeeStores
    WHERE Store_id = ?
    `,
    [Store_id]
  );

  return result[0];
}

async function createEmployeeStore(Employee_id, Store_id) {
  const [result] = await db.query(
    `
    INSERT INTO EmployeeStores (Employee_id, Store_id) 
    VALUES (?, ?)
    `,
    [Employee_id, Store_id]
  );

  const id = result.insertId;
  return getEmployeeStore(Employee_id, Store_id);
}

async function deleteEmployeeStore(Employee_id, Store_id) {
  const result = getAEmployeeStore(Employee_id, Store_id);

  await db.query(
    `
    DELETE FROM EmployeeStores
    WHERE Store_id = ?
    AND Employee_id = ?
    `,
    [Store_id, Employee_id]
  );
  return result;
}

async function deleteEmployeeStoresByStore(id) {
  const result = getEmployeeStoreByStore(id);

  await db.query(
    `
    DELETE FROM EmployeeStores
    WHERE Store_id = ?
    `,
    [id]
  );
  return result;
}

async function deleteEmployeeStoresByEmployee(id) {
  const result = getEmployeeStoreByEmployee;
  await db.query(
    `
    DELETE FROM EmployeeStores
    WHERE Employee_id = ?
    `,
    [id]
  );

  return result;
}

module.exports = {
  getAllEmployeeStores: getAllEmployeeStores,
  getEmployeeStore: getEmployeeStore,
  createEmployeeStore: createEmployeeStore,
  deleteEmployeeStore: deleteEmployeeStore,
  deleteEmployeeStoresByStore: deleteEmployeeStoresByStore,
  deleteEmployeeStoresByEmployee: deleteEmployeeStoresByEmployee,
};
