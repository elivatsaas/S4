const storeHandlers = require("../../handlers/storeHandlers");

jest.mock("../../handlers/employeeStoreHandlers", () => ({
  deleteEmployeeStoresByStore: jest.fn().mockResolvedValue(),
}));

jest.mock("../../handlers/shiftHandlers", () => ({
  deleteShiftByStore: jest.fn().mockResolvedValue(),
}));

describe("Store Handlers", () => {
  let createdStoreId;

  test("should return all stores from the database", async () => {
    const stores = await storeHandlers.getAllStores();

    expect(Array.isArray(stores)).toBe(true);
    expect(stores.length).toBeGreaterThan(0);
    expect(stores[0]).toHaveProperty("id");
    expect(stores[0]).toHaveProperty("storeName");
  });

  test("should return a store from the database", async () => {
    const store = await storeHandlers.getStore(1);
    expect(store).toHaveProperty("id");
    expect(store).toHaveProperty("storeName");
  });

  test("should create a new store in the database", async () => {
    const storeName = "Test Store";

    const createdStore = await storeHandlers.createStore(storeName);

    createdStoreId = createdStore.id;

    expect(createdStore).toBeDefined();
    expect(createdStore.storeName).toBe(storeName);
  });

  test("should update an existing store in the database", async () => {
    if (!createdStoreId) {
      throw new Error("No store created to update");
    }

    const updatedStoreName = "Updated Test Store";

    const updatedStore = await storeHandlers.updateStore(
      createdStoreId,
      updatedStoreName
    );

    expect(updatedStore).toBeDefined();
    expect(updatedStore.storeName).toBe(updatedStoreName);
  });

  test("should delete the created store from the database", async () => {
    if (!createdStoreId) {
      throw new Error("No store created to delete");
    }

    const deletedStore = await storeHandlers.deleteStore(createdStoreId);

    expect(deletedStore).toBeDefined();
    expect(deletedStore.id).toBe(createdStoreId);

    const storeAfterDeletion = await storeHandlers.getStore(createdStoreId);
    expect(!storeAfterDeletion).toBeDefined();
  });

  afterAll(async () => {
    await storeHandlers.closeConnectionPool();
  });
});
