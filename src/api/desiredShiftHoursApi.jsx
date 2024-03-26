import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const dshApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const dshUrlEndpoint = "/dsh";

export const getDSHs = async () => {
  await delay();
  const response = await dshApi.get(dshUrlEndpoint);
  console.log(response);
  return response.data.dsh;
};

export const getDSH = async (id) => {
  await delay();
  const response = await dshApi.get(`${dshUrlEndpoint}/${id}`);

  return response.data.data;
};

export const getDSHBySchedule = async (id) => {
  await delay();
  const response = await dshApi.get(dshUrlEndpoint + "/schedules" + id);
  return response.data;
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

export const updateDSH = async (dsh) => {
  await delay();

  var dshRes = await getDSH(dsh.id);
  const legacyDSH = await dshRes.dsh;

  if (dsh.desiredShifts === undefined) {
    dsh["desiredShifts"] == legacyDSH.desiredShifts;
  }
  if (dsh.maxShifts === undefined) {
    dsh["maxShifts"] == legacyDSH.maxShifts;
  }
  if (dsh.desiredHours === undefined) {
    dsh["desiredHours"] = legacyDSH.desiredHours;
  }
  if (dsh.maxHours === undefined) {
    dsh["maxHours"] = legacyDSH.maxHours;
  }
  if (dsh.Employee_id === undefined) {
    dsh["Employee_id"] == legacyDSH.Employee_id;
  }
  if (dsh.Schedule_id === undefined) {
    dsh["Schedule_id"] == legacyDSH.Schedule_id;
  }

  const response = await dshApi.patch(`${dshUrlEndpoint}/${dsh.id}`, dsh);
  return response.data;
};

export const deleteDSH = async (id) => {
  await delay();
  const response = await dshApi.delete(`${dshUrlEndpoint}/${id}`);
  return response.data;
};
