import React from "react";
import Schedule from "./Schedule";

const WeeklySchedule = ({ shifts }) => {
  return <Schedule shiftsData={shifts} view="week" />;
};

export default WeeklySchedule;
