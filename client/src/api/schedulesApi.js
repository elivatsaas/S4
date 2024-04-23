import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const schedulesApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const schedulesUrlEndpoint = "/schedules";

export const getSchedules = async () => {
  await delay();
  const response = await schedulesApi.get(schedulesUrlEndpoint);
  return response.data.data.schedules;
};

export const getSchedule = async (id) => {
  await delay();
  const response = await schedulesApi.get(`${schedulesUrlEndpoint}/${id}`);
  return response.data.data;
};

export const addSchedule = async ({ startDate, endDate, scheduleName }) => {
  await delay();
  const response = await schedulesApi.post(schedulesUrlEndpoint, {
    startDate,
    endDate,
    scheduleName,
  });
  return response.data;
};

export const updateSchedule = async (schedule) => {
  await delay();

  var scheduleRes = await getSchedule(schedule.id);
  const legacySchedule = await scheduleRes.schedule;

  const updatedSchedule = {
    startDate: schedule.startDate || legacySchedule.startDate,
    endDate: schedule.endDate || legacySchedule.endDate,
    scheduleName: schedule.scheduleName || legacySchedule.scheduleName,
  };

  const response = await schedulesApi.patch(
    `${schedulesUrlEndpoint}/${schedule.id}`,
    updatedSchedule
  );
  return response.data;
};

export const deleteSchedule = async (id) => {
  await delay();
  const response = await schedulesApi.delete(`${schedulesUrlEndpoint}/${id}`);
  return response.data;
};

export const generateSchedule = async (id) => {
  await delay();
  const response = await schedulesApi.get(
    `${schedulesUrlEndpoint}/generate/${id}`
  );
  return response.data;
};
