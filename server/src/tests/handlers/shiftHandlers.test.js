const shiftHandlers = require("../../handlers/shiftHandlers");

jest.mock("../../handlers/availabilityHandlers", () => ({
  deleteAvailabilityByEmployee: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/employeeStoreHandlers", () => ({
  deleteEmployeeStoresByEmployee: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/employeeRoleHandlers", () => ({
  deleteEmployeeRolesByEmployee: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/dshHandlers", () => ({
  deleteDesiredShiftHourByEmployee: jest.fn().mockResolvedValue(),
}));

describe("Shift Handlers", () => {
  let createdShiftId;
  let updatedShiftId;

  test("should create, update, and delete a shift from the database", async () => {
    const newShift = {
      date: "2024-04-29",
      startTime: "09:00:00",
      endTime: "17:00:00",
      Employee_id: 1,
      Schedule_id: 1,
      Role_id: 1,
      Store_id: 1,
    };

    const createdShift = await shiftHandlers.createShift(
      newShift.date,
      newShift.startTime,
      newShift.endTime,
      newShift.Employee_id,
      newShift.Schedule_id,
      newShift.Role_id,
      newShift.Store_id
    );

    createdShiftId = createdShift.id;

    expect(createdShift).toBeDefined();
    expect(createdShift.date.toISOString().substring(0, 10)).toBe(
      newShift.date
    );
    expect(createdShift.startTime).toBe(newShift.startTime);
    expect(createdShift.endTime).toBe(newShift.endTime);
    expect(createdShift.Employee_id).toBe(newShift.Employee_id);
    expect(createdShift.Schedule_id).toBe(newShift.Schedule_id);
    expect(createdShift.Role_id).toBe(newShift.Role_id);
    expect(createdShift.Store_id).toBe(newShift.Store_id);

    const updatedShiftData = {
      date: "2024-05-01",
      startTime: "08:00:00",
      endTime: "16:00:00",
      Employee_id: 2,
      Schedule_id: 2,
      Role_id: 2,
      Store_id: 2,
    };

    const updatedShift = await shiftHandlers.updateShift(
      createdShiftId,
      updatedShiftData.date,
      updatedShiftData.startTime,
      updatedShiftData.endTime,
      updatedShiftData.Employee_id,
      updatedShiftData.Schedule_id,
      updatedShiftData.Role_id,
      updatedShiftData.Store_id
    );

    updatedShiftId = updatedShift.id;

    expect(updatedShift).toBeDefined();
    expect(updatedShift.date.toISOString().substring(0, 10)).toBe(
      updatedShiftData.date
    );
    expect(updatedShift.startTime).toBe(updatedShiftData.startTime);
    expect(updatedShift.endTime).toBe(updatedShiftData.endTime);
    expect(updatedShift.Employee_id).toBe(updatedShiftData.Employee_id);
    expect(updatedShift.Schedule_id).toBe(updatedShiftData.Schedule_id);
    expect(updatedShift.Role_id).toBe(updatedShiftData.Role_id);
    expect(updatedShift.Store_id).toBe(updatedShiftData.Store_id);

    const deletedShift = await shiftHandlers.deleteShift(updatedShiftId);

    expect(deletedShift).toBeDefined();
    expect(deletedShift.id).toBe(updatedShiftId);

    const shiftAfterDeletion = await shiftHandlers.getShift(createdShiftId);
    expect(!shiftAfterDeletion).toBeDefined();
  });

  afterAll(async () => {
    await shiftHandlers.closeConnectionPool();
  });
});
