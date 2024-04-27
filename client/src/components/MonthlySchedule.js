import React from "react";
import Schedule from "./Schedule";

const MonthlySchedule = ({ shifts }) => {
  return <Schedule shiftsData={shifts} viewType="month" />;
};

export default MonthlySchedule;
