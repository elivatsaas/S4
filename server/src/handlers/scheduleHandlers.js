const mysql = require("mysql2");
const dotenv = require("dotenv");
const process = require("process");

const availabilityHandler = require("./availabilityHandlers");
const dshHandlers = require("./dshHandlers");
const shiftHandlers = require("./shiftHandlers");
const employeeHandlers = require("./employeeHandlers");

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

async function generateSchedule(id) {
  var execFile = require("child_process").execFile;
  let idPass = id.toString();
  console.log("about to pass");
  const promiseExec = new Promise((resolve, reject) => {
    var child = execFile("../build/Release/schedule-generator", [`${idPass}`], {
      cwd: __dirname,
    });
    child.stdout.pipe(process.stdout);
    child.on("exit", function () {
      resolve("schedule generated");
    });
  });
  let result = await promiseExec;
  return result;
}

async function setScheduleNull(id) {
  var shifts = await shiftHandlers.getShiftsBySchedule(id);
  for (let i = 0; i < shifts.length; i++) {
    shifts[i].Employee_id = null;
    await shiftHandlers.updateShift(shifts[i].id);
  }
  return shifts;
}

async function sendScheduleEmail(employeeId, scheduleId, shifts) {
  // Retrieve employee's shifts for the schedule
  const employeeShifts = shifts.filter(
    (shift) =>
      shift.employeeId === employeeId && shift.scheduleId === scheduleId
  );

  if (employeeShifts.length === 0) {
    console.log(
      `No shifts found for employee ${employeeId} in schedule ${scheduleId}.`
    );
    return;
  }

  // Construct email content
  let emailContent = `
    <p>Dear Employee,</p>
    <p>We are pleased to confirm your shifts for Schedule ${scheduleId}:</p>
    <ul>
  `;

  // Append shift information
  employeeShifts.forEach((shift, index) => {
    emailContent += `
      <li><strong>Shift ${index + 1}:</strong></li>
      <li>Date: ${shift.date}</li>
      <li>Start Time: ${shift.startTime}</li>
      <li>End Time: ${shift.endTime}</li>
      <li>Location: ${shift.location}</li>
      <br>
    `;
  });

  emailContent += `</ul>
    <p>Please make sure to attend on time.</p>
    <p>Best regards,</p>
    <p>Your Organization</p>
  `;

  try {
    // Get the email address of the employee (assuming you have a function to retrieve it)
    const { email } = await employeeHandlers.getEmployee(employeeId);

    // Send email
    await sendEmail({
      to: email,
      subject: `Confirmation of Shifts for Schedule ${scheduleId}`,
      html: emailContent,
    });

    console.log(
      `Confirmation email sent successfully to employee ${employeeId}.`
    );
  } catch (error) {
    console.error(
      `Error sending confirmation email to employee ${employeeId}:`,
      error
    );
  }
}

module.exports = {
  getAllSchedules: getAllSchedules,
  getSchedule: getSchedule,
  getEmployeesForSchedule: getEmployeesForSchedule,
  createSchedule: createSchedule,
  updateSchedule: updateSchedule,
  deleteSchedule: deleteSchedule,
  generateSchedule: generateSchedule,
  setScheduleNull: setScheduleNull,
  sendScheduleEmail: sendScheduleEmail,
};
