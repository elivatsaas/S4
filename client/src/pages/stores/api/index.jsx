"use client";
//import StoreList from "../../components/stores/StoreList";

import {
  getStores,
  getStore,
  addStore,
  updateStore,
  deleteStore,
  storesUrlEndpoint as cacheKey,
} from "../../../api/storesApi";

import React from "react";
import useSWR from "swr";

const newStore = {
  storeName: "newFrontendStore",
};

const updatedStore = {
  id: "4",
  storeName: "updateFrontend",
};
function App() {
  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     addStore(newStore)
  //   );

  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     updateStore(updatedStore)
  //   );
  //console.log(result);
  //deleteStore(4);
  //return <EmplosyeeList />;
  return <>Stores API </>;
}

export default App;
