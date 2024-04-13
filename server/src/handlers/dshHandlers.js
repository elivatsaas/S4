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

async function getAllDesiredShiftHours() {
  const [result] = await db.query(`SELECT * FROM desiredShiftHours`);

  return result;
}

async function getDesiredShiftHour(id) {
  const [result] = await db.query(
    `SELECT *
    FROM desiredShiftHours
    WHERE id = ?
    `,
    [id]
  );

  return result[0];
}

async function getDesiredShiftHoursByEmployee(id) {
  const [result] = await db.query(
    `SELECT *
    FROM DesiredShiftHours
    WHERE Employee_id = ?
    `,
    [id]
  );

  return result[0];
}

async function getDesiredShiftHoursBySchedule(id) {
  const [dshs] = await db.query(
    `SELECT *
    FROM DesiredShiftHours
    WHERE Schedule_id = ?
    `,
    [id]
  );

  return dshs[0];
}

async function getDesiredShiftHourForSchedule(id) {
  const [result] = await db.query(
    `CALL 
    FindDSHForSchedule(?)
    `,
    [id]
  );

  return result[0];
}

async function createDesiredShiftHour(
  desiredShifts,
  maxShifts,
  desiredHours,
  maxHours,
  Employee_id,
  Schedule_id
) {
  const [dsh] = await db.query(
    `
    INSERT INTO desiredShiftHours (desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id) 
    VALUES (?, ?, ?, ?, ?, ?)
    `,
    [desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id]
  );

  return getDesiredShiftHour(dsh.insertId);
}

async function updateDesiredShiftHour(
  dsh_id,
  desiredShifts,
  maxShifts,
  desiredHours,
  maxHours,
  Employee_id,
  Schedule_id
) {
  await db.query(
    `
    UPDATE DesiredShiftHours
    SET desiredShifts = IFNULL(?, desiredShifts), maxShifts = IFNULL(?, maxShifts), desiredHours = IFNULL(?, desiredHours), maxHours = IFNULL(?, maxHours), Employee_id = IFNULL(?, Employee_id), Schedule_id = IFNULL(?, Schedule_id)
    WHERE id = ?
    `,
    [
      desiredShifts,
      maxShifts,
      desiredHours,
      maxHours,
      Employee_id,
      Schedule_id,
      dsh_id,
    ]
  );

  return getDesiredShiftHour(dsh_id);
}

async function deleteDesiredShiftHour(id) {
  const result = getDesiredShiftHour(id);

  await db.query(
    `
    DELETE FROM DesiredShiftHours
    WHERE id = ?
    `,
    [id]
  );

  return result;
}

async function deleteDesiredShiftHourByEmployee(id, dataTuype) {
  const result = getDesiredShiftHoursByEmployee(id);

  await db.query(
    `
    DELETE FROM DesiredShiftHours
    WHERE Employee_id = ?
    `,
    [id]
  );

  return result;
}

async function deleteDesiredShiftHourBySchedule(id) {
  const result = getDesiredShiftHoursBySchedule(id);

  await db.query(
    `
    DELETE FROM DesiredShiftHours
    WHERE Schedule_id = ?
    `,
    [id]
  );

  return result;
}
module.exports = {
  getAllDesiredShiftHours: getAllDesiredShiftHours,
  getDesiredShiftHour: getDesiredShiftHour,
  getDesiredShiftHoursByEmployee: getDesiredShiftHoursByEmployee,
  getDesiredShiftHoursBySchedule: getDesiredShiftHoursBySchedule,
  createDesiredShiftHour: createDesiredShiftHour,
  updateDesiredShiftHour: updateDesiredShiftHour,
  deleteDesiredShiftHour: deleteDesiredShiftHour,
  deleteDesiredShiftHourBySchedule: deleteDesiredShiftHourBySchedule,
  deleteDesiredShiftHourByEmployee: deleteDesiredShiftHourByEmployee,
};
