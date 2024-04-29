import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const availabilitysApi = axios.create({
  baseURL:
    "http://ec2-13-52-252-101.us-west-1.compute.amazonaws.com:8080/api/v1",
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

  const availabilityRes = await getAvailability(availability.id);
  const legacyAvailability = availabilityRes.availability;

  const updatedAvailability = {
    ...legacyAvailability,
    ...availability,
  };

  const response = await availabilitysApi.patch(
    `${availabilitysUrlEndpoint}/${availability.id}`,
    updatedAvailability
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

export const getEmployeeAvailabilities = async (Employee_id) => {
  await delay();
  const response = await availabilitysApi.get(
    `${availabilitysUrlEndpoint}/employee/${Employee_id}`
  );
  return response.data.availabilities;
};

export const getScheduleAvailabilities = async (Schedule_id) => {
  await delay();
  const response = await availabilitysApi.get(
    `${availabilitysUrlEndpoint}/schedules/${Schedule_id}`
  );
  return response.data.availabilities;
};
