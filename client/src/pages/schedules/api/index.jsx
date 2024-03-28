"use client";

import {
  getSchedules,
  getSchedule,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  schedulesUrlEndpoint as cacheKey,
} from "../../../api/schedulesApi";

import React from "react";
import useSWR from "swr";

const newSchedule = {
  startDate: "2024-06-12",
  endDate: "2025-06-19",
  scheduleName: "newFrontendSchedule",
};

const updatedSchedule = {
  id: "4",
  scheduleName: "updatedFrontendSchedule",
};
function App() {
  console.log("in app");

  // const { isLoading, error, data, mutate } = useSWR(
  //   cacheKey,
  //   addSchedule(newSchedule)
  // );

  // const { isLoading, error, data, mutate } = useSWR(
  //   cacheKey,
  //   updateSchedule(updatedSchedule)
  // );
  //console.log(result);
  deleteSchedule(4);
  //return <EmplosyeeList />;
  return <>Schedules API </>;
}

export default App;
