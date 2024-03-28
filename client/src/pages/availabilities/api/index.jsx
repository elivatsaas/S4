"use client";

import {
  getAvailabilities,
  getAvailability,
  addAvailability,
  updateAvailability,
  deleteAvailability,
  availabilitysUrlEndpoint as cacheKey,
} from "../../../api/availabilitiesApi";

import React from "react";
import useSWR from "swr";

const newAvailability = {
  startTime: "3:00",
  endTime: "23:00",
  dayOfWeek: "4",
  Employee_id: "12",
  Schedule_id: null,
};

const updatedAvailability = {
  id: "76",
  startTime: "02:00",
  endTime: "21:00",
  Schedule_id: "1",
  dayOfWeek: "4",
};
function App() {
  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     addAvailability(newAvailability)
  //   );

  //   const { isLoading, error, data, mutate } = useSWR(
  //     cacheKey,
  //     updateAvailability(updatedAvailability)
  //   );

  //   console.log(result);
  //   deleteAvailability(76);
  //   deleteAvailability(77);

  //return <EmplosyeeList />;
  return <>Availability API </>;
}

export default App;
