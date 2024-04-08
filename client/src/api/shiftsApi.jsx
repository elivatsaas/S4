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

export const getShift = async (id) => {
  await delay();
  const response = await shiftsApi.get(`${shiftsUrlEndpoint}/${id}`);

  return response.data.data;
};

export const getShiftsBySchedule = async (id) => {
  await delay();
  const response = await shiftsApi.get(shiftsUrlEndpoint + "/schedules" + id);
  return response.data;
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

export const updateShift = async (shift) => {
  await delay();

  var shiftRes = await getShift(shift.id);
  const legacyShift = await shiftRes.shift;
  if (shift.date === undefined) {
    shift["date"] == legacyShift.date;
  }
  if (shift.startTime === undefined) {
    shift["startTime"] == legacyShift.startTime;
  }
  if (shift.endTime === undefined) {
    shift["endTime"] = legacyShift.endTime;
  }
  if (shift.Employee_id === undefined) {
    shift["Employee_id"] == legacyShift.Employee_id;
  }
  if (shift.Schedule_id === undefined) {
    shift["Schedule_id"] == legacyShift.Schedule_id;
  }
  if (shift.Role_id === undefined) {
    shift["Role_id"] = legacyShift.Role_id;
  }
  if (shift.Store_id === undefined) {
    shift["Store_id"] = legacyShift.Store_id;
  }
  console.log("Finished shift ", shift);
  const response = await shiftsApi.patch(
    `${shiftsUrlEndpoint}/${shift.id}`,
    shift
  );
  return response.data;
};

export const deleteShift = async (id) => {
  await delay();
  const response = await shiftsApi.delete(`${shiftsUrlEndpoint}/${id}`);
  return response.data;
};
