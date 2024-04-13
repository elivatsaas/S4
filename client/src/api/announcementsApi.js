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

export const getAnnouncementsBySchedule = async (Schedule_id, id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/schedules/${Schedule_id}/${id}`
  );
  return response.data;
};

export const getAnnouncementByStore = async (Store_id, id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/stores/${Store_id}/${id}`
  );
  return response.data;
};

export const getAnnouncementByRole = async (Role_id, id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/roles/${Role_id}/${id}`
  );
  return response.data;
};

export const getAnnouncementByEmployee = async (Employee_id, id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/employees/${Employee_id}/${id}`
  );
  return response.data;
};

export const getAnnouncementByShiftDate = async (date, id) => {
  await delay();
  const response = await announcementsApi.get(
    `${announcementsUrlEndpoint}/shifts/${date}/${id}`
  );
  return response.data;
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
