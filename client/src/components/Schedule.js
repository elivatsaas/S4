import React, { useState, useEffect } from "react";
import moment from "moment";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import { getShiftsBySchedule } from "../api/shiftsApi"; // Import your API function

export default function Schedule({ scheduleId }) {
  const [schedulerData, setSchedulerData] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const shiftsData = await getShiftsBySchedule(scheduleId); // Fetch shifts data from API
        console.log(shiftsData);
        const resources = shiftsData.map((shift) => ({
          id: shift.Employee_id ? shift.Employee_id.toString() : "no_employee", // Use Employee_id as resource ID if it exists, otherwise use 'no_employee'
          name: shift.Employee_id
            ? `Employee ${shift.Employee_id}`
            : "No Employee", // Use Employee ID as resource name if it exists, otherwise use 'No Employee'
        }));

        const events = shiftsData.map((shift) => ({
          id: shift.id,
          start: moment(
            shift.date + " " + shift.startTime,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          ).format(), // Specify format explicitly
          end: moment(
            shift.date + " " + shift.endTime,
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          ).format(), // Specify format explicitly
          resourceId: shift.Employee_id
            ? shift.Employee_id.toString()
            : "no_employee", // Use Employee_id as resource ID if it exists, otherwise use 'no_employee'
          title: shift.Employee_id
            ? `Shift for Employee ${shift.Employee_id}`
            : "Shift for No Employee", // Use Employee ID in the title if it exists, otherwise use 'No Employee'
        }));

        const schedulerData = new SchedulerData(
          moment().format(),
          ViewTypes.Day,
          false,
          false,
          {
            schedulerWidth: "100%",
            resources,
            events,
          }
        );
        schedulerData._setDocumentWidth = () => {}; // Define an empty function for _setDocumentWidth

        setSchedulerData(schedulerData);
      } catch (error) {
        console.error("Error fetching shifts data:", error);
      }
    };

    fetchShifts();
  }, []);

  if (!schedulerData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ScheduleContainer">
      {" "}
      {/* Add the class to position the schedule */}
      <Scheduler
        schedulerData={schedulerData}
        prevClick={() => {}} // Empty function for now
        nextClick={() => {}} // Empty function for now
        onViewChange={() => {}} // Empty function for now
        onSelectDate={() => {}} // Empty function for now
      />
    </div>
  );
}
