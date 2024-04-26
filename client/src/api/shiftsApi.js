import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const shiftsApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const shiftsUrlEndpoint = "/shifts";

export const getShifts = async () => {
  await delay();
  const response = await shiftsApi.get(shiftsUrlEndpoint);
  return response.data.data.shifts;
};

export const getShift = async (id) => {
  await delay();
  const response = await shiftsApi.get(`${shiftsUrlEndpoint}/${id}`);
  return response.data.data;
};

export const getShiftsBySchedule = async (id) => {
  await delay();
  const response = await shiftsApi.get(`${shiftsUrlEndpoint}/schedules/${id}`);
  return response.data.shift;
};

export const getEmployeesForShift = async (id) => {
  await delay();
  const response = await shiftsApi.get(`/employees/${id}`);
  return response.data.data.employees;
};

export const getShiftsByDate = async (shiftId) => {
  await delay();
  const response = await shiftsApi.get(`/dates/${shiftId}`);
  return response.data.data.shifts;
};

export const addShift = async ({
  date,
  startTime,
  endTime,
  Employee_id,
  Schedule_id,
  Role_id,
  Store_id,
}) => {
  await delay();
  const response = await shiftsApi.post(shiftsUrlEndpoint, {
    date,
    startTime,
    endTime,
    Employee_id,
    Schedule_id,
    Role_id,
    Store_id,
  });
  return response.data;
};
export const tradeShift = async ({ firstShiftId, secondShiftId }) => {
  await delay();
  const response = await shiftsApi.post(`${shiftsUrlEndpoint}/trade}`, {
    firstShiftId,
    secondShiftId,
  });
  return response.data;
};
export const giveShift = async ({ shiftId, employeeId }) => {
  await delay();
  const response = await shiftsApi.post(`${shiftsUrlEndpoint}/give}`, {
    shiftId,
    employeeId,
  });
  return response.data;
};

export const updateShift = async (shift) => {
  await delay();

  const shiftRes = await getShift(shift.id);
  const legacyShift = shiftRes.shift;

  const updatedShift = {
    ...legacyShift,
    ...shift,
  };

  const response = await shiftsApi.patch(
    `${shiftsUrlEndpoint}/${shift.id}`,
    updatedShift
  );
  return response.data;
};

export const deleteShift = async (id) => {
  await delay();
  const response = await shiftsApi.delete(`${shiftsUrlEndpoint}/${id}`);
  return response.data;
};
