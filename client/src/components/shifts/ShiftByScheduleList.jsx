"use client";
import useSWR from "swr";
import React, { useState } from "react";

import {
  getShifts,
  getShiftsBySchedule,
  addShift,
  updateShift,
  deleteShift,
  shiftsUrlEndpoint as cacheKey,
} from "../../api/shiftsApi";

// import {
//   addShiftOptions,
//   updateShiftOptions,
//   deleteShiftOptions,
// } from "../../api/shiftsSWROptions";

const shiftList = async () => {
  const { isLoading, error, data, mutate } = useSWR(
    cacheKey + "schedules/2",
    getShiftsBySchedule(2)
  );
  const shifts = JSON.stringify(data);
  return (
    <div>
      <h1>your schedule </h1>
      {shifts}
    </div>
  );
};

export default shiftList;
