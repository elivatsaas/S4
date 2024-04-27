import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const rolesApi = axios.create({
  baseURL:
    "http://ec2-13-52-252-101.us-west-1.compute.amazonaws.com:8080/api/v1",
});

export const rolesUrlEndpoint = "/roles";

export const getRoles = async () => {
  await delay();
  const response = await rolesApi.get(rolesUrlEndpoint);
  return response.data.data.roles;
};

export const getRole = async (id) => {
  await delay();
  const response = await rolesApi.get(`${rolesUrlEndpoint}/${id}`);
  return response.data.data.role;
};

export const getRolesByEmployee = async (id) => {
  await delay();
  const response = await rolesApi.get(`${rolesUrlEndpoint}/employees/${id}`);
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
