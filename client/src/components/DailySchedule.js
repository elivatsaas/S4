import React from "react";
import Schedule from "./Schedule";

const DailySchedule = ({ shifts }) => {
  return <Schedule shiftsData={shifts} viewType="day" />;
};

export default DailySchedule;
