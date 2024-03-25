const mysql = require("mysql2");
const dotenv = require("dotenv");
const process = require("process");

const availabilityHandler = require("./availabilityHandlers");
const dshHandlers = require("./dshHandlers");
const shiftHandlers = require("./shiftHandlers");

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
// var child = execFile(
//   "../build/Release/schedule-generator",
//   [],
//   { cwd: __dirname },
//   function (error, stdout, stderr) {
//     console.log(stdout);
//     console.log(stderr);
//     console.log(error);
//     console.log("Schedule generated");
//   }
// );
async function generateSchedule(id) {
  var execFile = require("child_process").execFile;

  const promiseExec = new Promise((resolve, reject) => {
    const { getShiftsBySchedule } = require("./shiftHandlers");

    var child = execFile("../build/Release/schedule-generator", [], {
      cwd: __dirname,
    });
    child.stdout.pipe(process.stdout);
    child.on("exit", function () {
      resolve("schedule generated");
    });
  });
  let result = await promiseExec(id);
  return result;
}

module.exports = {
  getAllSchedules: getAllSchedules,
  getSchedule: getSchedule,
  getEmployeesForSchedule: getEmployeesForSchedule,
  createSchedule: createSchedule,
  updateSchedule: updateSchedule,
  deleteSchedule: deleteSchedule,
  generateSchedule: generateSchedule,
};
