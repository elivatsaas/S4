const announcementHandlers = require("../../handlers/announcementHandlers");

describe("Announcement Handlers", () => {
  let createdAnnouncementId;

  test("should return all announcements from the database", async () => {
    const announcements = await announcementHandlers.getAllAnnouncements();

    expect(Array.isArray(announcements)).toBe(true);
    expect(announcements.length).toBeGreaterThan(0);
    expect(announcements[0]).toHaveProperty("id");
    expect(announcements[0]).toHaveProperty("body");
    expect(announcements[0]).toHaveProperty("Employee_id");
  });

  test("should return a announcement from the database", async () => {
    const announcement = await announcementHandlers.getAnnouncement(7);

    expect(announcement).toHaveProperty("id");
    expect(announcement).toHaveProperty("body");
    expect(announcement).toHaveProperty("Employee_id");
  });

  test("should create a new announcement in the database", async () => {
    const body = "Jest Test Announcement";
    const employeeId = 1;

    // Call the function under test to create the announcement
    const createdAnnouncement = await announcementHandlers.createAnnouncement(
      body,
      employeeId
    );

    createdAnnouncementId = createdAnnouncement.id;

    // Make assertions about the created announcement
    expect(createdAnnouncement).toBeDefined();
    expect(createdAnnouncement.body).toBe(body);
    expect(createdAnnouncement.Employee_id).toBe(employeeId);
  });

  test("should delete the created announcement from the database", async () => {
    if (!createdAnnouncementId) {
      throw new Error("No announcement created to delete");
    }
    const createdAnnouncement = await announcementHandlers.getAnnouncement(
      createdAnnouncementId
    );
    // Call the function under test to delete the announcement
    const deletedAnnouncement = await announcementHandlers.deleteAnnouncement(
      createdAnnouncementId
    );

    expect(deletedAnnouncement).toBeDefined();
    expect(deletedAnnouncement.body).toBe(createdAnnouncement.body);
    expect(deletedAnnouncement.Employee_id).toBe(
      createdAnnouncement.Employee_id
    );

    const announcementAfterDeletion =
      await announcementHandlers.getAnnouncement(createdAnnouncementId);
    expect(!announcementAfterDeletion).toBeDefined();
  });

  afterAll(async () => {
    await announcementHandlers.closeConnectionPool();
  });
});
