import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const EmployeeScheduleCalendar = ({ shiftsData, viewType }) => {
  const [selectedShift, setSelectedShift] = useState(null);
  const [popupPosition, setPopupPosition] = useState({});
  const [earliestDate, setEarliestDate] = useState(null);
  const [earliestStartTime, setEarliestStartTime] = useState(new Date());
  const [latestEndTime, setLatestEndTime] = useState(new Date());

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        // Calculate earliestDate, earliestStartTime, latestEndTime
        let earliestDate1 = null;
        let earliestStartTime1 = null;
        let latestEndTime1 = null;

        if (shiftsData && shiftsData.length > 0) {
          // Sort shiftsData by start time to find the earliest start time
          shiftsData.sort((a, b) => new Date(a.start) - new Date(b.start));
          earliestStartTime1 = new Date(shiftsData[0].start);

          // Find the latest end time
          shiftsData.forEach((shift) => {
            const end = new Date(shift.end);
            if (!latestEndTime1 || end > latestEndTime1) {
              latestEndTime1 = end;
            }
          });

          // Find the earliest date
          const dates = shiftsData.map((shift) => new Date(shift.start));
          earliestDate1 = new Date(Math.min(...dates));
        }

        setEarliestDate(earliestDate1);
        setEarliestStartTime(earliestStartTime1);
        setLatestEndTime(latestEndTime1);
      } catch (error) {
        console.error("Error fetching shifts:", error);
      }
    };

    if (shiftsData) {
      fetchShifts();
    }
  }, [shiftsData]);

  const handleSelectEvent = (event, e) => {
    setSelectedShift(event);
    setPopupPosition({
      top: e.clientY,
      left: e.clientX,
    });
  };

  const closeModal = () => {
    setSelectedShift(null);
  };

  // Inside the return statement of your component
  return (
    <div className="schedule-container" style={{ position: "relative" }}>
      {earliestDate ? (
        <Calendar
          localizer={localizer}
          events={shiftsData}
          defaultView={viewType}
          views={["day", "week", "month"]} // Allow all view types
          step={30}
          timeslots={2}
          min={earliestStartTime}
          max={latestEndTime}
          defaultDate={earliestDate} // Start of the week containing the earliest shift
          eventPropGetter={(event) => ({
            className: event.employeeId ? "employee" : "no-employee",
          })}
          style={{
            height: "calc(120vh - 100px)", // Adjust the height of the calendar container
            zIndex: 1, // Ensure the calendar is on top of other elements
          }}
          onSelectEvent={handleSelectEvent}
          dayLayoutAlgorithm="no-overlap"
        />
      ) : (
        <p>Loading...</p> // Or any loading indicator you prefer
      )}
      {selectedShift && (
        <div
          className="popup"
          style={{
            position: "absolute",
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 2, // Ensure the pop-up is on top of the calendar
            background: "white", // Set the background color
            padding: "10px", // Add padding for better appearance
            borderRadius: "5px", // Add border radius for rounded corners
          }}
        >
          <div className="popup-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Shift Information</h2>
            <p>
              <strong>Employee:</strong> {selectedShift.title}
            </p>
            <p>
              <strong>Role:</strong> {selectedShift.role}
            </p>
            <p>
              <strong>Store:</strong> {selectedShift.store}
            </p>
            <p>
              <strong>Start:</strong>{" "}
              {moment(selectedShift.start).format("ddd MMM DD YYYY HH:mm:ss")}
            </p>
            <p>
              <strong>End:</strong>{" "}
              {moment(selectedShift.end).format("ddd MMM DD YYYY HH:mm:ss")}
            </p>
            {/* Add more shift information as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeScheduleCalendar;
