"use client";
//import RoleList from "../../components/roles/RoleList";

import {
  getRoles,
  getRole,
  addRole,
  updateRole,
  deleteRole,
  rolesUrlEndpoint as cacheKey,
} from "../../../api/rolesApi";

import React from "react";
import useSWR from "swr";

const newRole = {
  roleName: "newFrontendRole",
};

const updatedRole = {
  id: "6",
  roleName: "updateFrontend",
};
function App() {
  //   const { isLoading, error, data, mutate } = useSWR(cacheKey, addRole(newRole));

  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     updateRole(updatedRole)
  //   );
  //console.log(result);
  //   deleteRole(6);
  //return <EmplosyeeList />;
  return <>Roles API </>;
}

export default App;
