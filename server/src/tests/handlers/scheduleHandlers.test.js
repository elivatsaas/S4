const scheduleHandlers = require("../../handlers/scheduleHandlers");
const shiftHandlers = require("../../handlers/shiftHandlers");
const roleHandlers = require("../../handlers/roleHandlers");
const storeHandlers = require("../../handlers/storeHandlers");
const employeeHandlers = require("../../handlers/employeeHandlers");

jest.mock("../../handlers/availabilityHandlers", () => ({
  deleteAvailabilityBySchedule: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/dshHandlers", () => ({
  deleteDesiredShiftHourBySchedule: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/shiftHandlers", () => ({
  deleteShiftBySchedule: jest.fn().mockResolvedValue(),
  getShiftsBySchedule: jest.fn().mockResolvedValue([]),
  updateShift: jest.fn().mockResolvedValue(),
}));

jest.mock("../../utils/email", () => ({
  sendEmail: jest.fn().mockResolvedValue(true),
}));

jest.mock("../../handlers/roleHandlers", () => ({
  getAllRoles: jest.fn().mockResolvedValue([
    { id: 1, roleName: "Role 1" },
    { id: 2, roleName: "Role 2" },
  ]),
}));

jest.mock("../../handlers/storeHandlers", () => ({
  getAllStores: jest.fn().mockResolvedValue([
    { id: 1, storeName: "Store 1" },
    { id: 2, storeName: "Store 2" },
  ]),
}));

jest.mock("../../handlers/employeeHandlers", () => ({
  getEmployee: jest.fn().mockResolvedValue({
    email: "test@example.com",
    firstName: "John",
    lastName: "Doe",
  }),
}));

describe("Schedule Handlers", () => {
  test("should create, update, and delete a schedule from the database", async () => {
    const newSchedule = {
      startDate: "2024-04-29",
      endDate: "2024-05-05",
      scheduleName: "TestSchedule",
    };

    const createdSchedule = await scheduleHandlers.createSchedule(
      newSchedule.startDate,
      newSchedule.endDate,
      newSchedule.scheduleName
    );

    expect(createdSchedule).toBeDefined();
    expect(createdSchedule.startDate.toISOString().substring(0, 10)).toBe(
      newSchedule.startDate
    );
    expect(createdSchedule.endDate.toISOString().substring(0, 10)).toBe(
      newSchedule.endDate
    );
    expect(createdSchedule.scheduleName).toBe(newSchedule.scheduleName);

    const updatedScheduleData = {
      startDate: "2024-05-01",
      endDate: "2024-05-07",
      scheduleName: "Updated Schedule",
    };

    const updatedSchedule = await scheduleHandlers.updateSchedule(
      createdSchedule.id,
      updatedScheduleData.startDate,
      updatedScheduleData.endDate,
      updatedScheduleData.scheduleName
    );

    expect(updatedSchedule).toBeDefined();
    expect(updatedSchedule.startDate.toISOString().substring(0, 10)).toBe(
      updatedScheduleData.startDate
    );
    expect(updatedSchedule.endDate.toISOString().substring(0, 10)).toBe(
      updatedScheduleData.endDate
    );
    expect(updatedSchedule.scheduleName).toBe(updatedScheduleData.scheduleName);

    const deletedSchedule = await scheduleHandlers.deleteSchedule(
      createdSchedule.id
    );

    expect(deletedSchedule).toBeDefined();
    expect(deletedSchedule.id).toBe(createdSchedule.id);
  });

  afterAll(async () => {
    await scheduleHandlers.closeConnectionPool();
  });
});
