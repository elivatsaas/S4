import axios from "axios";

const delay = () => new Promise((res) => setTimeout(() => res(), 800));

const storesApi = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export const storesUrlEndpoint = "/stores";

export const getStores = async () => {
  await delay();
  const response = await storesApi.get(storesUrlEndpoint);
  return response.data.data.stores;
};

export const getStore = async (id) => {
  await delay();
  const response = await storesApi.get(`${storesUrlEndpoint}/${id}`);
  return response.data.data.store;
};

export const getStoresByEmployee = async (id) => {
  await delay();
  const response = await storesApi.get(`${storesUrlEndpoint}/employees/${id}`);
  return response.data;
};

export const addStore = async ({ storeName }) => {
  await delay();
  const response = await storesApi.post(storesUrlEndpoint, {
    storeName,
  });
  return response.data;
};

export const updateStore = async (store) => {
  await delay();

  const response = await storesApi.patch(
    `${storesUrlEndpoint}/${store.id}`,
    store
  );
  return response.data;
};

export const deleteStore = async (id) => {
  await delay();
  const response = await storesApi.delete(`${storesUrlEndpoint}/${id}`);
  return response.data;
};
