const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "./.env") });

const availabilityHandler = require("./../handlers/availabilityHandlers");
const employeeStoreHandler = require("./../handlers/employeeStoreHandlers");
const employeeRoleHandler = require("./../handlers/employeeRoleHandlers");
const dshHandler = require("./../handlers/dshHandlers");

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
  const newEmployees = employees.map(({ password, ...employee }) => employee);
  return newEmployees;
}

async function getEmployee(id) {
  const [employee] = await db.query(
    `SELECT *
  FROM Employee
  WHERE id = ?
  `,
    [id]
  );
  delete employee[0].password;
  return employee[0];
}
async function getEmployeeByEmail(email) {
  const [employee] = await db.query(
    `SELECT *
  FROM Employee
  WHERE email = ?
  `,
    [email]
  );

  return employee[0];
}

async function getEmployeePasswordEdit(id) {
  const editTime = await db.query(
    `
SELECT update_time
FROM   information_schema.tables
WHERE  table_schema = 'S4'
   AND table_name = 'Employee'
   AND id = ?
  `[id]
  );
  return editTime[0];
}

async function createEmployee(
  firstName,
  lastName,
  email,
  phoneNumber,
  hireDate,
  birthDate,
  payRate,
  password
) {
  const [newEmployee] = await db.query(
    `
    INSERT INTO Employee (firstName, lastName, email, phoneNumber, hireDate, birthDate, payRate, password) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
      password,
    ]
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
  password,
  id
) {
  await db.query(
    `
    UPDATE Employee
    SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), email = IFNULL(?, email), phoneNumber = IFNULL(?,phoneNumber), hireDate = IFNULL(?,hireDate), birthDate = IFNULL(?, birthDate), payRate = IFNULL(?, payRate),  password = IFNULL(?, password)
    WHERE id = ?
    `,
    [
      firstName,
      lastName,
      email,
      phoneNumber,
      hireDate,
      birthDate,
      payRate,
      password,
      id,
    ]
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
  getEmployeeByEmail: getEmployeeByEmail,
  getEmployeePasswordEdit: getEmployeePasswordEdit,
  createEmployee: createEmployee,
  updateEmployee: updateEmployee,
  deleteEmployee: deleteEmployee,
};
