import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const rolesApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const rolesUrlEndpoint = "/roles";

export const getRoles = async () => {
  await delay();
  const response = await rolesApi.get(rolesUrlEndpoint);
  return response.data.role;
};

export const getRole = async (id) => {
  await delay();
  const response = await rolesApi.get(`${rolesUrlEndpoint}/${id}`);

  return response.data.data;
};

export const getRolesByEmployee = async (id) => {
  await delay();
  const response = await rolesApi.get(rolesUrlEndpoint + "/employees" + id);
  return response.data;
};

export const addRole = async ({ roleName }) => {
  await delay();
  const response = await rolesApi.post(rolesUrlEndpoint, {
    roleName,
  });
  return response.data;
};

export const updateRole = async (role) => {
  await delay();

  const response = await rolesApi.patch(`${rolesUrlEndpoint}/${role.id}`, role);
  return response.data;
};

export const deleteRole = async (id) => {
  await delay();
  const response = await rolesApi.delete(`${rolesUrlEndpoint}/${id}`);
  return response.data;
};
