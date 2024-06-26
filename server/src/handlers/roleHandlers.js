const mysql = require("mysql2");
const dotenv = require("dotenv");

const employeeRoleHandler = require("./../handlers/employeeRoleHandlers");
const shiftHandler = require("./../handlers/shiftHandlers");
const AppError = require("../utils/appError");

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllRoles() {
  const [roles] = await db.query(`SELECT * FROM Role`);

  return roles;
}

async function getRole(id) {
  const [role] = await db.query(
    `SELECT *
    FROM Role
    WHERE id = ?
    `,
    [id]
  );

  return role[0];
}
async function getRoleByName(roleName) {
  try {
    const [role] = await db.query(
      `SELECT id
      FROM Role
      WHERE roleName = ?
      `,
      [roleName]
    );
    return role[0];
  } catch (error) {
    // Handle any errors that occur during role fetching
    return next(new AppError(`Error fetching role ${roleName}`)); // Rethrow the error to propagate it to the caller
  }
}

async function createRole(roleName) {
  const [role] = await db.query(
    `
    INSERT INTO Role (RoleName) 
    VALUES (?)
    `,
    [roleName]
  );
  return getRole(role.insertId);
}

async function updateRole(role_id, roleName) {
  await db.query(
    `
    UPDATE Role
    SET roleName = ?
    WHERE id = ?
    `,
    [roleName, role_id]
  );

  return getRole(role_id);
}

async function deleteRole(id) {
  const role = getRole(id);

  employeeRoleHandler.deleteEmployeeRolesByRole(id);
  shiftHandler.deleteShiftByRole(id);

  await db.query(
    `
    DELETE FROM Role
    WHERE id = ?
    `,
    [id]
  );

  return role;
}

module.exports = {
  getAllRoles: getAllRoles,
  getRole: getRole,
  getRoleByName: getRoleByName,
  createRole: createRole,
  updateRole: updateRole,
  deleteRole: deleteRole,
};
