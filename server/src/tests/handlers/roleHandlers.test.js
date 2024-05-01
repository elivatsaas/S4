const roleHandlers = require("../../handlers/roleHandlers");

jest.mock("../../handlers/employeeRoleHandlers", () => ({
  deleteEmployeeRolesByRole: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/shiftHandlers", () => ({
  deleteShiftByRole: jest.fn().mockResolvedValue(),
}));

describe("Role Handlers", () => {
  let createdRoleId;

  test("should return all roles from the database", async () => {
    const roles = await roleHandlers.getAllRoles();

    expect(Array.isArray(roles)).toBe(true);
    expect(roles.length).toBeGreaterThan(0);
    expect(roles[0]).toHaveProperty("id");
    expect(roles[0]).toHaveProperty("roleName");
  });

  test("should return a role from the database", async () => {
    const role = await roleHandlers.getRole(1);
    expect(role).toHaveProperty("id");
    expect(role).toHaveProperty("roleName");
  });

  test("should create a new role in the database", async () => {
    const roleName = "Test Role";

    const createdRole = await roleHandlers.createRole(roleName);

    createdRoleId = createdRole.id;

    expect(createdRole).toBeDefined();
    expect(createdRole.roleName).toBe(roleName);
  });

  test("should update an existing role in the database", async () => {
    if (!createdRoleId) {
      throw new Error("No role created to update");
    }

    const updatedRoleName = "Updated Test Role";

    // Call the function under test to update the role
    const updatedRole = await roleHandlers.updateRole(
      createdRoleId,
      updatedRoleName
    );

    // Make assertions about the updated role
    expect(updatedRole).toBeDefined();
    expect(updatedRole.roleName).toBe(updatedRoleName);
  });

  test("should delete the created role from the database", async () => {
    if (!createdRoleId) {
      throw new Error("No role created to delete");
    }

    // Call the function under test to delete the role
    const deletedRole = await roleHandlers.deleteRole(createdRoleId);

    // Make assertions about the deleted role
    expect(deletedRole).toBeDefined();
    expect(deletedRole.id).toBe(createdRoleId);

    // Ensure the role is no longer present in the database
    const roleAfterDeletion = await roleHandlers.getRole(createdRoleId);
    expect(!roleAfterDeletion).toBeDefined();
  });

  afterAll(async () => {
    await roleHandlers.closeConnectionPool();
  });
});
