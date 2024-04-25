const mysql = require("mysql2");
const dotenv = require("dotenv");
const process = require("process");

const availabilityHandler = require("./availabilityHandlers");
const dshHandlers = require("./dshHandlers");
const shiftHandlers = require("./shiftHandlers");
const employeeHandlers = require("./employeeHandlers");
const sendEmail = require("../utils/email");
const roleHandlers = require("./roleHandlers");
const storeHandlers = require("./storeHandlers");

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
  let employeeShifts = shifts.filter(
    (shift) => shift.Employee_id === employeeId
  );

  if (employeeShifts.length === 0) {
    console.log(
      `No shifts found for employee ${employeeId} in schedule ${scheduleId}.`
    );
  }
  const { email, firstName, lastName } = await employeeHandlers.getEmployee(
    employeeId
  );
  const { startDate, endDate } = await getSchedule(scheduleId);
  // Construct email content
  let emailContent = `
    Dear ${firstName} ${lastName},
    We are pleased to confirm your shifts from ${startDate} to ${endDate}:
   
  `;
  const roles = await roleHandlers.getAllRoles();
  const stores = await storeHandlers.getAllStores();
  employeeShifts = employeeShifts.map((shift) => {
    const role = roles.find((role) => role.id === shift.Role_id);
    shift.role = role ? role.roleName : null;
    const store = stores.find((store) => store.id === shift.Store_id);
    shift.store = store ? store.storeName : null;
    return shift;
  });
  // Append shift information
  employeeShifts.forEach((shift, index) => {
    emailContent += `
      Date: ${shift.date}
      Start Time: ${shift.startTime}
      End Time: ${shift.endTime}
      Store: ${shift.store}
      Role: ${shift.role}
    `;
  });
  try {
    // Get the email address of the employee (assuming you have a function to retrieve it)
    // Send email
    const emailSent = await sendEmail({
      email: email,
      subject: `Confirmation of Shifts for Schedule ${scheduleId}`,
      message: emailContent,
    });
    if (emailSent) {
      console.log(
        `Confirmation email sent successfully to employee ${employeeId}.`
      );
    } else {
      console.log(
        `Error sending confirmation email to employee ${employeeId}.`
      );
    }
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
