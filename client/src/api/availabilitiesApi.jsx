import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const availabilitysApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const availabilitysUrlEndpoint = "/availabilities";

export const getAvailabilities = async () => {
  await delay();
  const response = await availabilitysApi.get(availabilitysUrlEndpoint);
  return response.data.availability;
};

export const getAvailability = async (id) => {
  await delay();
  const response = await availabilitysApi.get(
    `${availabilitysUrlEndpoint}/${id}`
  );

  return response.data.data;
};

// export const getAvailabilitysBySchedule = async (id) => {
//   await delay();
//   const response = await availabilitysApi.get(availabilitysUrlEndpoint + "/availabilitys" + id);
//   return response.data;
// };

export const addAvailability = async ({
  startTime,
  endTime,
  Employee_id,
  Schedule_id,
  dayOfWeek,
}) => {
  await delay();
  const response = await availabilitysApi.post(availabilitysUrlEndpoint, {
    startTime,
    endTime,
    Employee_id,
    Schedule_id,
    dayOfWeek,
  });
  return response.data;
};

export const updateAvailability = async (availability) => {
  await delay();

  var availabilityRes = await getAvailability(availability.id);
  var legacyAvailability = await availabilityRes.availability;

  if (availability.startTime === undefined) {
    availability["startTime"] == legacyAvailability.startTime;
  }
  if (availability.endTime === undefined) {
    availability["endTime"] == legacyAvailability.endTime;
  }
  if (availability.Employee_id === undefined) {
    availability["Employee_id"] == legacyAvailability.Employee_id;
  }
  if (availability.Schedule_id === undefined) {
    availability["Schedule_id"] == legacyAvailability.Schedule_id;
  }
  if (availability.dayOfWeek === undefined) {
    availability["dayOfWeek"] == legacyAvailability.dayOfWeek;
  }
  const response = await availabilitysApi.patch(
    `${availabilitysUrlEndpoint}/${availability.id}`,
    availability
  );
  return response.data;
};

export const deleteAvailability = async (id) => {
  await delay();
  const response = await availabilitysApi.delete(
    `${availabilitysUrlEndpoint}/${id}`
  );
  return response.data;
};
