"use client";
import React, { useState } from "react";
import ShiftList from "./../shifts/ShiftByScheduleList";

import useSWR from "swr";

import {
  generateSchedule,
  schedulesUrlEndpoint as cacheKey,
} from "../../api/schedulesApi";
import { getShiftsBySchedule } from "../../api/shiftsApi";

const loadShifts = async (id, cb) => {
  getShiftsBySchedule(id).then((data) => {
    cb(data);
  });
};

const GeneratedSchedule = async () => {
  const result = useSWR(cacheKey + "generate/2", generateSchedule);

  let shifts = await loadShifts(2, (data) => {
    console.log(data);
    const shifts = JSON.stringify(data);
    console.log(shifts);
  });

  //const shifts = JSON.stringify(data);

  return (
    <>
      <div>
        <h1> Your Shifts</h1>
        {shifts}
      </div>
    </>
  );
};

export default GeneratedSchedule;
