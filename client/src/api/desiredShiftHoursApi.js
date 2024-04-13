import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const dshApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const dshUrlEndpoint = "/dsh";

export const getDSHs = async () => {
  await delay();
  const response = await dshApi.get(dshUrlEndpoint);
  return response.data.data.dsh;
};

export const getDSH = async (id) => {
  await delay();
  const response = await dshApi.get(`${dshUrlEndpoint}/${id}`);
  return response.data.data.dsh;
};

export const addDSH = async ({
  desiredShifts,
  maxShifts,
  desiredHours,
  maxHours,
  Employee_id,
  Schedule_id,
}) => {
  await delay();
  const response = await dshApi.post(dshUrlEndpoint, {
    desiredShifts,
    maxShifts,
    desiredHours,
    maxHours,
    Employee_id,
    Schedule_id,
  });
  return response.data;
};

export const updateDSH = async (
  id,
  { desiredShifts, maxShifts, desiredHours, maxHours, Employee_id, Schedule_id }
) => {
  await delay();
  const response = await dshApi.patch(`${dshUrlEndpoint}/${id}`, {
    desiredShifts,
    maxShifts,
    desiredHours,
    maxHours,
    Employee_id,
    Schedule_id,
  });
  return response.data;
};

export const deleteDSH = async (id) => {
  await delay();
  const response = await dshApi.delete(`${dshUrlEndpoint}/${id}`);
  return response.data;
};

export const getDSHsByEmployee = async (id) => {
  await delay();
  const response = await dshApi.get(`${dshUrlEndpoint}/employee/${id}`);
  return response.data.data.dsh;
};

export const getDSHForSchedule = async (id) => {
  await delay();
  const response = await dshApi.get(`${dshUrlEndpoint}/schedule/${id}`);
  return response.data.data.dsh;
};
