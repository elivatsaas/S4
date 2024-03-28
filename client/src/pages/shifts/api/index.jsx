"use client";

import {
  getShifts,
  getShift,
  addShift,
  updateShift,
  deleteShift,
  shiftsUrlEndpoint as cacheKey,
} from "../../../api/shiftsApi";

import React from "react";
import useSWR from "swr";

const newShift = {
  date: "2024-05-31",
  startTime: "10:00",
  endTime: "18:00",
  Employee_id: null,
  Schedule_id: "1",
  Role_id: "3",
  Store_id: "3",
};

const updatedShift = {
  id: "1",
  startTime: "8:00",
};
function App() {
  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     addShift(newShift)
  //   );

  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     updateShift(updatedShift)
  //   );
  //   //console.log(result);
  //   deleteShift(63);
  //   deleteShift(64);

  //return <EmplosyeeList />;
  return <>Shifts API </>;
}

export default App;
