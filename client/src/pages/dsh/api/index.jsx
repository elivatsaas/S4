"use client";

import {
  getDSHs,
  getDSH,
  addDSH,
  updateDSH,
  deleteDSH,
  dshUrlEndpoint as cacheKey,
} from "../../../api/desiredShiftHoursApi";

import React from "react";
import useSWR from "swr";

const newDSH = {
  desiredShifts: "4",
  maxShifts: "6",
  desiredHours: "12",
  maxHours: "25",
  Employee_id: "12",
  Schedule_id: "2",
};

const updatedDSH = {
  id: "13",
  maxShifts: "5",
};
function App() {
  //   const { isLoading, error, data, mutate } = useSWR(cacheKey, addDSH(newDSH));

  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     updateDSH(updatedDSH)
  //   );
  //   //console.log(result);
  //   deleteDSH(12);
  //   deleteDSH(13);

  //return <EmplosyeeList />;
  return <>DSHs API </>;
}

export default App;
