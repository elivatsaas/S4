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

async function getAllAvailabilities() {
  const [availabilities] = await db.query(`SELECT * FROM Availability`);

  return availabilities;
}

async function getAvailability(id) {
  const [availability] = await db.query(
    `SELECT *
    FROM Availability
    WHERE id = ?
    `,
    [id]
  );

  return availability[0];
}

async function getAvailabilityByEmployee(id) {
  const [availability] = await db.query(
    `SELECT *
    FROM Availability
    WHERE Employee_id = ?
    `,
    [id]
  );

  return availability[0];
}

async function getAvailabilityBySchedule(id) {
  const [availability] = await db.query(
    `SELECT *
    FROM Availability
    WHERE Schedule_id = ?
    `,
    [id]
  );

  return availability[0];
}

async function createAvailability(
  startTime,
  endTime,
  dayOfWeek,
  Employee_id,
  Schedule_id
) {
  const [availability] = await db.query(
    `
    INSERT INTO Availability (startTime, endTime, dayOfWeek, Employee_id, Schedule_id) 
    VALUES (?, ?, ?, ?, ?)
    `,
    [startTime, endTime, dayOfWeek, Employee_id, Schedule_id]
  );

  const id = availability.insertId;
  return getAvailability(id);
}

async function updateAvailability(
  availability_id,
  startTime,
  endTime,
  dayOfWeek,
  Employee_id,
  Schedule_id
) {
  await db.query(
    `
    UPDATE Availability
    SET  startTime = IFNULL(?, startTime), endTime = IFNULL(?, endTime), dayOfWeek = IFNULL(?, dayOfWeek),  Employee_id = IFNULL(?, Employee_id), Schedule_id = IFNULL(?, Schedule_id)
    WHERE id = ?
    `,
    [startTime, endTime, dayOfWeek, Employee_id, Schedule_id, availability_id]
  );

  return getAvailability(availability_id);
}

async function deleteAvailability(id) {
  const availability = getAvailability(id);

  await db.query(
    `
    DELETE FROM Availability
    WHERE id = ?
    `,
    [id]
  );

  return availability;
}

async function deleteAvailabilityByEmployee(id) {
  const result = getAvailabilityByEmployee(id);

  await db.query(
    `
    DELETE FROM Availability
    WHERE Employee_id = ?
    `,
    [id]
  );

  return result;
}

async function deleteAvailabilityBySchedule(id) {
  const result = getAvailabilityBySchedule(id);

  await db.query(
    `
    DELETE FROM Availability
    WHERE Schedule_id = ?
    `,
    [id]
  );

  return result;
}
module.exports = {
  getAllAvailabilities: getAllAvailabilities,
  getAvailability: getAvailability,
  getAvailabilityByEmployee: getAvailabilityByEmployee,
  getAvailabilityBySchedule: getAvailabilityBySchedule,
  createAvailability: createAvailability,
  updateAvailability: updateAvailability,
  deleteAvailability: deleteAvailability,
  deleteAvailabilityBySchedule: deleteAvailabilityBySchedule,
  deleteAvailabilityByEmployee: deleteAvailabilityByEmployee,
};
