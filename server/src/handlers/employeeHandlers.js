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
  if (!employee || !employee[0]) {
    throw new Error(`Employee with ID ${id} not found.`);
  }

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

async function getAllEmployeeEmails() {
  try {
    const employees = await getAllEmployees();

    const emails = employees.map((employee) => employee.email);

    return emails;
  } catch (error) {
    console.error("Error retrieving all employee emails:", error);
    return new AppError("Failed to retrieve all employee emails");
  }
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

async function getEmployeeByResetToken(token) {
  const [employee] = await db.query(
    `SELECT *
  FROM Employee
  WHERE passwordResetToken = ?
  `,
    [token]
  );

  return employee[0];
}

async function getEmployeeRoles(id) {
  try {
    const [employee] = await db.query(
      `SELECT *
    FROM employeeRoles
    WHERE Employee_id = ?
    `,
      [id]
    );

    return employee;
  } catch (error) {
    return next(
      new AppError(
        `Error fetching roles for  ${employee.id}: ${employee.firstName} ${employee.lastName}`
      )
    );
  }
}
async function getEmployeesByStore(id) {
  try {
    const employee = await db.query(
      `SELECT *
    FROM employeeStores
    WHERE Store_id = ?
    `,
      [id]
    );
    return employee;
  } catch (error) {
    return next(new AppError(`Error fetching employees for stores`));
  }
}
async function getEmployeesByRole(id) {
  try {
    const employee = await db.query(
      `SELECT *
    FROM employeeRoles
    WHERE Role_id = ?
    `,
      [id]
    );
    return employee;
  } catch (error) {
    return next(new AppError(`Error fetching employees for roles`));
  }
}
async function getEmployeesByAnnouncement(id) {
  try {
    const employee = await db.query(
      `SELECT *
    FROM employeeAnnouncements
    WHERE Announcement_id = ?
    `,
      [id]
    );
    return employee;
  } catch (error) {
    return next(new AppError(`Error fetching employees for announcement`));
  }
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

async function updateEmployeePassword(password, id) {
  await db.query(
    `
    UPDATE Employee
    SET password = ?, passwordResetToken = NULL, passwordResetExpire = NULL
    WHERE id = ?
    `,
    [password, id]
  );
  return getEmployee(id);
}

async function updateEmployeeResets(
  passwordResetToken,
  passwordResetExpire,
  id
) {
  await db.query(
    `
    UPDATE Employee
    SET passwordResetToken = ?,
        passwordResetExpire = ?
    WHERE id = ?
    `,
    [passwordResetToken, passwordResetExpire, id]
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
  getAllEmployeeEmails: getAllEmployeeEmails,
  getEmployeeByResetToken: getEmployeeByResetToken,
  getEmployeePasswordEdit: getEmployeePasswordEdit,
  getEmployeeRoles: getEmployeeRoles,
  getEmployeesByStore: getEmployeesByStore,
  getEmployeesByRole: getEmployeesByRole,
  getEmployeesByAnnouncement: getEmployeesByAnnouncement,
  createEmployee: createEmployee,
  updateEmployee: updateEmployee,
  updateEmployeePassword: updateEmployeePassword,
  updateEmployeeResets: updateEmployeeResets,
  deleteEmployee: deleteEmployee,
};
