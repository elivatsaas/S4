const mysql = require('mysql2');
const dotenv = require('dotenv');

const availabilityHandler = require('./../handlers/availabilityHandlers');
const employeeStoresHandler = require('./../handlers/dshHandlers');
const employeeRolesHandler = require('./../handlers/shiftHandlers');
const dshHandlers = require('./../handlers/dshHandlers');
const shiftHandlers = require('./../handlers/shiftHandlers');

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

async function getAllSchedules() {
  const [schedules] = await db.query(`SELECT * FROM Schedule`);

  return schedules;
}

async function getSchedule(id) {
  const [schedule] = await db.query(
    `SELECT *
    FROM Schedule
    WHERE id = ?
    `,
    [id]
  );

  return schedule[0];
}

async function getEmployeesForSchedule(id) {
  const [results] = await db.query(
    `CALL
    FindEmployeesForSchedule(?)
    `,
    [id]
  );

  return results;
}

async function createSchedule(startDate, endDate, scheduleName) {
  const [schedule] = await db.query(
    `
    INSERT INTO Schedule (id, startDate, endDate, scheduleName) 
    VALUES (?, ?, ?, ?)
    `,
    [0, startDate, endDate, scheduleName]
  );

  return getSchedule(schedule.insertId);
}

async function updateSchedule(schedule_id, startDate, endDate, scheduleName) {
  await db.query(
    `
    UPDATE Schedule
    SET startDate = IFNULL(?, startDate), endDate = IFNULL(?, endDate), scheduleName = IFNULL(?, scheduleName)
    WHERE id = ?
    `,
    [startDate, endDate, scheduleName, schedule_id]
  );

  return getSchedule(schedule_id);
}

async function deleteSchedule(id) {
  const schedule = getSchedule(id);

  availabilityHandler.deleteAvailabilityBySchedule(id);
  dshHandlers.deleteDesiredShiftHourBySchedule(id);
  shiftHandlers.deleteShiftBySchedule(id);

  await db.query(
    `
    DELETE FROM Schedule
    WHERE id = ?
    `,
    [id]
  );

  return schedule;
}

module.exports = {
  getAllSchedules: getAllSchedules,
  getSchedule: getSchedule,
  getEmployeesForSchedule: getEmployeesForSchedule,
  createSchedule: createSchedule,
  updateSchedule: updateSchedule,
  deleteSchedule: deleteSchedule,
};
