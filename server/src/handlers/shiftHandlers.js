const mysql = require("mysql2");
const dotenv = require("dotenv");

const scheduleHandler = require("./scheduleHandlers");

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllShifts() {
  const [shifts] = await db.query(`SELECT * FROM Shift`);
  console.log(shifts);
  return shifts;
}

async function getShift(id) {
  const [shift] = await db.query(
    `SELECT *
    FROM Shift
    WHERE id = ?
    `,
    [id]
  );

  return shift[0];
}
async function getShiftBySchedule(id) {
  const [result] = await db.query(
    `SELECT *
    FROM Shift
    WHERE Schedule_id = ?
    `,
    [id]
  );

  return result;
}
async function getShiftByStore(id) {
  const [result] = await db.query(
    `SELECT *
    FROM Shift
    WHERE Store_id = ?
    `,
    [id]
  );

  return result;
}

async function getShiftByRole(id) {
  const [result] = await db.query(
    `SELECT *
    FROM Shift
    WHERE Role_id = ?
    `,
    [id]
  );

  return result;
}

async function getEmployeesForShift(id) {
  const [results] = await db.query(
    `CALL 
    FindEmployeesForShift(?)
    `,
    [id]
  );
  return results;
}
async function createShift(
  date,
  startTime,
  endTime,
  Employee_id,
  Schedule_id,
  Role_id,
  Store_id
) {
  const [shift] = await db.query(
    `
    INSERT INTO Shift (date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [date, startTime, endTime, Employee_id, Schedule_id, Role_id, Store_id]
  );

  return getShift(shift.insertId);
}

async function updateShift(
  shift_id,
  date,
  startTime,
  endTime,
  Employee_id,
  Schedule_id,
  Role_id,
  Store_id
) {
  await db.query(
    `
    UPDATE Shift
    SET date = IFNULL(?, date), startTime = IFNULL(?, startTime), endTime = IFNULL(?, endTime), Employee_id = IFNULL(?, Employee_id), Schedule_id = IFNULL(?, Schedule_id), Role_id = IFNULL(?, Role_id), Store_id = IFNULL(?, Store_id)
    WHERE id = ?
    `,
    [
      date,
      startTime,
      endTime,
      Employee_id,
      Schedule_id,
      Role_id,
      Store_id,
      shift_id,
    ]
  );

  return getShift(shift_id);
}

async function deleteShift(id) {
  const shift = getShift(id);

  await db.query(
    `
    DELETE FROM Shift
    WHERE id = ?
    `,
    [id]
  );

  return shift;
}

async function deleteShiftBySchedule(id) {
  const result = getShiftBySchedule(id);

  await db.query(
    `
    DELETE FROM Shift
    WHERE Schedule_id = ?
    `,
    [id]
  );

  return result;
}

async function deleteShiftByStore(id) {
  const result = getShiftByStore(id);

  await db.query(
    `
    DELETE FROM Shift
    WHERE Store_id = ?
    `,
    [id]
  );

  return result;
}

async function deleteShiftByRole(id) {
  const result = getShiftByRole(id);

  await db.query(
    `
    DELETE FROM Shift
    WHERE Role_id = ?
    `,
    [id]
  );

  return result;
}

module.exports = {
  getAllShifts: getAllShifts,
  getShift: getShift,
  getEmployeesForShift: getEmployeesForShift,
  getShiftBySchedule: getShiftBySchedule,
  createShift: createShift,
  updateShift: updateShift,
  deleteShift: deleteShift,
  deleteShiftByRole: deleteShiftByRole,
  deleteShiftByStore: deleteShiftByStore,
  deleteShiftBySchedule: deleteShiftBySchedule,
};
