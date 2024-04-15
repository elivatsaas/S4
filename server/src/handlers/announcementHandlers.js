const mysql = require("mysql2");
const dotenv = require("dotenv");
const shiftHandlers = require("./shiftHandlers");
const employeeHandlers = require("./employeeHandlers");
const sendEmail = require("../utils/email");
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

async function getAllAnnouncements() {
  const [annoucements] = await db.query(`SELECT * FROM Announcement`);
  return annoucements;
}

async function getAnnouncement(id) {
  const [annoucement] = await db.query(
    `SELECT *
    FROM Announcement
    WHERE id = ?
    `,
    [id]
  );

  return annoucement[0];
}
async function getAnnouncementsBySchedule(Schedule_id, id) {
  const [result] = await db.query(
    `SELECT *
    FROM Announcement
    WHERE Schedule_id = ?
    AND Announcement_id = ? 
    `,
    [Schedule_id, id]
  );

  return result;
}
async function getAnnouncementByStore(Store_id, id) {
  const [result] = await db.query(
    `SELECT *
    FROM AnnouncementStores
    WHERE Store_id = ?
    AND Announcement_id = ?
    `,
    [Store_id, id]
  );

  return result;
}

async function getAnnouncementByRole(Role_id, id) {
  const [result] = await db.query(
    `SELECT *
    FROM AnnouncementRoles
    WHERE Role_id = ?
    AND Announcement_id = ?
    `,
    [Role_id, id]
  );

  return result;
}

async function getAnnouncementByEmployee(Employee_id, id) {
  results[i] = await db.query(
    `SELECT *
        FROM AnnouncementShifts
        WHERE Employee_id = ?
        AND Announcement_id = ?
        `,
    [Employee_id, id]
  );
  return results;
}

async function getAnnouncementByShiftDate(date, id) {
  const [shifts] = shiftHandlers.getShiftsByDate(date);
  var results = new Array();
  for (let i = 0; i < shifts.length; i++) {
    results[i] = await db.query(
      `SELECT *
        FROM AnnouncementShifts
        WHERE Shift_id = ?
        AND Announcement_id = ?
        `,
      [shifts[i].id, id]
    );
  }
  return results;
}

async function createAnnouncement(body, Employee_id) {
  const [annoucement] = await db.query(
    `
    INSERT INTO Announcement(body, Employee_id)
    VALUES (?, ?)
    `,
    [body, Employee_id]
  );

  if (!annoucement) {
    return next(new AppError("Announcement failed to post", 400));
  }
  emails = await sendEmailsForAnnouncement(
    await getAnnouncement(annoucement.insertId)
  );
  return getAnnouncement(annoucement.insertId);
}

async function updateAnnouncement(annoucement_id, body) {
  await db.query(
    `
    UPDATE Announcement
    SET body = ?
    WHERE id = ?
    `,
    [body, annoucement_id]
  );

  return getAnnouncement(annoucement_id);
}

async function deleteAnnouncement(id) {
  const annoucement = getAnnouncement(id);

  await db.query(
    `
    DELETE FROM Announcement
    WHERE id = ?
    `,
    [id]
  );

  return annoucement;
}

async function sendEmailsForAnnouncement(announcement) {
  try {
    const emails = await determineRecipientEmails(announcement);
    const sender = await employeeHandlers.getEmployee(announcement.Employee_id);
    const subject = `S4: Announcement, sent by: ${sender.firstName} ${sender.lastName}`;
    console.log("aftwer subject");
    console.log(emails);
    for (const email of emails) {
      await sendEmail({
        email: email,
        subject: subject,
        message: announcement.body,
      });
    }
  } catch (err) {
    console.error(err);
    throw new Error(
      "Announcement email failed to send, please try again later"
    );
  }
}

async function determineRecipientEmails(announcement) {
  let recipientEmails = await employeeHandlers.getAllEmployeeEmails();

  try {
    if (announcement.Schedule_id !== undefined) {
      console.log("Fetching emails by schedule...");
      const scheduleEmployees = await getEmployeeEmailsBySchedule(
        announcement.Schedule_id
      );
      console.log("Schedule employees:", scheduleEmployees);
      recipientEmails = intersection(recipientEmails, scheduleEmployees);
    }

    if (await isAnnouncementInShift(announcement.id)) {
      console.log("Fetching emails by shift...");
      const shiftEmployees = await getEmployeeEmailsByShift(announcement.id);
      console.log("Shift employees:", shiftEmployees);
      recipientEmails = intersection(recipientEmails, shiftEmployees);
    }

    if (await isAnnouncementInStore(announcement.id)) {
      console.log("Fetching emails by store...");
      const storeEmployees = await getEmployeeEmailsByStore(announcement.id);
      console.log("Store employees:", storeEmployees);
      recipientEmails = intersection(recipientEmails, storeEmployees);
    }

    if (await isAnnouncementInRole(announcement.id)) {
      console.log("Fetching emails by role...");
      const roleEmployees = await getEmployeeEmailsByRole(announcement.id);
      console.log("Role employees:", roleEmployees);
      recipientEmails = intersection(recipientEmails, roleEmployees);
    }

    if (await isAnnouncementInEmployee(announcement.id)) {
      console.log("Fetching specific employees...");
      const specificEmployees = await getEmployeeEmailsByAnnouncement(
        announcement.id
      );
      console.log("Specific employees:", specificEmployees);
      recipientEmails = intersection(recipientEmails, specificEmployees);
    }

    console.log("Final recipient emails:", recipientEmails);
    return recipientEmails;
  } catch (error) {
    console.error("Error determining recipient emails:", error);
    throw new Error("Failed to determine recipient emails");
  }
}

