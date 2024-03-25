"use client";
import useSWR from "swr";
import React from "react";

import {
  getShifts,
  getShiftsBySchedule,
  addShift,
  updateShift,
  deleteShift,
  shiftsUrlEndpoint as cacheKey,
} from "../../api/shiftsApi";

import { generateSchedule } from "../../api/schedulesApi";
// import {
//   addShiftOptions,
//   updateShiftOptions,
//   deleteShiftOptions,
// } from "../../api/shiftsSWROptions";

const GeneratedSchedule = async () => {
  const result = useSWR(cacheKey + "generate/2", generateSchedule);
};

const shiftList = () => {
  GeneratedSchedule();
  const { data } = useSWR("/2", getShiftsBySchedule);
  const shifts = JSON.stringify(data);
  return (
    <div>
      <h1>Schedule Succesfully Generated </h1>

      <h1>Your Schedule </h1>
      {shifts}
    </div>
  );
};

export default shiftList;
