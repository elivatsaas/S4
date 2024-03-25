import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const shiftsApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const shiftsUrlEndpoint = "/shifts";

export const getShifts = async () => {
  await delay();
  const response = await shiftsApi.get(shiftsUrlEndpoint);
  return response.data.shift;
};

export const getShiftsBySchedule = async (id) => {
  await delay();
  const response = await shiftsApi.get(shiftsUrlEndpoint + "/schedules" + id);
  console.log(response.data);
  return response.data;
};

export const addShift = async ({ startDate, endDate, shiftName }) => {
  await delay();
  const response = await shiftsApi.post(shiftsUrlEndpoint, {
    startDate,
    endDate,
    shiftName,
  });
  return response.data;
};

export const updateShift = async (shift) => {
  await delay();
  const response = await shiftsApi.patch(
    `${shiftsUrlEndpoint}/${shift.id}`,
    shift
  );
  return response.data;
};

export const deleteShift = async ({ id }) => {
  await delay();
  const response = await shiftsApi.delete(`${shiftsUrlEndpoint}/${id}`);
  return response.data;
};
