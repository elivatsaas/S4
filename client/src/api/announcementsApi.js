import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const announcementsApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const announcementsUrlEndpoint = "/announcements";

export const getAnnouncements = async () => {
  await delay();
  const response = await announcementsApi.get(announcementsUrlEndpoint);
  return response.data.data.announcements;
};

export const getAnnouncement = async (id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/${id}`
  );
  return response.data;
};
export const getAnnouncementsBySchedules = async () => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/schedules`
  );
  return response.data.data.announcements[0];
};
export const getAnnouncementsBySchedule = async (Schedule_id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/schedules/${Schedule_id}`
  );
  return response.data.announcement;
};

export const getAnnouncementsByStores = async () => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/stores`
  );
  return response.data.data.announcement;
};
export const getAnnouncementsByStore = async (Store_id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/stores/${Store_id}`
  );
  return response.data.announcement;
};
export const getAnnouncementsByRoles = async () => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/roles`
  );
  return response.data.data.announcement;
};
export const getAnnouncementsByRole = async (Role_id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/roles/${Role_id}`
  );
  return response.data.announcement;
};
export const getAnnouncementsByEmployees = async () => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/employees`
  );
  return response.data.data.announcements[0];
};
export const getAnnouncementsByEmployee = async (Employee_id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/employees/${Employee_id}`
  );
  return response.data.announcement;
};

export const getAnnouncementsByShiftDates = async () => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/shifts`
  );
  return response.data.announcement;
};

export const getAnnouncementsByShiftDate = async (Shift_id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/shifts/${Shift_id}`
  );
  return response.data.announcement;
};

export const createAnnouncement = async (body, Employee_id) => {
  await delay();
  const response = await announcementsApi.post(announcementsUrlEndpoint, {
    body,
    Employee_id,
  });
  return response.data;
};

export const updateAnnouncement = async (announcement_id, body) => {
  await delay();
  const response = await announcementsApi.patch(
    `${announcementsUrlEndpoint}/${announcement_id}`,
    {
      body,
    }
  );
  return response.data;
};

export const deleteAnnouncement = async (id) => {
  await delay();
  const response = await announcementsApi.delete(
    `${announcementsUrlEndpoint}/${id}`
  );
  return response.data;
};