function intersection(array1, array2) {
  return array1.filter((value) => array2.includes(value));
}

async function getEmployeeEmailsBySchedule(scheduleId) {
  let employeeEmails = [];

  try {
    const shifts = await shiftsHandler.getShiftsBySchedule(scheduleId);

    for (const shift of shifts) {
      const employees = await getEmployeesByShiftId(shift.id);
      employeeEmails = employeeEmails.concat(employees);
    }
  } catch (error) {
    console.error("Error retrieving employees by schedule ID:", error);
    return new AppError("Failed to retrieve employees by schedule ID");
  }

  return employeeEmails;
}

async function getEmployeeEmailsByShift(shiftId) {
  try {
    const { date } = await shiftHandlers.getShift(shiftId);
    const shiftsOnSameDate = await shiftHandlers.getShiftsByDate(date);
    const employeeIds = shiftsOnSameDate.map((shift) => shift.Employee_id);
    const employees = await Promise.all(
      employeeIds.map((id) => employeeHandlers.getEmployee(id))
    );
    const employeeEmails = employees.map((employee) => employee.email);
    return employeeEmails;
  } catch (error) {
    console.error("Error retrieving employees by shift ID:", error);
    throw new AppError("Failed to retrieve employees by shift ID");
  }
}

async function getEmployeeEmailsByStore(storeId) {
  try {
    const employees = await employeeHandlers.getEmployeesByStore(storeId);
    const employeeEmails = employees.map((employee) => employee.email);
    return employeeEmails;
  } catch (error) {
    console.error("Error retrieving employees by store ID:", error);
    throw new AppError("Failed to retrieve employees by store ID");
  }
}

async function getEmployeeEmailsByRole(roleId) {
  try {
    const employees = await employeeHandlers.getEmployeesByRole(roleId);
    const employeeEmails = employees.map((employee) => employee.email);
    return employeeEmails;
  } catch (error) {
    console.error("Error retrieving employees by role ID:", error);
    throw new AppError("Failed to retrieve employees by role ID");
  }
}

async function getEmployeeEmailsByAnnouncement(announcementId) {
  try {
    const employees = await employeeHandlers.getEmployeesByAnnouncement(
      announcementId
    );
    const employeeEmails = employees.map((employee) => employee.email);
    return employeeEmails;
  } catch (error) {
    console.error("Error retrieving employees by announcement ID:", error);
    throw new AppError("Failed to retrieve employees by announcement ID");
  }
}

async function isAnnouncementInSchedule(announcementId) {
  try {
    // Query AnnouncementSchedules table to check if the announcement ID exists
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM AnnouncementSchedules WHERE Announcement_id = ?`,
      [announcementId]
    );

    // If count > 0, the announcement ID exists in AnnouncementSchedules
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error checking if announcement is in schedule:", error);
    throw new Error("Failed to check if announcement is in schedule");
  }
}
async function isAnnouncementInShift(announcementId) {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM AnnouncementShifts WHERE Announcement_id = ?`,
      [announcementId]
    );
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error checking if announcement is in shifts:", error);
    throw new Error("Failed to check if announcement is in shifts");
  }
}

async function isAnnouncementInStore(announcementId) {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM AnnouncementStores WHERE Announcement_id = ?`,
      [announcementId]
    );
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error checking if announcement is in stores:", error);
    throw new Error("Failed to check if announcement is in stores");
  }
}

async function isAnnouncementInRole(announcementId) {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM AnnouncementRoles WHERE Announcement_id = ?`,
      [announcementId]
    );
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error checking if announcement is in roles:", error);
    throw new Error("Failed to check if announcement is in roles");
  }
}

async function isAnnouncementInEmployee(announcementId) {
  try {
    const [rows] = await db.query(
      `SELECT COUNT(*) AS count FROM AnnouncementEmployees WHERE Announcement_id = ?`,
      [announcementId]
    );
    return rows[0].count > 0;
  } catch (error) {
    console.error("Error checking if announcement is in employees:", error);
    throw new Error("Failed to check if announcement is in employees");
  }
}

module.exports = {
  getAllAnnouncements: getAllAnnouncements,
  getAnnouncement: getAnnouncement,
  getAnnouncementsBySchedule: getAnnouncementsBySchedule,
  getAnnouncementByShiftDate: getAnnouncementByShiftDate,
  getAnnouncementByStore: getAnnouncementByStore,
  getAnnouncementByRole: getAnnouncementByRole,
  getAnnouncementByEmployee: getAnnouncementByEmployee,
  createAnnouncement: createAnnouncement,
  updateAnnouncement: updateAnnouncement,
  deleteAnnouncement: deleteAnnouncement,
};
